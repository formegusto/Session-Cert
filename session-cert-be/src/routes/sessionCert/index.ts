import express from "express";
import SessionCertModel from "../../models/sessionCert";
import getRandomBytes from "../../utils/getRandomBytes";
import { _generateKeyPair } from "../../utils/_generateKeyPair";
import { createPrivateKey, privateDecrypt } from "crypto";
import { SessionStatus } from "../../models/sessionCert/types";
import CryptoJS from "crypto-js";

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

    this.routes.post(
      "/symmetricKey",
      async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        const body = req.body;

        try {
          const { id, symmetricKey } = body;
          const sessionCert = await SessionCertModel.findByPk(id);

          if (!sessionCert) {
            throw new Error("존재하지 않는 인증서 입니다.");
          }

          const { privateKey, passphrase } = sessionCert;
          const key = createPrivateKey({
            key: privateKey,
            format: "pem",
            passphrase: passphrase,
          });

          const _symmetricKey = privateDecrypt(
            key,
            Buffer.from(body.symmetricKey.toString(), "base64")
          ).toString("utf8");
          const testString = getRandomBytes(32);
          const updateCert = await sessionCert.update({
            status: SessionStatus.MATCHING,
            symmetricKey: _symmetricKey,
            testString: testString,
          });

          const resBody = {
            testString,
          };
          console.log("original :", resBody);
          const encResBody = CryptoJS.AES.encrypt(
            JSON.stringify(resBody),
            _symmetricKey
          ).toString();
          console.log("encrpyt :", encResBody);

          return res.status(201).send(encResBody);
        } catch (err) {
          return next(err);
        }
      }
    );

    this.routes.patch(
      "/establish",
      async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        const encBody = req.body;

        try {
          const id = req.headers["session-cert-id"];

          if (!id) {
            throw new Error("인증서 ID가 공란입니다.");
          }
          const sessionCert = await SessionCertModel.findByPk(id.toString());
          if (!sessionCert) {
            throw new Error("존재하지 않는 인증서 번호입니다.");
          }

          const { symmetricKey } = sessionCert;
          const decBodyWord = CryptoJS.AES.decrypt(encBody, symmetricKey);
          const decBody = JSON.parse(decBodyWord.toString(CryptoJS.enc.Utf8));

          console.log(decBody);

          return res.status(200).json({
            status: true,
          });
        } catch (err) {
          return next(err);
        }
      }
    );
  }
}

export default new SessionCertRoutes().routes;
