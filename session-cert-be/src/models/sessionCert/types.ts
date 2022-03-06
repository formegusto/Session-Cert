import { Optional } from "sequelize/types";

export type SessionCertAttributes = {
  readonly id: number;
  publicKey: string;
  privateKey: string;
  passphrase: string;
  symmetricKey?: string;
  status?: SessionStatus;
  testString?: string;
};

export interface SessionCertCreationAttributes
  extends Optional<SessionCertAttributes, "id"> {}

export enum SessionStatus {
  INIT = "init",
  MATCHING = "matching",
  ESTABLISH = "establish",
  EXPIRATION = "expiration",
}
