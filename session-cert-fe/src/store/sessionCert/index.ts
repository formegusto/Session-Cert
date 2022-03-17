import { AxiosResponse } from "axios";
import { makeAutoObservable } from "mobx";
import RootStore from "..";
import api from "../../api";
import { SessionCert } from "./types";

class SessionCertStore {
  root: RootStore;
  id?: number;
  publicKey?: string;

  constructor(root: RootStore) {
    makeAutoObservable(this, {}, { autoBind: true });
    this.root = root;
  }

  *getPublicKey(): Generator {
    try {
      const res = yield api["sessionCert"].getPublicKey();

      const { id, publicKey } = (
        res as AxiosResponse<{
          sessionCert: SessionCert;
        }>
      ).data.sessionCert;

      this.id = id;
      this.publicKey = publicKey;
    } catch (err) {
      console.error(err);
    }
  }
}

export default SessionCertStore;
