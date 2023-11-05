import {
  ALL_WAREHOUSES_REQUEST,
  CLEAR_ERRORS,
  FETCH_WAREHOUSE_DETAILS_FAILURE,
  FETCH_WAREHOUSE_DETAILS_REQUEST,
  FETCH_WAREHOUSE_DETAILS_SUCCESS,
  FILTER_WAREHOUSE_FAILURE,
  FILTER_WAREHOUSE_REQUEST,
  FILTER_WAREHOUSE_SUCCESS,
  SEARCH_WAREHOUSES_FAILED,
  SEARCH_WAREHOUSES_REQUEST,
  SEARCH_WAREHOUSES_SUCCESS,
  UPDATE_WAREHOUSE_FAILURE,
  UPDATE_WAREHOUSE_REQUEST,
  UPDATE_WAREHOUSE_RESET,
  UPDATE_WAREHOUSE_SUCCESS,
} from "../Constants/warehouseConstants";

const initialState = {
  data: [],
  loading: false,
  error: null,
  isUpdated: null,
  isFilter: null,
  searchCriteria: null,
  searchedResults: [],
  filteredResults: [],
};

//fetch all warehouses reducer
export const warehouseReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_WAREHOUSES_REQUEST:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

//Fetch single warehouse detail reducer
export const warehouseDetailsReducer = (
  state = { singlerecord: {} },
  action
) => {
  switch (action.type) {
    case FETCH_WAREHOUSE_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_WAREHOUSE_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        singlerecord: action.payload,
      };

    case FETCH_WAREHOUSE_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

//Update warehouse details reducer
export const updateWarehouseReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_WAREHOUSE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_WAREHOUSE_SUCCESS:
      return {
        ...state,
        data: action.payload.newWarehouses,
        loading: false,
        isUpdated: action.payload.status,
      };

    case UPDATE_WAREHOUSE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_WAREHOUSE_RESET: {
      return {
        ...state,
        isUpdated: false,
      };
    }

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

//Search by warehouse name reducer
export const searchWarehouseReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_WAREHOUSES_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case SEARCH_WAREHOUSES_SUCCESS:
      return {
        ...state,
        loading: false,
        searchedResults: action.payload.allFilteredWarehouses,
        data: [...action.payload.allFilteredWarehouses],
        searched: action.payload.isSearched,
      };

    case SEARCH_WAREHOUSES_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

//filter using city, cluster and space available
export const filterWarehouseReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILTER_WAREHOUSE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FILTER_WAREHOUSE_SUCCESS:
      return {
        ...state,
        loading: false,
        filteredResults: action.payload,
        isFilter: true,
        error: null,
      };

    case FILTER_WAREHOUSE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
