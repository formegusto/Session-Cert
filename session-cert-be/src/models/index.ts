import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import SessionCertModel from "./sessionCert.ts";

dotenv.config();

const database = process.env.DB_NAME;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const port = parseInt(process.env.DB_PORT!);

const sequelize = new Sequelize(database!, username!, password!, {
  host,
  port,
  dialect: "mysql",
});

SessionCertModel.initConfig(sequelize);

export default sequelize;
