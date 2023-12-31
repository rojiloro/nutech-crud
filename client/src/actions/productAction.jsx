import axios from "axios";

export const GET_LIST_PRODUCT = "GET_LIST_PRODUCT";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const DETAIL_PRODUCT = "DETAIL_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

export const getListProduct = () => {
  return (dispatch) => {
    //loading
    dispatch({
      type: GET_LIST_PRODUCT,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    // get API
    axios({
      method: "GET",
      url: "https://nutech-crud-production.up.railway.app/api/v1/products",
      timeout: 120000,
    })
      .then((response) => {
        dispatch({
          type: GET_LIST_PRODUCT,
          payload: {
            loading: false,
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        //gagal get API
        dispatch({
          type: GET_LIST_PRODUCT,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const addProduct = (data) => {
  return (dispatch) => {
    //loading
    dispatch({
      type: ADD_PRODUCT,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    // post API
    axios({
      method: "POST",
      url: "https://nutech-crud-production.up.railway.app/api/v1/product",
      timeout: 120000,
      data: data,
    })
      .then((response) => {
        dispatch({
          type: ADD_PRODUCT,
          payload: {
            loading: false,
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        console.log("gagal dapat data: ", error.message);
        //gagal get API
      });
  };
};
export const deleteProduct = (id) => {
  return (dispatch) => {
    //loading
    dispatch({
      type: DELETE_PRODUCT,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    // post API
    axios({
      method: "DELETE",
      url: "https://nutech-crud-production.up.railway.app/api/v1/product/" + id,
      timeout: 120000,
    })
      .then((response) => {
        console.log("berhasil dapat data: ", response.data);
        dispatch({
          type: DELETE_PRODUCT,
          payload: {
            loading: false,
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        console.log("gagal dapat data: ", error.message);
        //gagal get API
      });
  };
};

export const detailProduct = (data) => {
  return (dispatch) => {
    dispatch({
      type: DETAIL_PRODUCT,
      payload: {
        data: data,
      },
    });
  };
};

export const updateProduct = (data) => {
  console.log("data ya: ", data.formData.get("productName"));
  return (dispatch) => {
    //loading
    dispatch({
      type: UPDATE_PRODUCT,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    // post API
    axios({
      method: `PATCH`,
      url: "https://nutech-crud-production.up.railway.app/api/v1/update-product/" + data.id,
      timeout: 120000,
      data: data?.formData,
    })
      .then((response) => {
        console.log("berhasil dapat data: ", response.data);
        dispatch({
          type: UPDATE_PRODUCT,
          payload: {
            loading: false,
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        console.log("gagal dapat data: ", error.message);
        //gagal get API
      });
  };
};
