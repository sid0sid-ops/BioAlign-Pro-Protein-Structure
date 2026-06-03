const paths = {
  starter: "./data/starter-proteins.json",
  pack: (accession) => `./data/protein-packs/${accession}.json`,
  intelligence: (accession) => `./data/structure-intelligence/${accession}.json`
};

const state = {
  proteins: [],
  selected: null,
  pack: null,
  intelligence: null
};

const jsonCache = new Map();

const $ = (selector) => document.querySelector(selector);

function normalize(value) {
  return String(value || "").toLowerCase().replace(/haem/g, "hem").replace(/[^a-z0-9]+/g, " ").trim();
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[char]));
}

function scoreProtein(protein, query) {
  const q = normalize(query);
  if (!q) return 1;
  const fields = [protein.accession, protein.geneName, protein.proteinName, ...(protein.aliases || []), ...(protein.pdbIds || [])].map(normalize);
  let best = 0;
  for (const field of fields) {
    if (field === q) best = Math.max(best, 100);
    else if (field.startsWith(q)) best = Math.max(best, 86);
    else if (field.includes(q)) best = Math.max(best, 68);
    else if (q.split(" ").some((part) => field.split(" ").includes(part))) best = Math.max(best, 42);
  }
  return best;
}

function rankedProteins(query) {
  return state.proteins
    .map((protein) => ({ protein, score: scoreProtein(protein, query) }))
    .filter((entry) => !query || entry.score > 0)
    .sort((a, b) => b.score - a.score || String(a.protein.geneName).localeCompare(String(b.protein.geneName)))
    .slice(0, 8)
    .map((entry) => entry.protein);
}

function absoluteStaticUrl(path) {
  return new URL(path, window.location.href).toString();
}

async function readCachedResponse(path) {
  if (!("caches" in window)) return null;
  const cached = await caches.match(absoluteStaticUrl(path));
  return cached?.ok ? cached : null;
}

async function writeCachedResponse(path, response) {
  if (!("caches" in window) || !response?.ok) return;
  const cache = await caches.open("bioalign-protein-structure-docs-runtime-v1");
  await cache.put(absoluteStaticUrl(path), response.clone());
}

async function loadJson(path) {
  if (jsonCache.has(path)) return jsonCache.get(path);

  const cached = await readCachedResponse(path);
  if (cached) {
    const payload = await cached.json();
    jsonCache.set(path, payload);
    return payload;
  }

  const response = await fetch(path, { cache: "force-cache" });
  if (!response.ok) throw new Error(`Could not load ${path}`);
  await writeCachedResponse(path, response);
  const payload = await response.json();
  jsonCache.set(path, payload);
  return payload;
}

function renderIncrementalRows(container, rows, pageSize = 10) {
  let visibleCount = Math.min(pageSize, rows.length);
  const render = () => {
    container.innerHTML = rows.slice(0, visibleCount).join("");
    if (visibleCount >= rows.length) return;

    const sentinel = document.createElement("div");
    sentinel.className = "incremental-sentinel";
    sentinel.setAttribute("aria-hidden", "true");
    container.appendChild(sentinel);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        visibleCount = Math.min(visibleCount + pageSize, rows.length);
        render();
      },
      { rootMargin: "0px 0px 200px 0px" }
    );
    observer.observe(sentinel);
  };

  render();
}

function prefetchProteinAssets(accession) {
  if (!accession) return Promise.resolve();
  return Promise.allSettled([
    loadJson(paths.pack(accession)),
    loadJson(paths.intelligence(accession)).catch(() => null)
  ]);
}

function prefetchLinkedRoute(href) {
  const activeAccession = state.pack?.accession || $("#proteinSearch")?.value?.trim() || "P04637";
  const jobs = [
    loadJson(paths.starter),
    prefetchProteinAssets(activeAccession)
  ];
  if (href.includes("about")) jobs.push(loadJson("./data/public-data-sources.json").catch(() => null));
  return Promise.allSettled(jobs);
}

function row(label, evidence, source, status = "Available", outline = false) {
  return `
    <div class="record-row">
      <strong>${escapeHtml(label)}</strong>
      <span>${escapeHtml(evidence)}</span>
      <em class="badge ${outline ? "outline" : ""}" title="${escapeHtml(source)}">${escapeHtml(status)}</em>
    </div>
  `;
}

