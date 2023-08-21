import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function ModalDelete({ showDelete, setShowDelete }) {
  const handleClose = () => setShowDelete(false);

  return (
    <>
      <Modal show={showDelete} onHide={handleClose} style={{ marginTop: "8rem" }}>
        <Modal.Body>
          <div>
            <h5>Hapus Data?</h5>
            <p>Apakah anda yakin ingin menghapus data ini?</p>
          </div>
          <div className="d-flex justify-content-end gap-2">
            <div className="btn btn-danger fw-semibold">Delete</div>
            <div className="btn btn-outline-secondary fw-semibold" onClick={handleClose}>
              Cancel
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
