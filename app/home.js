"use client";

import { Card, Form, Input, Button, Select } from "antd";

import LogoImage from "../public/city-express-logo.png";

import Image from "next/image";

import WebcamUploader from "./webcam-uploader";

import "./globals.scss";
import { usePublicMasterData } from "./utils";

const HomePage = () => {
  const [form] = Form.useForm();

  const relation = usePublicMasterData("relation");
  const purpose = usePublicMasterData("purpose");

  let formItemLayout = {
    labelCol: { xs: 24, sm: 24, md: 10, lg: 6, xl: 6 },
    wrapperCol: { xs: 24, sm: 24, md: 14, lg: 16, xl: 16 },
    labelAlign: "left",
  };

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <div>
      <div className="form-box">
        <div className="box box-default">
          <div className="box-body p-5">
            <section className="form-v1-container">
              <div className="logo" style={{ marginTop: "0px" }}>
                <Image src={LogoImage} alt="City Express Logo" width={250} />
              </div>
              <Card>
                <Form
                  className="form-box"
                  form={form}
                  initialValues={{ receiver: [{}, {}] }}
                  onFinish={onFinish}
                >
                  <h5
                    style={{
                      borderBottom: "2px solid black",
                      marginBottom: "1em",
                    }}
                  >
                    {" "}
                    Sender Information
                  </h5>
                  <Form.Item name={"id"} noStyle>
                    <Input className="hidden" />
                  </Form.Item>
                  <Form.Item name={"gender"} noStyle>
                    <Input className="hidden" />
                  </Form.Item>
                  <Form.Item name={"visa_type"} noStyle>
                    <Input className="hidden" />
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout}
                    name="id_front"
                    label={"ID Front"}
                  >
                    <WebcamUploader
                      form={form}
                      name="id_front"
                      formName="registration/western"
                    />
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout}
                    name="id_back"
                    label={"ID Back"}
                  >
                    <WebcamUploader
                      form={form}
                      name="id_back"
                      formName="registration/western"
                    />
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout}
                    name="selfie"
                    label={"Selfie Image"}
                  >
                    <WebcamUploader
                      form={form}
                      name="selfie"
                      formName="registration/western"
                    />
                  </Form.Item>

                  <h5
                    style={{
                      borderBottom: "2px solid black",
                      marginBottom: "1em",
                    }}
                  >
                    {" "}
                    Receiver Information
                  </h5>
                  <Form.List name="receivers" initialValue={[{}, {}]}>
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ nameKey, name }) => {
                          return (
                            <div key={nameKey}>
                              <Form.Item name={[name, "receiver_key"]} noStyle>
                                <Input className="hidden" />
                              </Form.Item>
                              <Form.Item
                                {...formItemLayout}
                                className="not-required-label"
                                name={[name, "receiver_name"]}
                                label="Receiver Name"
                              >
                                <Input placeholder="Receiver Name" />
                              </Form.Item>
                              <Form.Item
                                {...formItemLayout}
                                className="not-required-label"
                                name={[name, "relation"]}
                                label="Relation"
                              >
                                <Select
                                  placeholder="Relation"
                                  options={relation?.payload || []}
                                />
                              </Form.Item>
                              <Form.Item
                                {...formItemLayout}
                                className="not-required-label"
                                name={[name, "purpose"]}
                                label="Purpose"
                              >
                                <Select
                                  placeholder="Purpose"
                                  options={purpose?.payload || []}
                                />
                              </Form.Item>
                            </div>
                          );
                        })}
                      </>
                    )}
                  </Form.List>
                  <Form.Item noStyle shouldUpdate={true}>
                    {() => (
                      <Button type="primary" className="mr-1" htmlType="submit">
                        {"Submit"}
                      </Button>
                    )}
                  </Form.Item>
                </Form>
              </Card>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
