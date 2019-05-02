export interface IDatabaseConfig {
  dialect: "sqlite";
  storage: string;
}

export interface IConfigApp {
  port: number;
  database: IDatabaseConfig;
} 