import axios, { AxiosResponse } from "axios";
import { makeAutoObservable } from "mobx";
import RootStore from "..";
import { SessionCert } from "./types";
import CryptoJS from "crypto-js";

class ApiTestStore {
  root: RootStore;
  cert?: SessionCert;

  requestData?: string;
  responseData?: string;

  constructor(root: RootStore) {
    makeAutoObservable(this, {}, { autoBind: true });
    this.root = root;
  }

  setCert(cert: SessionCert) {
    this.cert = cert;
  }

  encryptText(text: string) {
    this.requestData = CryptoJS.AES.encrypt(
      text,
      this.cert!.symmetricyKey
    ).toString();
    console.log(this.requestData);
  }

  *apiTest(): Generator {
    try {
      const res = yield axios.post(
        `${process.env.REACT_APP_SERVER_API}/apiTest`,
        this.requestData,
        {
          headers: {
            "Content-type": "text/plain",
            "session-cert-id": this.cert!.id,
          },
        }
      );

      this.responseData = (res as AxiosResponse<string>).data;
    } catch (err) {
      console.error(err);
    }
  }

  decryptText() {
    this.responseData = JSON.stringify(
      JSON.parse(
        CryptoJS.AES.decrypt(
          this.responseData!,
          this.cert!.symmetricyKey
        ).toString(CryptoJS.enc.Utf8)
      ),
      null,
      2
    );
  }
}

export default ApiTestStore;
