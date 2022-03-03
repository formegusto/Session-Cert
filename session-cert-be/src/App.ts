import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";

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
  }

  Routes() {}

  Start() {
    const port = process.env.PORT || "8080";
    this.app.listen(port, () => {
      console.log(`[server] start ${port} :)`);
    });
  }
}

export default new App().Start();
