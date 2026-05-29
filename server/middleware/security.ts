import { NextFunction, Request, Response } from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

function sanitizeValue(value: unknown): unknown {
  if (typeof value === "string") {
    return value.replace(/<script/gi, "&lt;script").replace(/javascript:/gi, "");
  }

  if (Array.isArray(value)) {
    return value.map(sanitizeValue);
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, nested]) => [key, sanitizeValue(nested)]));
  }

  return value;
}

export const securityHeaders = helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
});

export const apiRateLimit = rateLimit({
  windowMs: 60_000,
  limit: 120,
  standardHeaders: true,
  legacyHeaders: false
});

export function sanitizeBody(request: Request, _response: Response, next: NextFunction) {
  if (request.body) {
    request.body = sanitizeValue(request.body);
  }
  next();
}
