import { Typography } from "antd";

const { Title, Paragraph } = Typography;

function EncCommunicationComponent() {
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
    </>
  );
}

export default EncCommunicationComponent;
