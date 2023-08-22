import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../actions/productAction";

export default function ModalDelete({ showDelete, setShowDelete, id }) {
  const handleClose = () => setShowDelete(false);
  const dispatch = useDispatch();

  return (
    <>
      <Modal show={showDelete} onHide={handleClose} style={{ marginTop: "8rem" }}>
        <Modal.Body>
          <div>
            <h5>Hapus Data?</h5>
            <p>Apakah anda yakin ingin menghapus data ini?</p>
          </div>
          <div className="d-flex justify-content-end gap-2">
            <div
              className="btn btn-danger fw-semibold"
              onClick={() => {
                dispatch(deleteProduct(id));
                handleClose();
              }}
            >
              Delete
            </div>
            <div className="btn btn-outline-secondary fw-semibold" onClick={handleClose}>
              Cancel
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
