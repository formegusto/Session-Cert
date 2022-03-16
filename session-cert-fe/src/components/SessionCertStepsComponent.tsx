import { Button, Steps } from "antd";
import React from "react";
import sessionCertStep from "../store/dummy";
import { Row, Col } from "antd";

const { Step } = Steps;

function SessionCertStepsComponent() {
  const [step, setStep] = React.useState<number>(0);

  const nextTest = React.useCallback(() => {
    setStep((now) => now + 1);
  }, []);

  return (
    <>
      <Row>
        <Steps current={step}>
          {sessionCertStep.map((s, idx) => (
            <Step key={`session-cert-step-${idx}`} title={s.title} />
          ))}
        </Steps>
      </Row>
      <Col
        style={{
          margin: "24px 0 24px",
        }}
      >
        {sessionCertStep[step].content}
      </Col>
      <Row>
        {step + 1 !== sessionCertStep.length && (
          <Button type="primary" onClick={nextTest}>
            Next
          </Button>
        )}
      </Row>
    </>
  );
}

export default SessionCertStepsComponent;
