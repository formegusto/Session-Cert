import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import sequelize from "./models";
import routes from "./routes";
import cors from "cors";

dotenv.config();

class App {
  app: express.Application;

  constructor() {
    this.app = express();
    this.SetMW();
    this.Routes();
  }

  SetMW() {
    this.app.use(morgan("dev"));
    this.app.use(cors());
    this.app.use(express.json());
  }

  Routes() {
    this.app.use(routes);
  }

  Start() {
    // connect DB
    sequelize
      .sync({
        force: true,
      })
      .then(async () => {
        console.log("[sequelize] synchronizing success :)");
      })
      .catch((err) => {
        console.error(err);
      });

    const port = process.env.PORT || "8080";
    this.app.listen(port, () => {
      console.log(`[server] start ${port} :)`);
    });
  }
}

export default new App().Start();
