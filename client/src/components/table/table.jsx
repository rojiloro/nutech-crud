import React, { useState } from "react";
import ModalAdd from "../modal/modalAdd";
import ListProduct from "../list-product/listProduct";

export default function Table(props) {
  const [show, setShow] = useState(false);

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
        <ListProduct />
      </div>
      <ModalAdd show={show} setShow={setShow} />
    </>
  );
}
