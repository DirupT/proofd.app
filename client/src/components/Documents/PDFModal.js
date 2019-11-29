import React, { useEffect } from 'react';
import PDFObject from 'pdfobject';
import { Modal } from 'reactstrap';
import { ModalPDF } from './styles/DocumentModalStyles';

const PDFModal = props => {
  const { doc, toggle, isOpen, document } = props;

  useEffect(() => {
    if (isOpen) {
      const data = `data:application/pdf;base64,${document}`;
      PDFObject.embed(data, `#pdf_subject${doc.id}`);
    }
  }, [isOpen]);

  if (!document || !isOpen) return null;

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalPDF id={`pdf_subject${doc.id}`} />
    </Modal>
  );
};

export default PDFModal;
