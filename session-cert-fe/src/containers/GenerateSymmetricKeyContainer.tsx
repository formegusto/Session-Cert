import { inject, observer } from "mobx-react";
import React from "react";
import GenerateSymmetricKeyComponent from "../components/GenerateSymmetricKeyComponent";
import RootStore from "../store";

type Props = {
  generateSymmetricKey?: () => void;
  encBody?: string;
  nextStep?: () => void;
  duration?: number;
};

function GenerateSymmetricKeyContainer({
  generateSymmetricKey,
  encBody,
  nextStep,
  duration,
}: Props) {
  React.useEffect(() => {
    if (encBody) {
      setTimeout(() => {
        nextStep!();
      }, duration!);
    }
  }, [encBody, nextStep, duration]);

  return (
    <GenerateSymmetricKeyComponent
      generateSymmetricKey={generateSymmetricKey}
    />
  );
}

export default inject(
  ({ uiStore, sessionCertStore }: RootStore): Props => ({
    nextStep: uiStore.nextStep,
    encBody: sessionCertStore.encBody,
    generateSymmetricKey: sessionCertStore.generateSymmetricKey,
    duration: sessionCertStore.duration,
  })
)(observer(GenerateSymmetricKeyContainer));
