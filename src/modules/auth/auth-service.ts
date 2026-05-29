import jwt from "jsonwebtoken";

export interface JwtUser {
  id: string;
  email: string;
  name?: string;
}

export function signSessionToken(user: JwtUser) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is required");
  }

  return jwt.sign(user, secret, {
    expiresIn: "7d",
    audience: "protein-workbench",
    issuer: "protein-workbench-api"
  });
}

export function verifySessionToken(token: string): JwtUser {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is required");
  }

  return jwt.verify(token, secret, {
    audience: "protein-workbench",
    issuer: "protein-workbench-api"
  }) as JwtUser;
}
