import {
  ALL_WAREHOUSES_REQUEST,
  FETCH_WAREHOUSE_DETAILS_REQUEST,
  FETCH_WAREHOUSE_DETAILS_SUCCESS,
  FETCH_WAREHOUSE_DETAILS_FAILURE,
  CLEAR_ERRORS,
  UPDATE_WAREHOUSE_REQUEST,
  UPDATE_WAREHOUSE_SUCCESS,
  UPDATE_WAREHOUSE_FAILURE,
  SEARCH_WAREHOUSES_REQUEST,
  SEARCH_WAREHOUSES_SUCCESS,
  SEARCH_WAREHOUSES_FAILED,
  FILTER_WAREHOUSE_REQUEST,
  FILTER_WAREHOUSE_SUCCESS,
  FILTER_WAREHOUSE_FAILURE,
} from "../Constants/warehouseConstants";
import warehousesData from "../warehouseData.json";

//fetch all warehouses
export const fetchWarehouses = () => {
  return {
    type: ALL_WAREHOUSES_REQUEST,
    payload: warehousesData,
  };
};

//fetch single warehouse
export const fetchWarehouseDetails = (id) => (dispatch) => {
  try {
    dispatch({ type: FETCH_WAREHOUSE_DETAILS_REQUEST });
    const warehouse = warehousesData.find((item) => item.id === Number(id));

    if (warehouse) {
      dispatch({
        type: FETCH_WAREHOUSE_DETAILS_SUCCESS,
        payload: warehouse,
      });
    }
  } catch (error) {
    dispatch({
      type: FETCH_WAREHOUSE_DETAILS_FAILURE,
      payload: error.message,
    });
  }
};

//update warehouse details
export const saveEditWarehouse = (warehouseToEdit, newValues) => (dispatch) => {
  try {
    dispatch({ type: UPDATE_WAREHOUSE_REQUEST });
    const {
      name,
      warehouseCity,
      spaceAvailable,
      warehouseType,
      warehouseCluster,
      isLive,
    } = newValues;

    const warehouseIndex = warehousesData.findIndex(
      (warehouse) => warehouse.id === warehouseToEdit.id
    );

    const newWarehouse = {
      ...warehousesData[warehouseIndex],
      name: name,
      city: warehouseCity,
      space_available: spaceAvailable,
      type: warehouseType,
      cluster: warehouseCluster,
      is_live: Boolean(isLive),
    };

    warehousesData[warehouseIndex] = newWarehouse;

    const newWarehouses = { ...warehousesData };

    if (newWarehouses) {
      dispatch({
        type: UPDATE_WAREHOUSE_SUCCESS,
        payload: { newWarehouses: newWarehouses, status: true },
      });
    }
  } catch (error) {
    dispatch({
      type: UPDATE_WAREHOUSE_FAILURE,
      payload: error.message,
    });
  }
};

//search warehouse
export const searchWarehouse = (searchCriteria) => (dispatch) => {
  try {
    dispatch({ type: SEARCH_WAREHOUSES_REQUEST });

    const filteredWarehouses = warehousesData.filter((warehouse) => {
      let matchesSearchCriteria = true;
      if (searchCriteria.name) {
        return warehouse.name
          .toLowerCase()
          .includes(searchCriteria.name.toLowerCase());
      }

      return matchesSearchCriteria;
    });

    if (filteredWarehouses) {
      dispatch({
        type: SEARCH_WAREHOUSES_SUCCESS,
        payload: {
          allFilteredWarehouses: filteredWarehouses,
          searchInput: searchCriteria,
          isSearched: searchCriteria ? true : false,
        },
      });
    }
  } catch (error) {
    dispatch({
      type: SEARCH_WAREHOUSES_FAILED,
      payload: error.message,
    });
  }
};

//Filter warehouse base on city, cluster and space available
export const filterWarehouses = (filterCriteria) => (dispatch) => {
  try {
    dispatch({ type: FILTER_WAREHOUSE_REQUEST });

    const filteredWarehouses = warehousesData.filter((warehouse) => {
      const { city, cluster, space_available } = filterCriteria;
      const searchCity = city ? city.toLowerCase() : null;
      const searchCluster = cluster ? cluster.toLowerCase() : null;
      const cityMatch = city
        ? warehouse.city.toLowerCase() === searchCity
        : true;
      const clusterMatch = cluster
        ? warehouse.cluster.toLowerCase() === searchCluster
        : true;
      const spaceAvailableMatch = space_available
        ? warehouse.space_available >= space_available
        : true;

      return cityMatch && clusterMatch && spaceAvailableMatch;
    });

    dispatch({ type: FILTER_WAREHOUSE_SUCCESS, payload: filteredWarehouses });
  } catch (error) {
    dispatch({
      type: FILTER_WAREHOUSE_FAILURE,
      payload: error.message,
    });
  }
};

//to clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
