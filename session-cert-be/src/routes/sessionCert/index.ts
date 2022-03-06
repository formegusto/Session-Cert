import express from "express";
import SessionCertModel from "../../models/sessionCert";
import getRandomBytes from "../../utils/getRandomBytes";
import { _generateKeyPair } from "../../utils/_generateKeyPair";

class SessionCertRoutes {
  routes: express.Router;

  constructor() {
    this.routes = express.Router();
    this.SetRoutes();
  }

  SetRoutes() {
    this.routes.get(
      "/publicKey",
      async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        const passphrase = getRandomBytes(32);
        const keyPair = await _generateKeyPair(passphrase);

        try {
          const sessionCert = await SessionCertModel.create({
            passphrase,
            ...keyPair,
          });

          return res.json({
            sessionCert: {
              id: sessionCert.id,
              publicKey: sessionCert.publicKey,
            },
          });
        } catch (err) {
          return next(err);
        }
      }
    );
  }
}

export default new SessionCertRoutes().routes;
