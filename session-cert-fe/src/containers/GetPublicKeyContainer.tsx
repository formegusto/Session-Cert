import { inject, observer } from "mobx-react";
import React from "react";
import GetPublicKeyComponent from "../components/GetPublicKeyComponent";
import RootStore from "../store";

type Props = {
  id?: number;
  publicKey?: string;
  getPublicKey?: () => void;
  nextStep?: () => void;
  duration?: number;
};
function GetPublicKeyContainer({
  id,
  publicKey,
  getPublicKey,
  nextStep,
  duration,
}: Props) {
  React.useEffect(() => {
    if (id && publicKey) {
      setTimeout(() => {
        nextStep!();
      }, duration!);
    }
  }, [id, publicKey, nextStep, duration]);

  return <GetPublicKeyComponent getPublicKey={getPublicKey} />;
}

export default inject(
  ({ sessionCertStore, uiStore }: RootStore): Props => ({
    nextStep: uiStore.nextStep,
    id: sessionCertStore.id,
    publicKey: sessionCertStore.publicKey,
    getPublicKey: sessionCertStore.getPublicKey,
    duration: sessionCertStore.duration,
  })
)(observer(GetPublicKeyContainer));
