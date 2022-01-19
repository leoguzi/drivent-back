
import dotenv from "dotenv";

let path;

if (process.env.NODE_ENV === "production")
  path = ".env.production";
else if (process.env.NODE_ENV === "development")
  path = ".env.development";
else
  path = ".env.test";

dotenv.config({ path });
