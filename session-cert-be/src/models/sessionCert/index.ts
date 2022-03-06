import { DataTypes, Model, ModelAttributes, Sequelize } from "sequelize";
import {
  SessionCertAttributes,
  SessionCertCreationAttributes,
  SessionStatus,
} from "./types";

const sessionCertAttributes: ModelAttributes<
  SessionCertModel,
  SessionCertAttributes
> = {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  publicKey: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
  },
  privateKey: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  passphrase: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  symmetricKey: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM(
      SessionStatus.INIT,
      SessionStatus.MATCHING,
      SessionStatus.ESTABLISH,
      SessionStatus.EXPIRATION
    ),
    allowNull: false,
    defaultValue: SessionStatus.INIT,
  },
  testString: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
};

class SessionCertModel
  extends Model<SessionCertAttributes, SessionCertCreationAttributes>
  implements SessionCertAttributes
{
  public readonly id!: number;
  public publicKey!: string;
  public privateKey!: string;
  public passphrase!: string;
  public symmetricKey!: string;
  public status!: SessionStatus;
  public testString!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static initConfig(sequelize: Sequelize) {
    this.init(sessionCertAttributes, {
      sequelize,
      modelName: "SessionCert",
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    });
  }
}

export default SessionCertModel;
