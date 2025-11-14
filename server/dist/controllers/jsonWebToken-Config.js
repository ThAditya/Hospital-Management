import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });
if (!process.env.SECRET_KEY) {
    throw new Error("FATAL ERROR: SECRET_KEY is not defined.");
}
export const SECRET_KEY = process.env.SECRET_KEY;
