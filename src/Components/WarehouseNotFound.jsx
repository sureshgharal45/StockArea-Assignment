import React from "react";
import "./WarehouseNotFoundStyles.css";

const WarehouseNotFound = () => {
  return (
    <div className="not-found-container">
      <h2 className="not-found-title">No Warehouses Found</h2>
      <p className="not-found-text">
        Sorry, no warehouses match your criteria. Try for another search
      </p>
    </div>
  );
};

export default WarehouseNotFound;
