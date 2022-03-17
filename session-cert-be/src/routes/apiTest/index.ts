import express from "express";

class ApiTestRoutes {
  routes: express.Router;

  constructor() {
    this.routes = express.Router();
    this.SetRoutes();
  }

  SetRoutes() {
    this.routes.post(
      "/",
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        res.body = {
          status: true,
          message: "보내오신 데이터를 확인해주세요.",
          requestData: req.body,
        };

        return next();
      }
    );
  }
}

export default new ApiTestRoutes().routes;
