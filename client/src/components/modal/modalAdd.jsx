import React, { useState } from "react";
import { useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, getListProduct } from "../../actions/productAction";

export default function ModalAdd({ show, setShow }) {
  const handleClose = () => setShow(false);
  const { addProductResult } = useSelector((state) => state.ProductReducer);

  const [form, setForm] = useState({
    image: "",
    productName: "",
    purchase: "",
    selling: "",
    qty: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
    });
  };

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      console.log("masuk handleSubmit");

      const formData = new FormData();
      formData.set("image", form.image[0], form.image[0].name);
      formData.set("productName", form.productName);
      formData.set("purchase", form.purchase);
      formData.set("selling", form.selling);
      formData.set("qty", form.qty);

      dispatch(addProduct(formData));

      setForm({
        image: "",
        productName: "",
        purchase: "",
        selling: "",
        qty: "",
      });
    } catch (error) {
      console.log("ini error : ", error);
    }
  };

  useEffect(() => {
    if (addProductResult) {
      dispatch(getListProduct());
    }
  }, [addProductResult, dispatch]);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <div className="d-flex justify-content-center">
            <h4>Add Product</h4>
          </div>
          <form className="form-floating" onSubmit={handleSubmit}>
            <div className="d-flex flex-column">
              <label htmlFor="image" className="mb-2">
                Image
              </label>
              <input type="file" name="image" className="form-control" onChange={handleChange} />
            </div>
            <div className="form-floating mt-3">
              <input type="text" value={form?.productName} name="productName" onChange={handleChange} className="form-control" id="floatingInput" placeholder="product name" />
              <label htmlFor="floatingInput">Product Name</label>
            </div>
            <div className="form-floating mt-3">
              <input type="number" value={form?.purchase} name="purchase" onChange={handleChange} className="form-control" id="floatingInput" placeholder="name@example.com" />
              <label htmlFor="floatingInput">Purchase</label>
            </div>
            <div className="form-floating mt-3">
              <input type="number" value={form?.selling} name="selling" onChange={handleChange} className="form-control" id="floatingInput" placeholder="name@example.com" />
              <label htmlFor="floatingInput">Selling</label>
            </div>
            <div className="form-floating mt-3">
              <input type="number" value={form?.qty} name="qty" onChange={handleChange} className="form-control" id="floatingInput" placeholder="name@example.com" />
              <label htmlFor="floatingInput">Qty</label>
            </div>
            <div className="d-grid">
              <Button type="submit" onClick={handleClose} variant="success" className="mt-3 fw-bold">
                Submit
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
