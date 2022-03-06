import React from "react";
import { publicEncrypt } from "crypto-browserify";
import { Buffer } from "buffer";

function App() {
  React.useEffect(() => {
    console.log(Buffer.alloc(12, 0));
    console.log(publicEncrypt);
  }, []);

  return <></>;
}

export default App;
