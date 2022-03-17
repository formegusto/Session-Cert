import { inject, observer } from "mobx-react";
import React from "react";
import RequestEstablishComponent from "../components/RequestEstablishComponent";
import RootStore from "../store";
import { SessionCert } from "../store/apiTest/types";

type Props = {
  nextStep?: () => void;
  id?: number;
  symmetricyKey?: string;
  setCert?: (cert: SessionCert) => void;
};

function RequestEstablishContainer({
  nextStep,
  id,
  symmetricyKey,
  setCert,
}: Props) {
  const _nextStep = React.useCallback(() => {
    if (id && symmetricyKey) {
      setCert!({
        id,
        symmetricyKey,
      });

      nextStep!();
    }
  }, [id, symmetricyKey, setCert, nextStep]);

  return <RequestEstablishComponent nextStep={_nextStep} />;
}

export default inject(
  ({ uiStore, apiTestStore, sessionCertStore }: RootStore): Props => ({
    nextStep: uiStore.nextStep,
    id: sessionCertStore.id,
    symmetricyKey: sessionCertStore.symmetricKey,
    setCert: apiTestStore.setCert,
  })
)(observer(RequestEstablishContainer));
