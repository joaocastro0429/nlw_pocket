import { defineConfig } from 'drizzle-kit';
import { env } from './src/env';

export default defineConfig({
  schema: "./src/db/schema.ts",   // Path to your schema file
  out: './.migrations',         // Output directory for migration files
  dialect: 'postgresql',       // Database dialect
  dbCredentials: {
    url: env.DB_URL,           // Database connection URL
  }
});
