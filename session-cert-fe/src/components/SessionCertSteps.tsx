import { Steps } from "antd";
import { Row, Col } from "antd";
import { inject, observer } from "mobx-react";
import RootStore from "../store";
import { SessionCertStep } from "../store/ui/types";

const { Step } = Steps;

type Props = {
  steps?: SessionCertStep[];
  step?: number;
};

function SessionCertSteps({ steps, step }: Props) {
  return (
    <>
      <Row>
        <Steps current={step!}>
          {steps!.map((s, idx) => (
            <Step key={`session-cert-step-${idx}`} title={s.title} />
          ))}
        </Steps>
      </Row>
      <Col
        style={{
          margin: "24px 0 24px",
        }}
      >
        {steps![step!].content}
      </Col>
    </>
  );
}

export default inject(({ uiStore }: RootStore) => ({
  ...uiStore,
}))(observer(SessionCertSteps));
