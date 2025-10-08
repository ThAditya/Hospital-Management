// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";

// interface JwtPayload {
//   id: string;
//   email?: string;
//   role?: string;
// }

// export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
//   const token = req.header("Authorization")?.replace("Bearer ", "");

//   if (!token) {
//     res.status(401).json({ error: "Access denied, token missing" });
//     return;
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
//     (req as any).user = decoded;
//     next();
//   } catch (err) {
//     res.status(401).json({ error: "Invalid token" });
//   }
// };

