import express from "express";
import decryptBody from "../middlewares/decryptBody";
import encryptBody from "../middlewares/encryptBody";
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
    this.routes.use("/apiTest", encryptBody, apiTest, decryptBody);
  }
}

export default new _Routes().routes;
