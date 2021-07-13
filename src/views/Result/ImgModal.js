import Modal from "react-modal";
import "react-image-gallery/styles/scss/image-gallery.scss";
import ImageGallery from "react-image-gallery";

//신규 환자 생성 modal 스타일 설정
const customStyles = {
    content: {
        width: '650px',
        height: '870px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('body');
function ImgModal(props) {
    const images = [];
    for(let img of props.imgArray) {
        images.push({
            original: "http://localhost:8080/image?path="+img.diagnostic_img,
            thumbnail: "http://localhost:8080/image?path="+img.diagnostic_img,
            originalHeight: 700,
        });
    }

    return (
        <Modal
            isOpen={props.modalIsOpen}
            onRequestClose={props.closeModal}
            contentLabel="Create Patient Modal"
            style={customStyles}
        >
            <ImageGallery items={images} thumbnailPosition="top" startIndex={props.imgIndex} showBullets={true}/>
        </Modal>
    );
}

export default ImgModal;