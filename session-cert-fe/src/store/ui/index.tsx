import { SessionCertStep } from "./types";
import EncCommunicationComponent from "../../components/EncCommunicationComponent";
import GenerateSymmetricKeyContainer from "../../containers/GenerateSymmetricKeyContainer";
import GetPublicKeyContainer from "../../containers/GetPublicKeyContainer";
import MatchingEncBodyContainer from "../../containers/MatchingEncBodyContainer";
import RequestEstablishComponent from "../../components/RequestEstablishComponent";
import { makeAutoObservable } from "mobx";
import RootStore from "..";

class UIStore {
  root: RootStore;
  step: number;
  steps: SessionCertStep[];

  constructor(root: RootStore) {
    makeAutoObservable(this, {}, { autoBind: true });
    this.root = root;
    this.step = 0;
    this.steps = [
      {
        title: "공개키 요청",
        content: <GetPublicKeyContainer />,
      },
      {
        title: "대칭키 생성",
        content: <GenerateSymmetricKeyContainer />,
      },
      {
        title: "암호화 데이터 비교",
        content: <MatchingEncBodyContainer />,
      },
      {
        title: "암호화 통신 확립",
        content: <RequestEstablishComponent />,
      },
      {
        title: "통신 테스트",
        content: EncCommunicationComponent(),
      },
    ];
  }

  nextStep() {
    this.step++;
  }
}

export default UIStore;
