import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./FilteredWarehouseStyles.css";
import { filterWarehouses } from "../Actions/warehouseAction";

const FilteredWsrehouses = () => {
  const dispatch = useDispatch();
  const [filterCriteria, setFilterCriteria] = useState({
    city: "",
    cluster: "",
    space_available: "",
  });

  const handleFilter = (e) => {
    e.preventDefault();
    dispatch(filterWarehouses(filterCriteria));
    filterCriteria.city = "";
    filterCriteria.cluster = "";
    filterCriteria.space_available = "";
  };

  return (
    <div className="filter-container">
      <h4>Filter Warehouse</h4>
      <div>
        <label>City:</label>
        <input
          type="text"
          value={filterCriteria.city}
          onChange={(e) =>
            setFilterCriteria({ ...filterCriteria, city: e.target.value })
          }
        />
      </div>

      <div>
        <label>Cluster:</label>
        <input
          type="text"
          value={filterCriteria.cluster}
          onChange={(e) =>
            setFilterCriteria({ ...filterCriteria, cluster: e.target.value })
          }
        />
      </div>

      <div>
        <label>Space Available (limit):</label>
        <input
          type="number"
          value={filterCriteria.space_available}
          onChange={(e) =>
            setFilterCriteria({
              ...filterCriteria,
              space_available: e.target.value,
            })
          }
        />
      </div>
      <button onClick={handleFilter}>Apply Filter</button>
    </div>
  );
};

export default FilteredWsrehouses;
