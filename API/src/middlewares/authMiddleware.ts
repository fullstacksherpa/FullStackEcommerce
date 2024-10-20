import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function verifyToken(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.header("Authorization");

  // Ensure the Authorization header exists and starts with 'Bearer '
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Access denied" });
    return; // Ensure no further processing
  }

  // Extract the token (after 'Bearer ')
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "your-secret-top");
    if (typeof decoded !== "object" || !decoded?.userId) {
      res.status(401).json({ error: "Access denied" });
      return;
    }
    req.userId = decoded.userId;
    next(); // Proceed to the next middleware
  } catch (error) {
    res.status(401).json({ error: "Access denied" });
  }
}

export function verifySeller(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.header("Authorization");

  // Ensure the Authorization header exists and starts with 'Bearer '
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Access denied" });
    return; // Ensure no further processing
  }

  // Extract the token (after 'Bearer ')
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "your-secret-top");
    if (typeof decoded !== "object" || !decoded?.userId) {
      res.status(401).json({ error: "Access denied" });
      return;
    }

    if (decoded?.role !== "seller") {
      res.status(401).json({ error: "you donot have access" });
      return;
    }
    req.userId = decoded.userId;
    next(); // Proceed to the next middleware
  } catch (error) {
    res.status(401).json({ error: "Access denied" });
  }
}
