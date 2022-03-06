import React from "react";
import api from "./api";
import getRandomBytes from "./utils/getRandomBytes";
import { publicEncrypt } from "crypto-browserify";
import { Buffer } from "buffer";

function App() {
  const [certId, setCertId] = React.useState<number | null>(null);
  const [publicKey, setPublicKey] = React.useState<string | null>(null);
  const [symmetricKey, setSymmetricKey] = React.useState<string | null>(null);

  // 1. get public key process
  const getPublicKey = React.useCallback(async () => {
    try {
      const res = await api["sessionCert"].getPublicKey();
      const sessionCert = res.data.sessionCert;

      setCertId(sessionCert.id);
      setPublicKey(sessionCert.publicKey);
    } catch (err) {
      console.error(err);
    }
  }, []);

  React.useEffect(() => {
    if (!publicKey) {
      getPublicKey();
    }
  }, [publicKey, getPublicKey]);

  // 2. generate SymmetricKey
  const postSymmetricKey = React.useCallback(
    async (encSymmetricKey) => {
      try {
        const res = await api["sessionCert"].postSymmetricKey({
          id: certId,
          symmetricKey: encSymmetricKey,
        });

        console.log(res);
      } catch (err) {
        console.error(err);
      }
    },
    [certId]
  );

  React.useEffect(() => {
    if (publicKey) {
      const symmetricKey = getRandomBytes(32);
      setSymmetricKey(symmetricKey);
    }
  }, [publicKey]);

  React.useEffect(() => {
    if (symmetricKey) {
      console.log("대칭키", symmetricKey);
      const encSymmetricKey = publicEncrypt(
        publicKey,
        Buffer.from(symmetricKey)
      ).toString("base64");
      console.log("대칭키 (암호화)", encSymmetricKey);

      postSymmetricKey(encSymmetricKey);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicKey, symmetricKey]);

  return <></>;
}

export default App;
