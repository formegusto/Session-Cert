import { inject, observer } from "mobx-react";
import React from "react";
import GenerateSymmetricKeyComponent from "../components/GenerateSymmetricKeyComponent";
import RootStore from "../store";

type Props = {
  generateSymmetricKey?: () => void;
  encBody?: string;
  nextStep?: () => void;
};

function GenerateSymmetricKeyContainer({
  generateSymmetricKey,
  encBody,
  nextStep,
}: Props) {
  React.useEffect(() => {
    if (encBody) {
      setTimeout(() => {
        nextStep!();
      }, 1500);
    }
  }, [encBody, nextStep]);

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
  })
)(observer(GenerateSymmetricKeyContainer));
