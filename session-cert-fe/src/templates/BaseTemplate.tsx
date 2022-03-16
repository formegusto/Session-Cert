import { Layout, Typography } from "antd";
import React from "react";
import { blue } from "@ant-design/colors";

const { Header, Content } = Layout;
const { Title } = Typography;

function BaseTemplate({ children }: React.PropsWithChildren<any>) {
  return (
    <Layout>
      <Header
        style={{
          position: "fixed",
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          height: "80px",
          backgroundColor: blue.primary,
        }}
      >
        <Title level={3} style={{ color: "#fff", margin: "0" }}>
          Session Cert Testing Page
        </Title>
      </Header>
      <Content
        style={{
          padding: "24px 148px 48px",
          marginTop: "80px",
          backgroundColor: "#FFF",
        }}
      >
        {children}
      </Content>
    </Layout>
  );
}

export default BaseTemplate;
