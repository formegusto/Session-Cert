import { inject, observer } from "mobx-react";
import React from "react";
import GetPublicKeyComponent from "../components/GetPublicKeyComponent";
import RootStore from "../store";

type Props = {
  id?: number;
  publicKey?: string;
  getPublicKey?: () => void;
  nextStep?: () => void;
};
function GetPublicKeyContainer({
  id,
  publicKey,
  getPublicKey,
  nextStep,
}: Props) {
  React.useEffect(() => {
    if (id && publicKey) {
      setTimeout(() => {
        nextStep!();
      }, 1500);
    }
  }, [id, publicKey, nextStep]);

  return <GetPublicKeyComponent getPublicKey={getPublicKey} />;
}

export default inject(({ sessionCertStore, uiStore }: RootStore) => ({
  nextStep: uiStore.nextStep,
  id: sessionCertStore.id,
  publicKey: sessionCertStore.publicKey,
  getPublicKey: sessionCertStore.getPublicKey,
}))(observer(GetPublicKeyContainer));
