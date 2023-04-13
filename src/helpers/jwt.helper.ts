import dotenv from "dotenv";
import { sign, decode, JwtPayload } from "jsonwebtoken";

dotenv.config();

const secret: string = process.env.JWT_SECRET ?? "";

const generateToken = (id: string): string => sign({ id }, secret);

const decodeToken = (token: string): string | null | JwtPayload =>
  decode(token);

export { generateToken, decodeToken };
