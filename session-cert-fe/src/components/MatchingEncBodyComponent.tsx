import { Button, Typography } from "antd";

const { Title, Paragraph } = Typography;

type Props = {
  matchingEncBody?: () => void;
};

function MatchingEncBodyComponent({ matchingEncBody }: Props) {
  return (
    <>
      <Title
        style={{
          margin: "0 0 8px",
        }}
      >
        암호화 데이터 비교
      </Title>
      <Paragraph>
        서버 측에서 대칭키를 복호화하여, 해당 대칭키로 암호화하여 테스트
        스트링을 보내왔습니다.
        <br />
        방금 생성한 대칭키를 이용하여, 이를 풀고 다시 암호화하여, 서로 같은
        대칭키를 가지고 있다는 것을 증명합니다.
      </Paragraph>
      <Button type="primary" onClick={matchingEncBody}>
        암호화 데이터 비교하기
      </Button>
    </>
  );
}

export default MatchingEncBodyComponent;
