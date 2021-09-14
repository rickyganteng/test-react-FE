import axiosApiIntances from "../../utils/axios";

export const getAllBarang = (page, limit, sortBy, search) => {
  return {
    type: "GET_ALL_BARANG",
    payload: axiosApiIntances.get(
      `/?page=${page}&limit=${limit}&keywords=${search}&sort=${sortBy}`
    ),
  };
};

export const updateBarang = (id, data) => {
  return {
    type: "UPDATE_BARANG",
    payload: axiosApiIntances.patch(`/${id}`, data),
  };
};

export const postBarang = (data) => {
  return {
    type: "POST_BARANG",
    payload: axiosApiIntances.post("", data),
  };
};

export const deleteBarang = (id) => {
  return {
    type: "DELETE_BARANG",
    payload: axiosApiIntances.delete(`/${id}`),
  };
};

export const getBarangName = () => {
  return {
    type: "BARANG_NAME",
    payload: axiosApiIntances.get("/name"),
  };
};
