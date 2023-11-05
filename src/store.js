import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import {
  filterWarehouseReducer,
  searchWarehouseReducer,
  updateWarehouseReducer,
  warehouseDetailsReducer,
  warehouseReducer,
} from "./Reducers/warehouseReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  allwarehouses: warehouseReducer,
  warehousedetails: warehouseDetailsReducer,
  updateWarehouse: updateWarehouseReducer,
  searchWarehouse: searchWarehouseReducer,
  filterWarehouse: filterWarehouseReducer,
});

const middleware = [thunk];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
