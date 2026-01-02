import dotenv from "dotenv";
dotenv.config();

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: parseInt(process.env.PORT, 10) || 4000,
  JWT_SECRET: process.env.JWT_SECRET || "changeme",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
  CORS_ORIGIN: process.env.CORS_ORIGIN || "*",
  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_PORT: process.env.EMAIL_PORT,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
};
