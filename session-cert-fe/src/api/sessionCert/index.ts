import client from "../client";

const basePATH = "/sessionCert";

export const getPublicKey = async () =>
  await client.get(`${basePATH}/publicKey`);

export const postSymmetricKey = async (data: any) =>
  await client.post(`${basePATH}/symmetricKey`, data);
