import { inject, observer } from "mobx-react";
import React from "react";
import MatchingEncBodyComponent from "../components/MatchingEncBodyComponent";
import RootStore from "../store";

type Props = {
  nextStep?: () => void;
  matchingEncBody?: () => void;
  establish?: boolean;
  duration?: number;
};

function MatchingEncBodyContainer({
  matchingEncBody,
  nextStep,
  establish,
  duration,
}: Props) {
  React.useEffect(() => {
    if (establish) {
      setTimeout(() => {
        nextStep!();
      }, duration);
    }
  }, [establish, nextStep, duration]);

  return <MatchingEncBodyComponent matchingEncBody={matchingEncBody} />;
}

export default inject(
  ({ uiStore, sessionCertStore }: RootStore): Props => ({
    nextStep: uiStore.nextStep,
    matchingEncBody: sessionCertStore.matchingEncBody,
    establish: sessionCertStore.estabilish,
    duration: sessionCertStore.duration,
  })
)(observer(MatchingEncBodyContainer));
