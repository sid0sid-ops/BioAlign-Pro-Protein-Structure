import compression from "compression";
import cors from "cors";
import express, { ErrorRequestHandler } from "express";
import morgan from "morgan";
import { apiRateLimit, sanitizeBody, securityHeaders } from "./middleware/security";
import { proteinRouter } from "./routes/protein";

const app = express();
const port = Number(process.env.PORT ?? 4000);

app.use(securityHeaders);
app.use(
  cors({
    origin: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
    credentials: true
  })
);
app.use(apiRateLimit);
app.use(compression());
app.use(express.json({ limit: "2mb" }));
app.use(sanitizeBody);
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

app.get("/api/health", (_request, response) => {
  response.json({
    status: "ok",
    uptime: process.uptime(),
    providers: [
      "UniProt",
      "RCSB PDB",
      "NCBI BLAST",
      "AlphaFold DB",
      "PDBe",
      "Foldseek",
      "ESM Atlas"
    ],
    timestamp: new Date().toISOString()
  });
});

app.use("/api/protein", proteinRouter);

const errorHandler: ErrorRequestHandler = (error, _request, response, next) => {
  void next;
  console.error(error);
  response.status(500).json({
    error: "Internal API error",
    message: error instanceof Error ? error.message : "Unknown error"
  });
};

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Protein Workbench API listening on http://localhost:${port}`);
});
