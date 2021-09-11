const initialState = {
  dataBarang: [],
  pagination: {},
  isLoading: false,
  isError: false,
  msg: "",
};

const barang = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_BARANG_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "GET_ALL_BARANG_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        dataBarang: action.payload.data.data,
        msg: action.payload.data.msg,
        pagination: action.payload.data.pagination,
      };
    case "GET_ALL_BARANG_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        dataBarang: [],
        msg: action.payload.data.msg,
        pagination: {},
      };
    case "UPDATE_BARANG_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "UPDATE_BARANG_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };
    case "UPDATE_BARANG_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.data.msg,
      };
    case "POST_BARANG_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "POST_BARANG_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };
    case "POST_BARANG_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.data.msg,
      };
    case "DELETE_BARANG_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "DELETE_BARANG_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };
    case "DELETE_BARANG_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.data.msg,
      };
    default:
      return state;
  }
};

export default barang;