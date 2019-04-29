import { Sequelize } from "sequelize-typescript";
import { confApp } from "./index";
import { Hotel } from "./models/hotel";

console.log(__dirname + "/" + confApp.database.storage);


export const sequelize: Sequelize = new Sequelize({
  dialect: confApp.database.dialect,
  storage: __dirname + "/" + confApp.database.storage,
  define: {
    timestamps: true,
    paranoid: true,
  },
  timezone: '+00:00',
  logging: true,
});

sequelize.addModels([Hotel]);