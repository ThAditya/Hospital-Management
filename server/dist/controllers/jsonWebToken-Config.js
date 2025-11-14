import dotenv from 'dotenv';
dotenv.config();
if (!process.env.SECRET_KEY) {
    throw new Error("FATAL ERROR: SECRET_KEY is not defined.");
}
export const SECRET_KEY = process.env.SECRET_KEY;
