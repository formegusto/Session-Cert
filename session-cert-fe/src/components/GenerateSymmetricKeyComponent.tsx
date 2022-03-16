import { Typography } from "antd";

const { Title, Paragraph } = Typography;

function GenerateSymmetricKeyComponent() {
  return (
    <>
      <Title
        style={{
          margin: "0 0 8px",
        }}
      >
        대칭키 생성
      </Title>
      <Paragraph>
        대칭키 생성에 들어갑니다. 서버측으로는 공개키로 암호화되어 전송됩니다.
        <br />
        공개키로 암호화 되었기 때문에, 서버가 가지고 있는 비밀키로만 복호화가
        가능합니다.
      </Paragraph>
    </>
  );
}

export default GenerateSymmetricKeyComponent;
