import client from "../client";

const basePATH = "/sessionCert";

export const getPublicKey = async () =>
  await client.get(`${basePATH}/publicKey`);
