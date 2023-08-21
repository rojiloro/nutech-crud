import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function ModalAdd({ show, setShow }) {
  const handleClose = () => setShow(false);
  
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <div className="d-flex justify-content-center">
            <h4>Add Product</h4>
          </div>
          <form className="form-floating">
            <div className="d-flex flex-column">
              <label htmlFor="image" className="mb-2">
                Image
              </label>
              <input type="file" className="form-control" />
            </div>
            <div class="form-floating mt-3">
              <input type="text" class="form-control" id="floatingInput" placeholder="product name" />
              <label htmlFor="floatingInput">Product Name</label>
            </div>
            <div class="form-floating mt-3">
              <input type="number" class="form-control" id="floatingInput" placeholder="name@example.com" />
              <label for="floatingInput">Purchase</label>
            </div>
            <div class="form-floating mt-3">
              <input type="number" class="form-control" id="floatingInput" placeholder="name@example.com" />
              <label for="floatingInput">Selling</label>
            </div>
            <div class="form-floating mt-3">
              <input type="number" class="form-control" id="floatingInput" placeholder="name@example.com" />
              <label for="floatingInput">Qty</label>
            </div>
          </form>
          <div className="d-grid">
            <Button variant="success" className="mt-3 fw-bold" onClick={handleClose}>
              Submit
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
