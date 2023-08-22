import React, { useEffect, useState } from "react";
import ModalDelete from "../modal/modalDelete";
import { useDispatch, useSelector } from "react-redux";
import { detailProduct, getListProduct } from "../../actions/productAction";
import ModalAdd from "../modal/modalAdd";
import ModalEdit from "../modal/modalEdit";

export default function ListProduct(props) {
  const [showDelete, setShowDelete] = useState(false);
  const [productId, setProductId] = useState();
  const [productEditId, setEditProductId] = useState();
  const [showEdit, setShowEdit] = useState(false);
  const [filterValue, setFilterValue] = useState("");

  const dispatch = useDispatch();
  const { getListProductResult, getListProductLoading, getListProductError, deleteProductResult, updateProductResult } = useSelector((state) => state.ProductReducer);

  const data = getListProductResult.data;

  useEffect(() => {
    //panggil get product
    dispatch(getListProduct());
  }, [dispatch]);

  useEffect(() => {
    if (deleteProductResult) {
      console.log("masuk did update");
      dispatch(getListProduct());
    }
  }, [deleteProductResult, dispatch]);

  useEffect(() => {
    if (updateProductResult) {
      console.log("masuk did update");
      dispatch(getListProduct());
    }
  }, [updateProductResult, dispatch]);

  return (
    <>
      <div style={{ position: "relative", top: "-70px", width: "50%" }}>
        <input type="text" className="form-control" placeholder="Search Name" value={filterValue} onChange={(e) => setFilterValue(e.target.value)} />
      </div>
      {data ? (
        data
          .filter((product) => product.productName.toLowerCase().includes(filterValue.toLowerCase()))
          .map((data, index) => (
            <div key={index} className="row mt-4 fw-semibold">
              <div className="col">{index + 1}</div>
              <div className="col">
                <img src={data.image} alt="" className="img-thumbnail rounded" style={{ width: "100px", height: "70px", marginLeft: "-1.5rem", marginTop: "-1rem" }} />
              </div>
              <div className="col">{data.productName}</div>
              <div className="col">{data.purchase}</div>
              <div className="col">{data.selling}</div>
              <div className="col">{data.qty}</div>
              <div className="col d-flex justify-content-between">
                <button
                  onClick={() => {
                    dispatch(detailProduct(data));
                    setEditProductId(data?.id);
                    setShowEdit(true);
                  }}
                  className="btn btn-outline-primary fw-semibold"
                  style={{ height: "40px" }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-outline-danger fw-semibold"
                  style={{ height: "40px" }}
                  onClick={() => {
                    setShowDelete(true);
                    setProductId(data?.id);
                  }}
                >
                  Delete
                </button>
              </div>
              <hr className="mt-3" />
            </div>
          ))
      ) : getListProductLoading ? (
        <p>Loading . . . </p>
      ) : (
        <p>{getListProductError ? getListProductError : "data kosong"}</p>
      )}

      <ModalEdit id={productEditId} showEdit={showEdit} setShowEdit={setShowEdit} />
      <ModalDelete id={productId} showDelete={showDelete} setShowDelete={setShowDelete} />
    </>
  );
}
