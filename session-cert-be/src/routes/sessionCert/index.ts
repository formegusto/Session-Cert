import express from "express";

class SessionCertRoutes {
  routes: express.Router;

  constructor() {
    this.routes = express.Router();
    this.SetRoutes();
  }

  SetRoutes() {
    this.routes.get("/", (req: express.Request, res: express.Response) => {
      return res.json("hello!");
    });
  }
}

export default new SessionCertRoutes().routes;
