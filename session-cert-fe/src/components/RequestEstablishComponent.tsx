import { Button, Typography } from "antd";
import { inject, observer } from "mobx-react";
import RootStore from "../store";

const { Title, Paragraph } = Typography;

type Props = {
  nextStep?: () => void;
};

function RequestEstablishComponent({ nextStep }: Props) {
  return (
    <>
      <Title
        style={{
          margin: "0 0 8px",
        }}
      >
        암호화 통신 확립
      </Title>
      <Paragraph>
        테스트 스트링이 일치했고, 같은 대칭키를 가지고 있는 것이 확인
        되었습니다.
        <br />
        지금부터 서버와의 API 통신은 암호화 통신으로 진행됩니다.
      </Paragraph>
      <Button type="primary" onClick={nextStep}>
        통신 테스트 하러 가기
      </Button>
    </>
  );
}

export default inject(
  ({ uiStore }: RootStore): Props => ({
    nextStep: uiStore.nextStep,
  })
)(observer(RequestEstablishComponent));
