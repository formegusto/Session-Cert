import { Col, Row, Typography, Input, Card, Button } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import RootStore from "../store";

const { TextArea } = Input;
const { Title, Paragraph } = Typography;

type Props = {
  requestData?: string;
  encryptText?: (text: string) => void;
};
function EncCommunicationComponent({ requestData, encryptText }: Props) {
  const [text, setText] = React.useState<string>("");

  const changeText = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setText(e.target.value);
    },
    []
  );

  return (
    <>
      <Title
        style={{
          margin: "0 0 8px",
        }}
      >
        통신 테스트
      </Title>
      <Paragraph>원하는 데이터를 입력 후 서버로 전송해보세요.</Paragraph>
      <Row gutter={16}>
        <Col
          span={8}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <TextArea rows={5} onChange={changeText} value={text} />
          <Button
            type="primary"
            style={{
              margin: "8px 0 0",
            }}
            onClick={() => encryptText!(text)}
          >
            암호화하기
          </Button>
        </Col>
        <Col span={8}>
          <Card
            title="데이터는 다음과 같이 전송됩니다."
            style={{
              wordBreak: "break-all",
            }}
            extra={requestData && <Button type="text">전송하기</Button>}
          >
            {requestData}
          </Card>
        </Col>
        <Col
          span={8}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <Card
            title="응답"
            style={{
              width: "100%",
              wordBreak: "break-all",
            }}
          ></Card>
          <Button
            type="primary"
            style={{
              margin: "8px 0 0",
            }}
          >
            복호화하기
          </Button>
        </Col>
      </Row>
    </>
  );
}

export default inject(
  ({ apiTestStore }: RootStore): Props => ({
    requestData: apiTestStore.requestData,
    encryptText: apiTestStore.encryptText,
  })
)(observer(EncCommunicationComponent));
