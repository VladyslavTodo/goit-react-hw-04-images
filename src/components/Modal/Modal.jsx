import { useEffect } from 'react';

import { Overlay, ModalStyle, Img } from './Modal.style';

const Modal = ({ closeModal, modalUrl }) => {
  useEffect(() => {
    document.addEventListener('keydown', handleCloseESC);
    return () => document.removeEventListener('keydown', handleCloseESC);
  });

  const handleCloseClick = event => {
    if (event.target !== event.currentTarget) {
      return;
    }
    closeModal();
  };

  const handleCloseESC = event => {
    if (event.code !== 'Escape') {
      return;
    }
    closeModal();
  };

  return (
    <Overlay onClick={handleCloseClick}>
      <ModalStyle>
        <Img src={modalUrl} alt="" />
      </ModalStyle>
    </Overlay>
  );
};

export default Modal;