function compactList(values, limit = 4) {
  const unique = [...new Set((values || []).filter(Boolean).map(String))];
  if (!unique.length) return "";
  return `${unique.slice(0, limit).join(", ")}${unique.length > limit ? ` +${unique.length - limit}` : ""}`;
}

function shortReason(value, limit = 170) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  if (!text) return "";
  return text.length > limit ? `${text.slice(0, limit - 1)}...` : text;
}

function msaEvidence(msa) {
  if (!msa) {
    return {
      evidence: "No MSA record stored in this pack",
      source: "Build-time MSA pipeline",
      status: "Not computed",
      missing: true
    };
  }
  if (msa.available) {
    return {
      evidence: `${msa.sourceSequenceCount || msa.alignedSequences?.length || 0} aligned sequences; consensus ${msa.consensus?.length || 0} residues; ${msa.conservationScores?.length || 0} conservation scores`,
      source: msa.method || msa.source || "Build-time MSA",
      status: "Computed",
      missing: false
    };
  }
  const reason = shortReason(msa.unavailableReason || "Alignment did not produce a valid consensus/conservation record.");
  return {
    evidence: `${msa.sourceSequenceCount || 0} homolog input sequence(s) found, but no valid alignment was packaged${reason ? `: ${reason}` : ""}`,
    source: msa.method || msa.source || "MAFFT / Clustal Omega / MUSCLE",
    status: "Not computed",
    missing: true
  };
}

function sourceLinks(pack) {
  const primaryPdb = pack?.pdbStructures?.[0]?.pdbId;
  return {
    uniprot: `https://www.uniprot.org/uniprotkb/${pack.accession}/entry`,
    rcsb: primaryPdb ? `https://www.rcsb.org/structure/${primaryPdb}` : "https://www.rcsb.org/search",
    alphafold: pack.alphaFold?.modelId ? `https://alphafold.ebi.ac.uk/entry/${pack.accession}` : `https://alphafold.ebi.ac.uk/search/text/${pack.accession}`,
    interpro: `https://www.ebi.ac.uk/interpro/protein/UniProt/${pack.accession}`,
    variants: `https://www.uniprot.org/uniprotkb/${pack.accession}/entry#variants`,
    clinvar: `https://www.ncbi.nlm.nih.gov/clinvar/?term=${encodeURIComponent(`${pack.geneName}[gene]`)}`
  };
}

function chunkSequence(sequence) {
  return String(sequence || "").match(/.{1,10}/g)?.join("   ") || "Sequence not stored in this local pack.";
}

function renderFullAnnotationBlocks(sequence, features) {
  const cleanSequence = String(sequence || "");
  const blocks = cleanSequence.match(/.{1,60}/g)?.map((line, index) => ({
    line,
    start: index * 60 + 1,
    end: index * 60 + line.length
  })) || [];
  if (!blocks.length) return '<div class="annotation-empty">Sequence not stored in this local pack.</div>';

  return blocks.map((block) => {
    const overlapping = features
      .map((feature, index) => ({
        feature,
        index,
        start: Math.max(feature.start, block.start),
        end: Math.min(feature.end, block.end)
      }))
      .filter((item) => item.end >= block.start && item.start <= block.end)
      .sort((a, b) => a.start - b.start || a.end - b.end);
    const laneEnds = [];
    const placed = overlapping.map((item) => {
      let lane = laneEnds.findIndex((end) => end < item.start);
      if (lane === -1) {
        lane = laneEnds.length;
        laneEnds.push(item.end);
      } else {
        laneEnds[lane] = item.end;
      }
      return { ...item, lane };
    });
    const laneCount = Math.max(1, ...placed.map((item) => item.lane + 1));
    const columns = `repeat(${block.line.length}, minmax(10px, 1fr))`;
    const ruler = block.line.split("").map((_, index) => {
      const position = block.start + index;
      return position === block.start || position % 10 === 0 || position === block.end
        ? `<span>${position}</span>`
        : "<span></span>";
    }).join("");
    const residues = block.line.split("").map((residue, index) => `<span class="${index % 10 === 9 ? "ten" : ""}">${escapeHtml(residue)}</span>`).join("");
    const tracks = placed.length
      ? placed.map((item) => {
          const left = ((item.start - block.start) / block.line.length) * 100;
          const width = ((item.end - item.start + 1) / block.line.length) * 100;
          return `<span class="annotation-block color-${item.index % 5}" style="left:${Math.max(left, 0)}%;top:${item.lane * 24 + 4}px;width:${Math.max(width, 3)}%" title="T${item.index + 1}: ${escapeHtml(item.feature.label)} (${item.feature.start}-${item.feature.end})">T${item.index + 1}</span>`;
        }).join("")
      : '<span class="annotation-empty">No annotation in this residue block</span>';

    return `
      <div class="annotation-block-row">
        <div class="annotation-grid">
          <b>${block.start}</b>
          <div class="annotation-ruler" style="grid-template-columns:${columns}">${ruler}</div>
          <b>${block.end}</b>
        </div>
        <div class="annotation-grid">
          <small>Seq</small>
          <div class="annotation-residues" style="grid-template-columns:${columns}">${residues}</div>
          <span></span>
        </div>
        <div class="annotation-grid">
          <small>Map</small>
          <div class="annotation-lanes" style="height:${laneCount * 24 + 8}px">${tracks}</div>
          <span></span>
        </div>
      </div>
    `;
  }).join("");
}

