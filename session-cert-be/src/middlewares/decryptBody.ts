import express from "express";
import SessionCertModel from "../models/sessionCert";
import CryptoJS from "crypto-js";

export default async function decryptBody(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const certId = req.headers["session-cert-id"];

    if (certId) {
      const sessionCert = await SessionCertModel.findByPk(
        parseInt(certId as string)
      );

      const symmetricKey = sessionCert?.symmetricKey;
      const encBody = req.body;
      const decBody = CryptoJS.AES.decrypt(encBody, symmetricKey!);

      req.body = decBody.toString(CryptoJS.enc.Utf8);
    } else {
      throw new Error();
    }
  } catch (err) {
    return next(err);
  }

  return next();
}
