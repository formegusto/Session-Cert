import { Button, Steps } from "antd";
import { Row, Col } from "antd";
import { inject, observer } from "mobx-react";
import RootStore from "../store";
import { SessionCertStep } from "../store/ui/types";

const { Step } = Steps;

type Props = {
  steps?: SessionCertStep[];
  step?: number;
  nextStep?: () => void;
};

function SessionCertSteps({ steps, step, nextStep }: Props) {
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
      <Row>
        {step! + 1 !== steps!.length && (
          <Button type="primary" onClick={nextStep}>
            Next
          </Button>
        )}
      </Row>
    </>
  );
}

export default inject(({ uiStore }: RootStore) => ({
  ...uiStore,
  nextStep: uiStore.nextStep,
}))(observer(SessionCertSteps));
