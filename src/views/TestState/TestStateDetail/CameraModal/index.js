import { Card } from 'antd';
import style from "./CameraModal.module.css";
import classnames from "classnames/bind";
import Button from "views/TestState/Button";
import Webcam from "react-webcam"; 
import { useCallback, useRef, useState } from 'react';
import { uploadImg } from "apis/teststate";

const cx = classnames.bind(style);

function CameraModal(props) {
  const webcamRef = useRef(null);
  const capture = useCallback(
    async () => {
      const base64 = webcamRef.current.getScreenshot();
      console.log(props.patientName)
      const imgData = {
        base64,
        filename: props.patientName,
        receiptId: props.receiptId 
      }
      await uploadImg(imgData);
    },
    [webcamRef]
  );
  return (
    <div className={cx("camera")}>
      <div className={cx("camera-container")} onClick={(event) => event.stopPropagation()}>
        <Card>
          <Webcam
          audio={false}
          height={720}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={960}
        />
          <div className={cx("d-flex", "justify-content-end")}>
            <Button onClick={capture}>촬영</Button>
            <Button className={cx("medicine-btn")} onClick={props.handleModal}>닫기</Button>
          </div>
        </Card>
      </div>    
    </div>
  );
}

export default CameraModal;