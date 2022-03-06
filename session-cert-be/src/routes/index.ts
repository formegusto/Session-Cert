import express from "express";
import sessionCert from "./sessionCert";

class _Routes {
  routes: express.Router;

  constructor() {
    this.routes = express.Router();
    this.SetRoutes();
  }

  SetRoutes() {
    this.routes.use("/sessionCert", sessionCert);
  }
}

export default new _Routes().routes;
