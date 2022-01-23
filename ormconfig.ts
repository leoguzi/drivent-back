import "./src/setup";

export default {
  type: "postgres",
  url: process.env.DATABASE_URL,
  migrationsTableName: "migrations", 
  entities: ["dist/entities/*.js"],
  migrations: ["dist/migrations/*.js"],
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  cli: {
    migrationsDir: "src/migrations",
    entitiesDir: "dist/entities/*.js",
  },
};
