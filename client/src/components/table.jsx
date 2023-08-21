import React, { useState } from "react";
import foto from "../assets/react.svg";
import ModalAdd from "./modalAdd";
import ModalDelete from "./modalDelete";

export default function Table(props) {
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  return (
    <>
      <div className="d-flex justify-content-center mt-5">
        <h3>Table Product</h3>
      </div>
      <div className="container d-flex justify-content-end">
        <div className="btn btn-outline-success fw-semibold" onClick={() => setShow(true)}>
          Add Product
        </div>
      </div>
      <div className="container mt-3 fs-6 rounded fw-semibold">
        <div className="row bg-success text-white">
          <div className="col">No</div>
          <div className="col">Image</div>
          <div className="col">Name</div>
          <div className="col">Purchase</div>
          <div className="col">Selling</div>
          <div className="col">Qty</div>
          <div className="col text-center">Action</div>
        </div>
        <div className="row mt-4">
          <div className="col">1</div>
          <div className="col">
            <img src={foto} alt="" />
          </div>
          <div className="col">React</div>
          <div className="col">8000</div>
          <div className="col">10000</div>
          <div className="col">999</div>
          <div className="col d-flex justify-content-between">
            <div className="btn btn-primary fw-semibold">Edit</div>
            <div className="btn btn-danger fw-semibold" onClick={() => setShowDelete(true)}>
              Delete
            </div>
          </div>
        </div>
        <hr />
      </div>
      <ModalAdd show={show} setShow={setShow} />
      <ModalDelete showDelete={showDelete} setShowDelete={setShowDelete} />
    </>
  );
}
