import React, { useState } from "react";
import { useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { detailProduct, getListProduct, updateProduct } from "../../actions/productAction";

export default function ModalEdit({ showEdit, setShowEdit, id }) {
  const dispatch = useDispatch();
  const { detailProductResult } = useSelector((state) => state.ProductReducer);

  const handleClose = () => setShowEdit(false);

  useEffect(() => {
    dispatch(getListProduct());
  }, [id]);

  const [form, setForm] = useState({
    image: "",
    productName: "",
    purchase: "",
    selling: "",
    qty: "",
  });

  useEffect(() => {
    setForm({
      ...form,
      image: detailProductResult.image,
      productName: detailProductResult.productName,
      purchase: detailProductResult.purchase,
      selling: detailProductResult.selling,
      qty: detailProductResult.qty,
    });
  }, [id, detailProductResult]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
    });
  };

  const handleUpdate = (e) => {
    try {
      e.preventDefault();
      console.log("masuk handle update");
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      if (form.image) {
        formData.set("image", form?.image[0], form?.image[0]?.name);
      }
      formData.set("productName", form.productName);
      formData.set("purchase", form.purchase);
      formData.set("selling", form.selling);
      formData.set("qty", form.qty);

      dispatch(updateProduct({ id, formData, config }));
      console.log("cek form data: ", formData);
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

  return (
    <>
      <Modal show={showEdit} onHide={handleClose}>
        <Modal.Body>
          <div className="d-flex justify-content-center">
            <h4>Edit Product</h4>
          </div>
          <form className="form-floating" onSubmit={handleUpdate}>
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
                Update
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
