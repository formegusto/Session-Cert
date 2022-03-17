import { inject, observer } from "mobx-react";
import React from "react";
import MatchingEncBodyComponent from "../components/MatchingEncBodyComponent";
import RootStore from "../store";

type Props = {
  nextStep?: () => void;
  matchingEncBody?: () => void;
  establish?: boolean;
};

function MatchingEncBodyContainer({
  matchingEncBody,
  nextStep,
  establish,
}: Props) {
  React.useEffect(() => {
    if (establish) {
      setTimeout(() => {
        nextStep!();
      }, 1500);
    }
  }, [establish, nextStep]);

  return <MatchingEncBodyComponent matchingEncBody={matchingEncBody} />;
}

export default inject(
  ({ uiStore, sessionCertStore }: RootStore): Props => ({
    nextStep: uiStore.nextStep,
    matchingEncBody: sessionCertStore.matchingEncBody,
    establish: sessionCertStore.estabilish,
  })
)(observer(MatchingEncBodyContainer));
