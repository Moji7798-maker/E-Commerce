import React, { useState } from "react";
import Lightbox, { Modal, ModalGateway } from "react-images";

const LightBox = ({ closeModal, currentIndex, product }) => {
  const [toggleModal, setToggleModal] = useState(false);

  const handleClick = (index) => (e) => {
    setToggleModal(!toggleModal);
  };

  return (
    <ModalGateway>
      {toggleModal ? (
        <Modal onClose={closeModal}>
          <Lightbox
            // views={}
            currentIndex={`${process.env.REACT_APP_API}/api/product/photo/${product._id}/${currentIndex}`}
          />
        </Modal>
      ) : null}
    </ModalGateway>
  );
};

export default LightBox;
