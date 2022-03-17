import { AxiosResponse } from "axios";
import { makeAutoObservable } from "mobx";
import RootStore from "..";
import api from "../../api";
import getRandomBytes from "../../utils/getRandomBytes";
import { SessionCert } from "./types";
import { publicEncrypt } from "crypto-browserify";
import { Buffer } from "buffer";
import CryptoJS from "crypto-js";

class SessionCertStore {
  root: RootStore;
  id?: number;
  publicKey?: string;
  symmetricKey?: string;
  encBody?: string;
  estabilish: boolean;
  duration: number;

  constructor(root: RootStore) {
    makeAutoObservable(this, {}, { autoBind: true });
    this.root = root;
    this.estabilish = false;
    this.duration = 500;
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

  *generateSymmetricKey(): Generator {
    try {
      const symmetricKey = getRandomBytes(32);

      this.symmetricKey = symmetricKey;
      const encSymmetricKey = publicEncrypt(
        this.publicKey,
        Buffer.from(symmetricKey)
      ).toString("base64");

      const res = yield api["sessionCert"].postSymmetricKey({
        id: this.id!,
        symmetricKey: encSymmetricKey,
      });

      this.encBody = (res as AxiosResponse<string>).data;
    } catch (err) {
      console.error(err);
    }
  }

  *matchingEncBody(): Generator {
    try {
      const decBodyWord = CryptoJS.AES.decrypt(
        this.encBody!,
        this.symmetricKey!
      );
      const decBody = JSON.parse(decBodyWord.toString(CryptoJS.enc.Utf8));
      const encBody = CryptoJS.AES.encrypt(
        JSON.stringify(decBody),
        this.symmetricKey!
      ).toString();

      const res = yield api["sessionCert"].patchEstablish(this.id!, encBody);

      if ((res as AxiosResponse<any>).data.status) this.estabilish = true;
    } catch (err) {
      console.error(err);
    }
  }
}

export default SessionCertStore;
