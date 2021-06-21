import React, {useState} from 'react';
import Modal from "react-modal";
import style from "./style.module.css"
import classnames from "classnames/bind";

const cx = classnames.bind(style);
const customStyles = {
  content: {
      width: '750px',
      height: '430px',
      top: '50%',
      left: '44%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('body');
const ReserveDetail = (props) => {

  return (
    <Modal
        isOpen={props.modalIsOpen}
        onRequestClose={props.closeModal}
        contentLabel="Reserve-Detail Modal"
        style={customStyles}
    >
      ReserveDetail Modal
 
     </Modal> 
  );
};

export default ReserveDetail;