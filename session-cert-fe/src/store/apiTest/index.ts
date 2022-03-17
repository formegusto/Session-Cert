import axios, { AxiosInstance } from "axios";
import { makeAutoObservable } from "mobx";
import RootStore from "..";
import { SessionCert } from "./types";
import CryptoJS from "crypto-js";

class ApiTestStore {
  root: RootStore;
  cert?: SessionCert;

  client?: AxiosInstance;
  requestData?: string;
  responseData?: string;

  constructor(root: RootStore) {
    makeAutoObservable(this, {}, { autoBind: true });
    this.root = root;
  }

  setCert(cert: SessionCert) {
    this.cert = cert;
    this.client = axios.create({
      baseURL: process.env.REACT_APP_SERVER_API!,
      headers: {
        "session-cert-id": cert.id,
      },
    });
  }

  encryptText(text: string) {
    this.requestData = CryptoJS.AES.encrypt(
      text,
      this.cert!.symmetricyKey
    ).toString();
    console.log(this.requestData);
  }
}

export default ApiTestStore;
