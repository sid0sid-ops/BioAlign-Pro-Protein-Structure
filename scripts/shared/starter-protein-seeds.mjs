export const starterProteinSeeds = [
  {
    accession: "P04637",
    geneName: "TP53",
    displayName: "Tumor protein p53",
    aliases: ["TP53", "p53", "tumor protein p53", "cellular tumor antigen p53"],
    relevance: "Central tumor suppressor and genome-stability regulator; among the most studied cancer proteins.",
    fallbackOrganism: "Homo sapiens",
    fallbackLength: 393,
    representativePdbIds: ["1TUP", "2OCJ", "4MZI"],
    domains: [
      { name: "Transactivation domain", type: "region", start: 1, end: 61 },
      { name: "DNA-binding core domain", type: "domain", start: 102, end: 292 },
      { name: "Tetramerization domain", type: "domain", start: 325, end: 356 }
    ],
    pathways: ["DNA damage response", "cell-cycle arrest", "apoptosis"],
    interactions: ["MDM2", "TP73", "EP300"]
  },
  {
    accession: "P69905",
    geneName: "HBA1",
    displayName: "Hemoglobin subunit alpha",
    aliases: ["hemoglobin alpha", "haemoglobin alpha", "HBA", "HBA1", "alpha globin", "hemoglobin"],
    relevance: "Oxygen transport subunit of adult hemoglobin; clinically important in hemoglobinopathies.",
    fallbackOrganism: "Homo sapiens",
    fallbackLength: 142,
    representativePdbIds: ["1A3N", "2DN2", "4HHB"],
    domains: [{ name: "Globin fold", type: "family", start: 2, end: 142 }],
    pathways: ["oxygen transport", "heme coordination"],
    interactions: ["HBB", "AHSP", "HBD"]
  },
  {
    accession: "P68871",
    geneName: "HBB",
    displayName: "Hemoglobin subunit beta",
    aliases: ["hemoglobin beta", "haemoglobin beta", "HBB", "beta globin", "sickle cell protein", "hemoglobin"],
    relevance: "Oxygen transport subunit; the Glu6Val variant causes sickle cell disease.",
    fallbackOrganism: "Homo sapiens",
    fallbackLength: 147,
    representativePdbIds: ["1A3N", "2HBS", "4HHB"],
    domains: [{ name: "Globin fold", type: "family", start: 2, end: 147 }],
    pathways: ["oxygen transport", "heme coordination"],
    interactions: ["HBA1", "HBA2", "BPGM"]
  },
  {
    accession: "P00533",
    geneName: "EGFR",
    displayName: "Epidermal growth factor receptor",
    aliases: ["EGFR", "epidermal growth factor receptor", "ERBB1"],
    relevance: "Receptor tyrosine kinase and major oncology drug target.",
    fallbackOrganism: "Homo sapiens",
    fallbackLength: 1210,
    representativePdbIds: ["1M17", "2GS6", "3NJP"],
    domains: [
      { name: "Extracellular ligand-binding region", type: "region", start: 25, end: 645 },
      { name: "Protein kinase domain", type: "domain", start: 712, end: 979 }
    ],
    pathways: ["EGFR signaling", "MAPK signaling", "PI3K-AKT signaling"],
    interactions: ["EGF", "GRB2", "ERBB2"]
  },
  {
    accession: "P38398",
    geneName: "BRCA1",
    displayName: "Breast cancer type 1 susceptibility protein",
    aliases: ["BRCA1", "breast cancer type 1 susceptibility protein"],
    relevance: "DNA repair and tumor-suppressor protein associated with hereditary breast and ovarian cancer risk.",
    fallbackOrganism: "Homo sapiens",
    fallbackLength: 1863,
    representativePdbIds: ["1JM7", "1T15", "4IGK"],
    domains: [
      { name: "RING domain", type: "domain", start: 24, end: 64 },
      { name: "BRCT domains", type: "domain", start: 1646, end: 1859 }
    ],
    pathways: ["homologous recombination", "DNA damage checkpoint"],
    interactions: ["BARD1", "PALB2", "RAD51"]
  },
  {
    accession: "P51587",
    geneName: "BRCA2",
    displayName: "Breast cancer type 2 susceptibility protein",
    aliases: ["BRCA2", "breast cancer type 2 susceptibility protein"],
    relevance: "Homologous recombination mediator associated with hereditary breast, ovarian, pancreatic, and prostate cancer risk.",
    fallbackOrganism: "Homo sapiens",
    fallbackLength: 3418,
    representativePdbIds: ["1MJE", "1N0W", "1MIU"],
    domains: [
      { name: "BRC repeats", type: "repeat", start: 1002, end: 2082 },
      { name: "DNA-binding domain", type: "domain", start: 2479, end: 3190 }
    ],
    pathways: ["homologous recombination", "DNA double-strand break repair"],
    interactions: ["RAD51", "PALB2", "DSS1"]
  },
  {
    accession: "P01308",
    geneName: "INS",
    displayName: "Insulin",
    aliases: ["insulin", "INS"],
    relevance: "Peptide hormone controlling glucose homeostasis; central to diabetes biology.",
    fallbackOrganism: "Homo sapiens",
    fallbackLength: 110,
    representativePdbIds: ["1TRZ", "2INS", "4INS"],
    domains: [{ name: "Insulin family peptide", type: "family", start: 25, end: 110 }],
    pathways: ["insulin signaling", "glucose homeostasis"],
    interactions: ["INSR", "IGF1R", "CPE"]
  },
  {
    accession: "P02768",
    geneName: "ALB",
    displayName: "Serum albumin",
    aliases: ["albumin", "serum albumin", "ALB", "HSA"],
    relevance: "Most abundant plasma protein; carrier for fatty acids, hormones, drugs, and metabolites.",
    fallbackOrganism: "Homo sapiens",
    fallbackLength: 609,
    representativePdbIds: ["1AO6", "1BM0", "4K2C"],
    domains: [
      { name: "Albumin domain I", type: "domain", start: 25, end: 210 },
      { name: "Albumin domain II", type: "domain", start: 211, end: 403 },
      { name: "Albumin domain III", type: "domain", start: 404, end: 609 }
    ],
    pathways: ["transport", "drug binding"],
    interactions: ["FASN", "FCGRT", "TTR"]
  },
  {
    accession: "P05067",
    geneName: "APP",
    displayName: "Amyloid-beta precursor protein",
    aliases: ["APP", "amyloid beta", "amyloid precursor protein", "Alzheimer protein"],
    relevance: "Precursor of amyloid-beta peptides central to Alzheimer's disease research.",
    fallbackOrganism: "Homo sapiens",
    fallbackLength: 770,
    representativePdbIds: ["1AAP", "2LP1", "3UMH"],
    domains: [
      { name: "E1 domain", type: "domain", start: 18, end: 190 },
      { name: "Amyloid-beta region", type: "region", start: 672, end: 713 }
    ],
    pathways: ["amyloid processing", "synaptic biology"],
    interactions: ["BACE1", "PSEN1", "APBB1"]
  },
  {
    accession: "P10636",
    geneName: "MAPT",
    displayName: "Microtubule-associated protein tau",
    aliases: ["tau", "MAPT", "microtubule-associated protein tau"],
    relevance: "Microtubule-associated protein implicated in tauopathies and Alzheimer's disease.",
    fallbackOrganism: "Homo sapiens",
    fallbackLength: 758,
    representativePdbIds: ["2MZ7", "5O3L", "6HRE"],
    domains: [{ name: "Microtubule-binding repeats", type: "repeat", start: 244, end: 369 }],
    pathways: ["microtubule organization", "neurodegeneration"],
    interactions: ["TUBA1A", "TUBB", "FYN"]
  },
  {
    accession: "P01116",
    geneName: "KRAS",
    displayName: "GTPase KRas",
    aliases: ["KRAS", "K-Ras", "GTPase KRas"],
    relevance: "Small GTPase and major oncogene in pancreatic, colorectal, and lung cancers.",
    fallbackOrganism: "Homo sapiens",
    fallbackLength: 189,
    representativePdbIds: ["4OBE", "5P21", "6OIM"],
    domains: [{ name: "Small GTPase domain", type: "domain", start: 1, end: 166 }],
    pathways: ["RAS-MAPK signaling", "PI3K signaling"],
    interactions: ["RAF1", "SOS1", "NF1"]
  },
  {
    accession: "P01112",
    geneName: "HRAS",
    displayName: "GTPase HRas",
    aliases: ["HRAS", "H-Ras", "GTPase HRas"],
    relevance: "Canonical RAS-family small GTPase involved in growth signaling and cancer.",
    fallbackOrganism: "Homo sapiens",
    fallbackLength: 189,
    representativePdbIds: ["1CTQ", "5P21", "6Q21"],
    domains: [{ name: "Small GTPase domain", type: "domain", start: 1, end: 166 }],
    pathways: ["RAS-MAPK signaling"],
    interactions: ["RAF1", "SOS1", "PIK3CA"]
  },
  {
    accession: "P01111",
    geneName: "NRAS",
    displayName: "GTPase NRas",
    aliases: ["NRAS", "N-Ras", "GTPase NRas"],
    relevance: "RAS-family small GTPase implicated in melanoma, leukemia, and other cancers.",
    fallbackOrganism: "Homo sapiens",
    fallbackLength: 189,
    representativePdbIds: ["3CON", "5UHV", "6ZIZ"],
    domains: [{ name: "Small GTPase domain", type: "domain", start: 1, end: 166 }],
    pathways: ["RAS-MAPK signaling"],
    interactions: ["RAF1", "SOS1", "RASSF1"]
  },
  {
    accession: "Q9BYF1",
    geneName: "ACE2",
    displayName: "Angiotensin-converting enzyme 2",
    aliases: ["ACE2", "angiotensin-converting enzyme 2", "SARS receptor"],
    relevance: "Cell-surface receptor used by SARS-CoV and SARS-CoV-2 spike proteins.",
    fallbackOrganism: "Homo sapiens",
    fallbackLength: 805,
    representativePdbIds: ["1R42", "6M0J", "6VW1"],
    domains: [
      { name: "Peptidase M2 domain", type: "domain", start: 19, end: 615 },
      { name: "Collectrin-like domain", type: "domain", start: 616, end: 768 }
    ],
    pathways: ["renin-angiotensin system", "viral entry"],
    interactions: ["SARS2-S", "AGT", "TMPRSS2"]
  },
  {
    accession: "P0DTC2",
    geneName: "S",
    displayName: "SARS-CoV-2 spike glycoprotein",
    aliases: ["spike", "SARS-CoV-2 spike", "coronavirus spike", "S protein"],
    relevance: "Viral entry glycoprotein and dominant antigen in SARS-CoV-2 vaccines and neutralization studies.",
    fallbackOrganism: "Severe acute respiratory syndrome coronavirus 2",
    fallbackLength: 1273,
    representativePdbIds: ["6VSB", "6M0J", "7DF4"],
    domains: [
      { name: "S1 receptor-binding region", type: "region", start: 14, end: 685 },
      { name: "S2 fusion machinery", type: "region", start: 686, end: 1273 }
    ],
    pathways: ["viral attachment", "membrane fusion"],
    interactions: ["ACE2", "TMPRSS2"]
  },
  {
    accession: "P60709",
    geneName: "ACTB",
    displayName: "Actin, cytoplasmic 1",
    aliases: ["actin", "ACTB", "beta actin"],
    relevance: "Highly conserved cytoskeletal protein used in motility, structure, and housekeeping biology.",
    fallbackOrganism: "Homo sapiens",
    fallbackLength: 375,
    representativePdbIds: ["1J6Z", "2BTF", "6DJO"],
    domains: [{ name: "Actin family domain", type: "domain", start: 5, end: 375 }],
    pathways: ["cytoskeleton organization", "cell motility"],
    interactions: ["MYH9", "TMSB4X", "PFN1"]
  },
  {
    accession: "Q71U36",
    geneName: "TUBA1A",
    displayName: "Tubulin alpha-1A chain",
    aliases: ["tubulin", "alpha tubulin", "TUBA1A"],
    relevance: "Core microtubule subunit important for cytoskeletal dynamics and neurodevelopment.",
    fallbackOrganism: "Homo sapiens",
    fallbackLength: 451,
    representativePdbIds: ["1JFF", "5SYF", "6DPU"],
    domains: [{ name: "Tubulin/FtsZ domain", type: "domain", start: 35, end: 450 }],
    pathways: ["microtubule polymerization", "cell division"],
    interactions: ["TUBB", "MAPT", "KIF5B"]
  },
  {
    accession: "P02452",
    geneName: "COL1A1",
    displayName: "Collagen alpha-1(I) chain",
    aliases: ["collagen", "COL1A1", "collagen type I alpha 1"],
    relevance: "Major extracellular matrix protein; mutations are linked to osteogenesis imperfecta and connective tissue disorders.",
    fallbackOrganism: "Homo sapiens",
    fallbackLength: 1464,
    representativePdbIds: ["1CAG", "3HQV", "5CTI"],
    domains: [{ name: "Collagen triple helix", type: "repeat", start: 162, end: 1218 }],
    pathways: ["extracellular matrix organization", "bone matrix formation"],
    interactions: ["COL1A2", "SPARC", "MMP1"]
  },
  {
    accession: "P42212",
    geneName: "GFP",
    displayName: "Green fluorescent protein",
    aliases: ["GFP", "green fluorescent protein"],
    relevance: "Canonical fluorescent reporter protein from jellyfish, foundational in cell biology imaging.",
    fallbackOrganism: "Aequorea victoria",
    fallbackLength: 238,
    representativePdbIds: ["1EMA", "1GFL", "2B3P"],
    domains: [{ name: "GFP beta-barrel", type: "domain", start: 3, end: 230 }],
    pathways: ["fluorescence reporter"],
    interactions: []
  }
];
