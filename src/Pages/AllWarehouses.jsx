import React from "react";
import { Link} from "react-router-dom";

const AllWarehouses = ({ records }) => {
  return (
    <div className="warehouse-list">
      {records.map((warehouse) => (
        <div className="warehouse-card" key={warehouse.id}>
          <Link to={`/warehouse/${warehouse.id}`} style={{ textDecoration: 'none' }}>
            <div className="warehouse-card-header">{warehouse.name}</div>
            <div className="warehouse-card-body">
              <p>Code: {warehouse.code}</p>
              <p>City: {warehouse.city}</p>
              <p>Cluster: {warehouse.cluster}</p>
              <p>Type: {warehouse.type}</p>
              <p>Space Available: {warehouse.space_available} sq. ft.</p>
              <p>
                Registered: {warehouse.is_registered === true ? "Yes" : "No"}
              </p>
              <p>Live: {warehouse.is_live === true ? "Yes" : "No"}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default AllWarehouses;
