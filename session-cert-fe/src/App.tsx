import React from "react";
import api from "./api";

function App() {
  const [publicKey, setPublicKey] = React.useState<string | null>(null);

  // 1. get public key process
  const getPublicKey = React.useCallback(async () => {
    try {
      const res = await api["sessionCert"].getPublicKey();
      const sessionCert = res.data.sessionCert;

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

  return <></>;
}

export default App;