function allFeatures(pack, intelligence) {
  const domainFeatures = (intelligence?.domains || []).map((domain) => ({
    label: domain.name,
    type: domain.type || "domain",
    start: domain.start,
    end: domain.end,
    source: domain.sourceDatabase || "InterPro"
  }));
  const proteinFeatures = (intelligence?.protein?.features || []).map((feature) => ({
    label: feature.description || feature.type,
    type: feature.type || "feature",
    start: feature.start,
    end: feature.end,
    source: feature.source || "UniProt"
  }));
  const packDomains = (pack?.domains || []).map((domain) => ({
    label: domain.name,
    type: domain.type || "domain",
    start: domain.start,
    end: domain.end,
    source: domain.source || "Local protein pack"
  }));

  const seen = new Set();
  return [...domainFeatures, ...proteinFeatures, ...packDomains].filter((feature) => {
    const key = `${feature.label}-${feature.start}-${feature.end}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return feature.start && feature.end;
  });
}

function renderSuggestions() {
  const input = $("#proteinSearch");
  const menu = $("#suggestions");
  const query = input.value.trim();
  const matches = rankedProteins(query).slice(0, 7);
  if (!matches.length || document.activeElement !== input) {
    menu.hidden = true;
    return;
  }
  menu.innerHTML = matches.map((protein) => `
    <button type="button" data-accession="${escapeHtml(protein.accession)}">
      <strong>${escapeHtml(protein.proteinName || protein.geneName)}</strong>
      <span>${escapeHtml(protein.accession)} - ${escapeHtml([protein.geneName, ...(protein.aliases || []).slice(0, 3)].filter(Boolean).join(", "))}</span>
    </button>
  `).join("");
  menu.hidden = false;
}

function renderStructureViewer(pack) {
  const primaryPdb = pack?.pdbStructures?.[0]?.pdbId || state.selected?.pdbIds?.[0] || "";
  const iframe = $("#molstarFrame");
  const openRcsb = $("#openRcsb");

  if (primaryPdb) {
    iframe.src = `https://www.rcsb.org/3d-view/${primaryPdb}?hide-controls=1`;
    openRcsb.href = `https://www.rcsb.org/structure/${primaryPdb}`;
    openRcsb.textContent = `Open ${primaryPdb}`;
  } else if (pack?.alphaFold?.modelId) {
    iframe.removeAttribute("src");
    openRcsb.href = pack.alphaFold.cifUrl || `https://alphafold.ebi.ac.uk/entry/${pack.accession}`;
    openRcsb.textContent = "Open AlphaFold";
  } else {
    iframe.removeAttribute("src");
    openRcsb.href = `https://www.uniprot.org/uniprotkb/${pack.accession}/entry`;
    openRcsb.textContent = "Open UniProt";
  }
}

function renderStructureRecords(pack, intelligence) {
  const structures = pack?.pdbStructures || [];
  $("#structureTitle").textContent = structures.length
    ? `${structures[0].pdbId} | ${pack.accession}`
    : `${pack.accession} structure record`;

  const structureRows = structures.length
    ? structures.map((structure) =>
        row(
          structure.pdbId,
          [structure.method, structure.resolution, structure.chains].filter(Boolean).join(" | ") || "PDB cross-reference",
          structure.source || "RCSB PDB",
          "PDB"
        )
      )
    : [row("3D structure", "No PDB structure is packaged for this selected record.", "RCSB PDB", "Not mapped", true)];
  renderIncrementalRows($("#structureList"), structureRows, 10);

  const sequenceLength = pack?.sequence?.length || intelligence?.protein?.length || 0;
  const features = allFeatures(pack, intelligence);
  const pdbIds = structures.map((structure) => structure.pdbId);
  const hasExperimental = pdbIds.length > 0;
  const hasAlphaFold = Boolean(pack?.alphaFold?.available || intelligence?.structures?.predicted?.length);
  const plddt = intelligence?.metrics?.plddt?.available ? intelligence.metrics.plddt.mean : pack?.alphaFold?.confidenceAvg;
  const tmScore = (intelligence?.metrics?.tmScoreComparisons || []).find((metric) => metric.available);
  const rmsd = (intelligence?.metrics?.rmsdComparisons || []).find((metric) => metric.available);
  const representativeDetails = structures.slice(0, 4).map((structure) => {
    const method = structure.experimentalMethod || structure.method || "method not listed";
    const resolution = typeof structure.resolution === "number" ? `${structure.resolution.toFixed(2)} A` : structure.resolution || "resolution not listed";
    return `${structure.pdbId} (${method}; ${resolution})`;
  });
  const tertiaryEvidence = representativeDetails.length
    ? `${representativeDetails.join("; ")}${structures.length > 4 ? `; +${structures.length - 4} more` : ""}`
    : hasAlphaFold
      ? pack.alphaFold.modelId || "AlphaFold model"
      : "No structure mapped";
  const chainEvidence =
    compactList(structures.flatMap((structure) => structure.chains || []), 6) ||
    compactList((pack.pdbStructures || []).map((structure) => structure.chains), 3) ||
    structures
      .flatMap((structure) => structure.polymerEntities || [])
      .map((entity) => entity.chains?.length ? `${entity.entityId}: ${entity.chains.join("/")}` : entity.entityId)
      .filter(Boolean)[0] ||
    "Assembly metadata listed";
  const secondaryDetails = [
    intelligence?.domains?.length ? `${intelligence.domains.length} domain/profile record(s)` : "",
    intelligence?.protein?.features?.length ? `${intelligence.protein.features.length} UniProt feature(s)` : "",
    pack?.motifs?.length ? `${pack.motifs.length} region/motif record(s)` : ""
  ].filter(Boolean).join("; ");

  $("#levelTable").innerHTML = [
    row("Primary", sequenceLength ? `${sequenceLength} residue canonical sequence` : "Sequence not loaded", pack?.sequence?.source || "UniProtKB", sequenceLength ? "Available" : "Missing", !sequenceLength),
    row("Secondary", features.length ? `${features.length} mapped feature or region records${secondaryDetails ? ` (${secondaryDetails})` : ""}` : "No feature records mapped", "UniProtKB / InterPro", features.length ? "Feature evidence" : "Not mapped", !features.length),
    row("Tertiary", tertiaryEvidence, hasExperimental ? "RCSB PDB" : "AlphaFold DB", hasExperimental ? "Experimental" : hasAlphaFold ? "Predicted" : "Not mapped", !(hasExperimental || hasAlphaFold)),
    row("Quaternary", hasExperimental ? chainEvidence : "Assembly requires mapped structure", "RCSB assembly metadata", hasExperimental ? "Assembly record" : "Not mapped", !hasExperimental)
  ].join("");

  $("#methodTable").innerHTML = [
    row("Experimental structure", hasExperimental ? `${pdbIds.length} PDB record(s) packaged` : "No experimental PDB record in local pack", "RCSB PDB", hasExperimental ? "Primary route" : "No record", !hasExperimental),
    row("Homology modeling", (pack.templates || []).length ? `${pack.templates.length} local template candidate(s)` : "Template identity requires BLAST/Foldseek output", "RCSB / build template index", (pack.templates || []).length ? "Template evidence" : "Not computed", !(pack.templates || []).length),
    row("Threading / fold recognition", features.length ? `${features.length} domain/profile feature(s)` : "No profile feature mapped", "InterPro / Pfam / UniProt", features.length ? "Profile evidence" : "Not computed", !features.length),
    row("Deep-learning model", plddt ? `Mean pLDDT ${Number(plddt).toFixed(1)}` : hasAlphaFold ? "AlphaFold model mapped" : "No AlphaFold record packaged", "AlphaFold DB", hasAlphaFold ? "Model evidence" : "No record", !hasAlphaFold)
  ].join("");

  const msaStatus = msaEvidence(intelligence?.msa);
  $("#validationTable").innerHTML = [
    row("RMSD", rmsd ? `${rmsd.rmsd.toFixed(2)} A from ${rmsd.queryStructure} vs ${rmsd.templateStructure}` : "No coordinate superposition result packaged", "TM-align / build-time computation", rmsd ? "Computed" : "Missing", !rmsd),
    row("TM-score", tmScore ? `${tmScore.tmScore.toFixed(3)} (${tmScore.interpretation})` : "No TM-score result packaged", "TM-align / US-align", tmScore ? "Computed" : "Missing", !tmScore),
    row("MSA / conservation", msaStatus.evidence, msaStatus.source, msaStatus.status, msaStatus.missing)
  ].join("");
}

function renderSequence(pack, intelligence) {
  const sequence = pack?.sequence?.value || intelligence?.protein?.sequence || "";
  const length = sequence.length || pack?.sequence?.length || intelligence?.protein?.length || 1;
  const features = allFeatures(pack, intelligence).slice(0, 28);
  const markers = [1, 50, 100, 150, 200, 250, 300, 350, length].filter((value, index, list) => value <= length && list.indexOf(value) === index);

  $("#sequenceTitle").textContent = `${pack.accession} sequence map`;
  $("#ruler").innerHTML = markers.map((marker) => `<span class="tick" style="left:${((marker - 1) / Math.max(length - 1, 1)) * 100}%">${marker}</span>`).join("");
  $("#domainTrack").innerHTML = features.slice(0, 12).map((feature, index) => {
    const left = ((feature.start - 1) / length) * 100;
    const width = ((feature.end - feature.start + 1) / length) * 100;
    return `<span class="domain-block" style="left:${left}%;width:${Math.max(width, 5)}%" title="${escapeHtml(feature.label)} (${feature.start}-${feature.end})">T${index + 1}</span>`;
  }).join("");
  $("#sequencePreview").textContent = chunkSequence(sequence.slice(0, 120));
  $("#fullSequence").textContent = chunkSequence(sequence);
  $("#modalTitle").textContent = `${pack.accession} complete sequence`;
  $("#fullAnnotationMap").innerHTML = renderFullAnnotationBlocks(sequence, features.slice(0, 28));
  renderIncrementalRows(
    $("#fullFeatures"),
    features.length
      ? features.map((feature, index) => row(`T${index + 1}`, `${feature.label} (${feature.start}-${feature.end})`, feature.source, feature.type))
      : [row("Annotations", "No local sequence feature annotations packaged for this record.", "Local static pack", "Not mapped", true)],
    10
  );
}

function renderSources(pack, intelligence) {
  const primaryPdb = pack?.pdbStructures?.[0]?.pdbId;
  const links = sourceLinks(pack);
  const rows = [
    row("UniProtKB", `${pack.accession} sequence, identity, aliases, features`, links.uniprot, "Packaged"),
    row("RCSB PDB", primaryPdb ? `${pack.pdbStructures.length} structure cross-reference(s), primary ${primaryPdb}` : "No PDB record in local pack", primaryPdb ? links.rcsb : "RCSB PDB", primaryPdb ? "Available" : "No record", !primaryPdb),
    row("AlphaFold DB", pack.alphaFold?.available ? pack.alphaFold.modelId || "Predicted structure mapped" : "No AlphaFold record packaged", links.alphafold, pack.alphaFold?.available ? "Available" : "No record", !pack.alphaFold?.available),
    row("InterPro / Pfam", `${(intelligence?.domains || pack.domains || []).length} domain/profile record(s)`, links.interpro, (intelligence?.domains || pack.domains || []).length ? "Available" : "No record", !(intelligence?.domains || pack.domains || []).length),
    row("Offline static bundle", "Selected starter packs, structure-intelligence JSON, search indexes, and compressed copies are stored inside docs/.", "./data/starter-proteins.json", "19 selected records")
  ];
  renderIncrementalRows($("#sourcesTable"), rows, 10);
}

function renderAlphaFold(pack, intelligence) {
  const plddt = intelligence?.metrics?.plddt;
  const pae = intelligence?.metrics?.pae;
  $("#alphafoldTable").innerHTML = [
    row("Model ID", pack.alphaFold?.modelId || intelligence?.structures?.predicted?.[0]?.modelId || "No model mapped", "AlphaFold DB", pack.alphaFold?.available ? "Mapped" : "Not mapped", !pack.alphaFold?.available),
    row("Mean pLDDT", plddt?.available ? plddt.mean.toFixed(1) : pack.alphaFold?.confidenceAvg ? Number(pack.alphaFold.confidenceAvg).toFixed(1) : "Not available", "AlphaFold confidence JSON", plddt?.available || pack.alphaFold?.confidenceAvg ? "Available" : "Missing", !(plddt?.available || pack.alphaFold?.confidenceAvg)),
    row("Mean PAE", pae?.available ? `${pae.meanPae.toFixed(1)} A` : "Not available", "AlphaFold PAE JSON", pae?.available ? "Available" : "Missing", !pae?.available),
    row("Low-confidence regions", plddt?.available ? `${plddt.lowConfidenceRegions.length} region(s)` : "Not available", "pLDDT < 70", plddt?.available ? "Available" : "Missing", !plddt?.available)
  ].join("");
}

function renderFeatureClasses(pack, intelligence) {
  const features = allFeatures(pack, intelligence);
  const counts = features.reduce((acc, feature) => {
    const key = feature.type || "Feature";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  const featureRows = features.length
    ? features.map((feature) =>
        row(
          `${feature.type || "Feature"} (${feature.start}-${feature.end})`,
          feature.label || "Unnamed feature",
          feature.source || "UniProt / InterPro / protein pack",
          "Available"
        )
      )
    : [row("Feature classes", "No feature classes are packaged for this record.", "Local static pack", "Not mapped", true)];
  renderIncrementalRows($("#featureClassTable"), featureRows, 10);
}

function renderBiology(pack) {
  const links = sourceLinks(pack);
  $("#biologyTable").innerHTML = [
    row("Disease summary", pack.diseaseSummary || "No disease summary packaged.", "Protein pack / UniProt context", pack.diseaseSummary ? "Available" : "Not mapped", !pack.diseaseSummary),
    row("Pathways", pack.pathways?.length ? pack.pathways.map((pathway) => pathway.name).join(", ") : "No pathway records packaged.", "Local protein pack", pack.pathways?.length ? "Available" : "Not mapped", !pack.pathways?.length),
    row("Interactions", pack.interactions?.length ? pack.interactions.map((interaction) => interaction.target).join(", ") : "No interaction records packaged.", "Local protein pack", pack.interactions?.length ? "Available" : "Not mapped", !pack.interactions?.length),
    row("Variants", links.variants, "UniProt variants", "External record"),
    row("Clinical variants", links.clinvar, "ClinVar", "External record")
  ].join("");
}

function renderSourceConfidence(pack, intelligence) {
  const rmsd = (intelligence?.metrics?.rmsdComparisons || []).find((item) => item.available);
  const tmScore = (intelligence?.metrics?.tmScoreComparisons || []).find((item) => item.available);
  const featureCount = pack.motifs?.length || allFeatures(pack, intelligence).length;
  const superpositionValue = tmScore
    ? [
        `Aligned length ${tmScore.alignedLength}`,
        `RMSD ${Number(tmScore.rmsd).toFixed(2)} A`,
        `TM-score ${Number(tmScore.tmScore).toFixed(3)}`,
        typeof tmScore.sequenceIdentityAligned === "number" ? `Seq_ID ${Number(tmScore.sequenceIdentityAligned).toFixed(3)}` : null
      ].filter(Boolean).join(" / ")
    : rmsd
      ? `Aligned length ${rmsd.alignedResidues} / RMSD ${Number(rmsd.rmsd).toFixed(2)} A`
      : "No superposition metric packaged";
  const msaStatus = msaEvidence(intelligence?.msa);
  $("#confidenceTable").innerHTML = [
    row("Sequence", pack.sequence?.value ? "Direct sequence stored" : "Length-only metadata", "UniProt browser API", pack.sequence?.value ? "Direct" : "Partial", !pack.sequence?.value),
    row("Experimental structures", pack.pdbStructures?.length ? `${pack.pdbStructures.length} PDB cross-reference(s)` : "No PDB record packaged", "RCSB PDB / UniProt cross-reference", pack.pdbStructures?.length ? "Direct" : "Missing", !pack.pdbStructures?.length),
    row("AlphaFold", pack.alphaFold?.available || intelligence?.structures?.predicted?.length ? "Mapped predicted model" : "No AlphaFold mapping", "AlphaFold DB", pack.alphaFold?.available || intelligence?.structures?.predicted?.length ? "Direct" : "Missing", !(pack.alphaFold?.available || intelligence?.structures?.predicted?.length)),
    row("Domains and features", `${featureCount} mapped record(s)`, "UniProt / InterPro / Pfam", featureCount ? "Direct" : "Missing", !featureCount),
    row("Conservation", msaStatus.evidence, msaStatus.source, msaStatus.status, msaStatus.missing),
    row("RMSD / TM-score", superpositionValue, "TM-align / US-align / Foldseek", rmsd || tmScore ? "Computed" : "Missing", !(rmsd || tmScore))
  ].join("");
}

function renderHeader(pack, intelligence) {
  $("#proteinTitle").textContent = pack.proteinName || pack.geneName || pack.accession;
  $("#proteinSubtitle").textContent = `${pack.geneName || pack.accession} | ${pack.accession} | ${pack.organism?.scientificName || "Organism not listed"}`;
  $("#summaryOrganism").textContent = pack.organism?.scientificName || "Unknown";
  $("#summaryAccession").textContent = pack.accession;
  $("#summaryLength").textContent = `${pack.sequence?.length || intelligence?.protein?.length || 0} aa`;
  $("#summaryFeatures").textContent = String(allFeatures(pack, intelligence).length);
}

function downloadSelectedRecord() {
  if (!state.pack) return;
  const payload = {
    exportedAt: new Date().toISOString(),
    app: "BioAlign-Pro-Protein-Structure docs static site",
    proteinPack: state.pack,
    structureIntelligence: state.intelligence
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${state.pack.accession}-bioalign-record.json`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function downloadText(filename, content, type = "text/plain") {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function downloadFasta() {
  if (!state.pack) return;
  const sequence = state.pack.sequence?.value || "";
  const wrapped = sequence.match(/.{1,80}/g)?.join("\n") || "";
  downloadText(`${state.pack.accession}.fasta`, `>${state.pack.accession}|${state.pack.geneName}|${state.pack.proteinName}\n${wrapped}\n`, "text/x-fasta");
}

function downloadFeaturesCsv() {
  if (!state.pack) return;
  const rows = [["type", "description", "start", "end", "source"], ...allFeatures(state.pack, state.intelligence).map((feature) => [feature.type, feature.label, feature.start, feature.end, feature.source])];
  const csv = rows.map((rowItems) => rowItems.map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");
  downloadText(`${state.pack.accession}-features.csv`, `${csv}\n`, "text/csv");
}

function downloadSources() {
  if (!state.pack) return;
  const links = sourceLinks(state.pack);
  downloadText(`${state.pack.accession}-sources.txt`, Object.entries(links).map(([key, value]) => `${key}: ${value}`).join("\n") + "\n");
}

async function selectProtein(accession) {
  const selected = state.proteins.find((protein) => protein.accession === accession) || state.proteins[0];
  if (!selected) return;
  state.selected = selected;
  $("#proteinSearch").value = selected.accession;
  $("#suggestions").hidden = true;

  const [pack, intelligence] = await Promise.all([
    loadJson(paths.pack(selected.accession)),
    loadJson(paths.intelligence(selected.accession)).catch(() => null)
  ]);
  state.pack = pack;
  state.intelligence = intelligence;
  renderHeader(pack, intelligence);
  renderStructureViewer(pack);
  renderStructureRecords(pack, intelligence);
  renderSequence(pack, intelligence);
  renderSources(pack, intelligence);
  renderAlphaFold(pack, intelligence);
  renderFeatureClasses(pack, intelligence);
  renderBiology(pack);
  renderSourceConfidence(pack, intelligence);
}

async function registerOfflineCache() {
  if (!("serviceWorker" in navigator)) return;
  try {
    const registration = await navigator.serviceWorker.register("./offline-sw.js", { scope: "./" });
    const worker = registration.active || registration.waiting || registration.installing;
    worker?.postMessage({ type: "CACHE_SELECTED_PROTEIN_DATA" });
  } catch {
    // The static JSON files still work directly if service workers are blocked.
  }
}

function warmSavedProteinCache() {
  const warm = () => {
    const selectedAccessions = state.proteins.slice(0, 8).map((protein) => protein.accession);
    selectedAccessions.forEach((accession) => {
      loadJson(paths.pack(accession)).catch(() => {});
      loadJson(paths.intelligence(accession)).catch(() => {});
    });
  };
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(warm, { timeout: 3500 });
  } else {
    window.setTimeout(warm, 800);
  }
}

function setSequenceModalOpen(open) {
  $("#sequenceModal").hidden = !open;
  document.body.classList.toggle("modal-open", open);
}

function setupPredictivePrefetch() {
  let hoverTimer = null;
  document.querySelectorAll("a[href]").forEach((link) => {
    link.addEventListener("mouseenter", () => {
      window.clearTimeout(hoverTimer);
      hoverTimer = window.setTimeout(() => {
        prefetchLinkedRoute(link.getAttribute("href") || "").catch(() => {});
      }, 100);
    });
    link.addEventListener("mouseleave", () => {
      window.clearTimeout(hoverTimer);
      hoverTimer = null;
    });
    link.addEventListener("focus", () => {
      window.clearTimeout(hoverTimer);
      hoverTimer = window.setTimeout(() => {
        prefetchLinkedRoute(link.getAttribute("href") || "").catch(() => {});
      }, 100);
    });
    link.addEventListener("blur", () => {
      window.clearTimeout(hoverTimer);
      hoverTimer = null;
    });
  });
}

async function boot() {
  const starter = await loadJson(paths.starter);
  state.proteins = starter.proteins || [];
  await selectProtein("P04637");
  registerOfflineCache();
  warmSavedProteinCache();
  setupPredictivePrefetch();

  $("#searchForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const query = $("#proteinSearch").value.trim();
    const exact = state.proteins.find((protein) => normalize(protein.accession) === normalize(query));
    const match = exact || rankedProteins(query)[0];
    if (match) selectProtein(match.accession);
  });
  $("#proteinSearch").addEventListener("input", renderSuggestions);
  $("#proteinSearch").addEventListener("focus", renderSuggestions);
  $("#proteinSearch").addEventListener("blur", () => setTimeout(() => { $("#suggestions").hidden = true; }, 140));
  $("#suggestions").addEventListener("mousedown", (event) => {
    const button = event.target.closest("button[data-accession]");
    if (!button) return;
    event.preventDefault();
    selectProtein(button.dataset.accession);
  });
  $("#clearSearch").addEventListener("click", () => {
    $("#proteinSearch").value = "";
    $("#proteinSearch").focus();
    renderSuggestions();
  });
  $("#downloadRecord").addEventListener("click", downloadSelectedRecord);
  $("#downloadFasta").addEventListener("click", downloadFasta);
  $("#downloadFeatures").addEventListener("click", downloadFeaturesCsv);
  $("#downloadSources").addEventListener("click", downloadSources);
  $("#expandSequence").addEventListener("click", () => setSequenceModalOpen(true));
  document.querySelectorAll("[data-close-modal]").forEach((node) => node.addEventListener("click", () => setSequenceModalOpen(false)));
  $("#menuButton").addEventListener("click", () => $("#drawer").classList.add("open"));
  $("#closeDrawer").addEventListener("click", () => $("#drawer").classList.remove("open"));
  $("#drawer").addEventListener("click", (event) => {
    if (event.target.closest("a")) $("#drawer").classList.remove("open");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  boot().catch((error) => {
    $("#proteinTitle").textContent = "Static data could not be loaded";
    $("#proteinSubtitle").textContent = error.message;
  });
});
