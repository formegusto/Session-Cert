import React from "react";

import { Buffer } from "buffer";

function App() {
  React.useEffect(() => {
    console.log(Buffer.alloc(12, 0));
  }, []);

  return <></>;
}

export default App;
