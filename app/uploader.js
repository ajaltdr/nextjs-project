import { Spin, Modal, Image, Tooltip, Button, Upload } from "antd";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import { useRef, useState } from "react";
import { uploadFile } from "./httpUtil";
const DynamicPublicMinioUploader = (props) => {
  const {
    acceptType = "any",
    minSize = 1024,
    maxSize = 50 * 1024 * 1024,
    value,
    onChange,
    maxCount = 1,
    placeholder = "Upload",
    listType,
    id,
    formName,
    className,
    doccumentsFromCustomerOrAgent,
    onRemove,
    setImgSrc,
    form,
    ...rest
  } = props;
  const [loading, setLoading] = useState(false);

  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  const [fileList, setFileList] = useState([]);

  const ref = useRef(null);

  const fileProps = {
    beforeUpload: async (file) => {
      let isFileTypeValid;
      if (acceptType !== "any") {
        isFileTypeValid = acceptType.includes(file.type);
        if (!isFileTypeValid) {
          message.error(`You can only upload ${acceptType} file!`);
          file.status = "error";
        }
      } else isFileTypeValid = true;
      const isSizeValid = file.size < maxSize && file.size > minSize;

      if (!isSizeValid) {
        message.error(
          `Image must be between ${parseFloat(
            minSize / 1024
          )} KB to ${parseFloat(maxSize / 1024 / 1024)} MB`
        );
        file.status = "error";
      }
      return isFileTypeValid && isSizeValid;
    },
    customRequest: async (options) => {
      const { file, onError, onSuccess } = options;
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("doc_file", file);
        const res = await uploadFile(
          `config/v1/public/uploader/upload-file?field=${id}&formName=${formName}`,
          formData
        );
        setUploadedImageUrl(res?.data?.data?.url);
        setImgSrc(res?.data?.data?.url);
        form.setFields([
          {
            name: id,
            value: res?.data?.data?.object_name,
          },
        ]);
        setFileList([
          {
            uid: "-1",
            name: null,
            status: "done",
            url: res?.data?.data?.url,
          },
        ]);

        if (res?.status >= 200) {
          onSuccess("ok");
        }
        setLoading(false);
      } catch (err) {
        message.error(err?.message || "Minio upload Error. please try again");
        onError(err);
        setLoading(false);
      }
    },
    onChange: ({ file }) => {
      if (file.status === "error") {
        message.error(
          file?.error?.message || "Minio upload Error. please try again"
        );
      }
    },
    onPreview: (file) => {
      openInNewTab(uploadedImageUrl);
    },

    onRemove: undefined,
  };

  const pictureCardUploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const uploadBtn =
    listType === "picture-card" ? (
      pictureCardUploadButton
    ) : (
      <Button icon={<UploadOutlined />} full>
        {placeholder}
      </Button>
    );
  return (
    <Upload
      {...fileProps}
      {...rest}
      fileList={fileList}
      listType={"picture"}
      ref={ref}
    >
      {loading ? (
        <Spin spinning />
      ) : fileList.length >= maxCount ? null : (
        uploadBtn
      )}
    </Upload>
  );
};

export default DynamicPublicMinioUploader;
