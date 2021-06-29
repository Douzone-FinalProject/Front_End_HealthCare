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
    const images = [
        {
            original: 'http://localhost:3000/mri1.jpg',
            thumbnail: 'http://localhost:3000/mri1.jpg',
            originalHeight: '700px',
        },
        {
            original: 'http://localhost:3000/mri1.jpg',
            thumbnail: 'http://localhost:3000/mri1.jpg',
            originalHeight: '700px',
        },
        {
            original: 'http://localhost:3000/mri2.png',
            thumbnail: 'http://localhost:3000/mri2.png',
            originalHeight: '700px',
        },
        {
            original: 'http://localhost:3000/mri2.png',
            thumbnail: 'http://localhost:3000/mri2.png',
            originalHeight: '700px',
        },
    ];

    return (
        <Modal
            isOpen={props.modalIsOpen}
            onRequestClose={props.closeModal}
            contentLabel="Create Patient Modal"
            style={customStyles}
        >
            <ImageGallery items={images} thumbnailPosition="top" startIndex={0} showBullets={true}/>
        </Modal>
    );
}

export default ImgModal;