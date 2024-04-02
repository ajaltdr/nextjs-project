"use client";

import React, { useCallback, useRef, useState } from "react";
import { Spin, Modal, Image, Tooltip, Button, Upload } from "antd";
import {
  CameraOutlined,
  ReloadOutlined,
  UploadOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Webcam from "react-webcam";
import DynamicPublicMinioUploader from "./uploader";
import { uploadFile } from "./httpUtil";

import { useModalHook } from "./utils";

const WebcamUploader = ({ form, name, formName }) => {
  const [loading, setLoading] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);
  const [webImg, setWebImg] = useState();

  const [modalVisible, showModal, hideModal] = useModalHook();

  const webcamRef = useRef(null);

  const base64ToBlob = (base64Data) => {
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: "image/jpeg" });
  };

  function base64ToFile(base64, fileName) {
    const base64Data = base64?.replace(/^data:image\/\w+;base64,/, "");
    const blob = base64ToBlob(base64Data);
    return new File([blob], fileName, { type: "image/jpeg" });
  }

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setWebImg(imageSrc);
  }, [webcamRef]);

  const upload = async () => {
    setLoading(true);
    const file = base64ToFile(webImg, "image");
    try {
      const formData = new FormData();
      formData.append("doc_file", file);
      const res = await uploadFile(
        `config/v1/public/uploader/upload-file?field=${name}&formName=${formName}`,
        formData
      );
      form.setFields([
        {
          name: name,
          value: res?.data?.data?.object_name,
        },
      ]);
      setImgSrc(res?.data?.data?.url);

      setLoading(false);
      hideModal();
    } catch (err) {
      // message.error(err?.message || 'Minio upload Error. please try again');
    }
  };

  return (
    <>
      {imgSrc ? (
        <div className="d-flex">
          <Image src={imgSrc} width={100} />
          <span style={{ padding: "25px 10px" }}>
            <Tooltip title="Remove">
              <DeleteOutlined
                style={{ fontSize: "16px", cursor: "pointer" }}
                onClick={() => {
                  setImgSrc(null);
                  setWebImg(null);
                  form.setFields([
                    {
                      name: name,
                      value: null,
                    },
                  ]);
                }}
              />
            </Tooltip>
          </span>
        </div>
      ) : (
        <div className="d-flex">
          {name !== "selfie" && (
            <DynamicPublicMinioUploader
              listType="text"
              acceptType={["image/png", "image/jpg", "image/jpeg"]}
              formName={formName}
              id={name}
              setImgSrc={setImgSrc}
              form={form}
            />
          )}
          <Button style={{ marginLeft: "10px" }} onClick={showModal}>
            Take a picture
          </Button>
        </div>
      )}

      <Modal
        open={modalVisible}
        width={"34%"}
        footer={false}
        onOk={() => {
          hideModal();
        }}
        onCancel={() => {
          hideModal();
          setWebImg(null);
        }}
      >
        <Spin spinning={loading}>
          <div className="media-container">
            {webImg ? (
              <div>
                <img src={webImg} alt={name} style={{ padding: "74px 0" }} />
              </div>
            ) : (
              <Webcam
                screenshotFormat="image/jpeg"
                height={600}
                width={600}
                ref={webcamRef}
                mirrored={true}
              />
            )}
          </div>

          <div className="row justify-content-center">
            {webImg ? (
              <>
                <div className="col-4">
                  <Button
                    loading={loading}
                    type="primary"
                    icon={<UploadOutlined />}
                    onClick={upload}
                  >
                    Upload
                  </Button>
                </div>
                <div>
                  <Button
                    loading={loading}
                    icon={<ReloadOutlined />}
                    onClick={() => setWebImg(null)}
                  >
                    Retake
                  </Button>
                </div>
              </>
            ) : (
              <div className="col-4">
                <Button
                  loading={loading}
                  type="primary"
                  icon={<CameraOutlined />}
                  onClick={capture}
                >
                  Click
                </Button>
              </div>
            )}
          </div>
        </Spin>
      </Modal>
    </>
  );
};
export default WebcamUploader;
