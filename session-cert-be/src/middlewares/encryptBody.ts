import express from "express";
import SessionCertModel from "../models/sessionCert";
import CryptoJS from "crypto-js";

export default async function encryptBody(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const body = res.body;
  const certId = req.headers["session-cert-id"];

  if (body && certId) {
    const bodyStr = JSON.stringify(body);
    const sessionCert = await SessionCertModel.findByPk(
      parseInt(certId as string)
    );

    const symmetricKey = sessionCert?.symmetricKey;
    const encBody = CryptoJS.AES.encrypt(bodyStr, symmetricKey!).toString();

    return res.status(200).send(encBody);
  }

  return res.status(403).json({
    status: false,
  });
}
