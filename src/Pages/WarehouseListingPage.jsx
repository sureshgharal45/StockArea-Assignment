import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "../Components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { fetchWarehouses } from "../Actions/warehouseAction";
import "./WarehouseListingStyles.css";
import AllWarehouses from "./AllWarehouses";
import Navbar from "../Components/Navbar";
import FilteredWsrehouses from "../Components/FilteredWsrehouses";

const WarehouseListingPage = () => {
  const [showSpinner, setShowSpinner] = useState(true);
  const { data } = useSelector((state) => state.allwarehouses);
  const { searched, searchedResults } = useSelector(
    (state) => state.searchWarehouse
  );
  const { filteredResults, isFilter } = useSelector(
    (state) => state.filterWarehouse
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      setShowSpinner(false);
    }, 1500);
    dispatch(fetchWarehouses());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-9">
            {showSpinner ? (
              <Spinner />
            ) : (
              <AllWarehouses
                records={
                  searched ? searchedResults : isFilter ? filteredResults : data
                }
              />
            )}
          </div>
          <div className="col-lg-3 text-left">
            <FilteredWsrehouses />
          </div>
        </div>
      </div>
    </>
  );
};

export default WarehouseListingPage;
