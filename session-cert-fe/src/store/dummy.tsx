import EncCommunicationComponent from "../components/EncCommunicationComponent";
import GenerateSymmetricKeyComponent from "../components/GenerateSymmetricKeyComponent";
import GetPublicKeyComponent from "../components/GetPublicKeyComponent";
import MatchingEncBodyComponent from "../components/MatchingEncBodyComponent";
import RequestEstablishComponent from "../components/RequestEstablishComponent";

type SessionCertStep = {
  title: string;
  content: JSX.Element;
};

const sessionCertStep: SessionCertStep[] = [
  {
    title: "공개키 요청",
    content: <GetPublicKeyComponent />,
  },
  {
    title: "대칭키 생성",
    content: <GenerateSymmetricKeyComponent />,
  },
  {
    title: "암호화 데이터 비교",
    content: <MatchingEncBodyComponent />,
  },
  {
    title: "암호화 통신 확립",
    content: <RequestEstablishComponent />,
  },
  {
    title: "통신 테스트",
    content: <EncCommunicationComponent />,
  },
];

export default sessionCertStep;
