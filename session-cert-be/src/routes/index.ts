import express from "express";
import encryptBody from "../middlewares/encryptBody";
import decryptBody from "../middlewares/decryptBody";
import apiTest from "./apiTest";
import sessionCert from "./sessionCert";

class _Routes {
  routes: express.Router;

  constructor() {
    this.routes = express.Router();
    this.SetRoutes();
  }

  SetRoutes() {
    this.routes.use("/sessionCert", sessionCert);
    this.routes.use("/apiTest", decryptBody, apiTest, encryptBody);
  }
}

export default new _Routes().routes;
