import { Card } from 'antd';
import Button from "views/TestState/Button";
import style from "./ImgUploadModal.module.css";
import classnames from "classnames/bind";
import { useEffect, useState } from 'react';
import { uploadImg } from "apis/teststate";
import DeleteIcon from '@material-ui/icons/Delete';

const cx = classnames.bind(style);

function ImgUploadModal(props) {
  const [imgs, setImgs] = useState([]);
  // const [, setImgIds] = useState([]);

  const base64Encode = async (event) => {
    const base64 = await toBase64(event.target.files[0])
    setImgs([...imgs, 
      {
        base64: base64,
        imgName: event.target.files[0].name
      }
    ])
        
  }
  const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  useEffect(() => {
    console.log(imgs)
  }, [imgs])


  const saveImg = async () => {
    props.handleModal();
    const imgData = {
      base64 : imgs,
      filename: props.patientName,
      receiptId: props.receiptId 
    }
    await uploadImg(imgData);
  }

  const handleCheck = (id) => {
    setImgs(imgs.filter((img, index) => index !== id))
  }

  return (
    <>
    <div className={cx("upload")}>
      <div className={cx("upload-container")} onClick={(event) => event.stopPropagation()}>
        <Card>
          <input className="mb-3" type="file" accept="image/*" multiple onChange={base64Encode}/>
          <table className={cx("table", "text-center")}>
            <thead>
              <tr>
                <th className="m-2">#</th>
                <th className="m-2">이미지</th>
                <th className="m-2">파일명</th>
              </tr>
            </thead>
            <tbody>
              {imgs.map((data, index) =>
                <tr key={index}>
                  <td><DeleteIcon fontSize="small" onClick={() => handleCheck(index)}/></td>
                  <td><img className={cx("table-img")} src={data.base64} alt=""/></td>
                  <td>{data.imgName}</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className={cx("d-flex", "justify-content-end")}>
            <Button onClick={saveImg}>저장</Button>
            <Button onClick={props.handleModal}>닫기</Button>
          </div>
        </Card>
      </div>
    </div>
    </>
  );
}

export default ImgUploadModal;