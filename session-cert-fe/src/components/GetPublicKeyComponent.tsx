import { Button, Typography } from "antd";

const { Title, Paragraph } = Typography;

type Props = {
  getPublicKey?: () => void;
};

function GetPublicKeyComponent({ getPublicKey }: Props) {
  return (
    <>
      <Title
        style={{
          margin: "0 0 8px",
        }}
      >
        공개키 요청
      </Title>
      <Paragraph>
        대칭키를 교환할 때, 암호화하여 서버로 전송해야 합니다.
        <br />이 때, 사용할 공개키를 서버측에 요청합니다.
      </Paragraph>
      <Button type="primary" onClick={getPublicKey}>
        공개키 요청하기
      </Button>
    </>
  );
}

export default GetPublicKeyComponent;
