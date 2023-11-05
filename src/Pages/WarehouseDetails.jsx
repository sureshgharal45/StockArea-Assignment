import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { clearErrors, fetchWarehouseDetails } from "../Actions/warehouseAction";
import Spinner from "../Components/Spinner";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import "./WarehouseDetailsStyles.css";
import EditIcon from "@mui/icons-material/Edit";

const WarehouseDetails = () => {
  const [showSpinner, setShowSpinner] = useState(true);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singlerecord, error } = useSelector(
    (state) => state.warehousedetails
  );

  useEffect(() => {
    dispatch(fetchWarehouseDetails(id));

    if (error) {
      dispatch(clearErrors());
    }

    setTimeout(() => {
      setShowSpinner(false);
    }, 1500);
  }, [dispatch, id, error, singlerecord]);

  return (
    <div>
      {showSpinner ? (
        <Spinner />
      ) : (
        <>
          <div className="container mt-5">
            <div className="centered-card">
              <h1 style={{ fontWeight: 400, margin: "20px" }}>
                Warehouse Code : {singlerecord.code}{" "}
              </h1>
              <Card className="box" sx={{ maxWidth: 600 }}>
                <CardContent>
                  <div className="edit-btn">
                    <Link to={`/edit/${singlerecord.id}`}>
                      <button className="btn btn-primary mx-2">
                        <EditIcon />
                      </button>
                    </Link>
                  </div>
                  <div className="row">
                    <div className="left_view col-lg-6 col-md-6 col-12">
                      <p className="mt-4">
                        Name:&nbsp;
                        <span style={{ fontWeight: 400 }}>
                          {singlerecord.name}
                        </span>
                      </p>
                      <p className="mt-3">
                        City:{" "}
                        <span style={{ fontWeight: 400 }}>
                          {singlerecord.city}
                        </span>
                      </p>
                      <p className="mt-3">
                        Space Available:{" "}
                        <span>{singlerecord.space_available} sq. ft</span>
                      </p>
                    </div>
                    <div className="right_view col-lg-6 col-md-6 col-12">
                      <p className="mt-4">
                        Type: <span>{singlerecord.type}</span>
                      </p>
                      <p className="mt-3">
                        Cluster: <span>{singlerecord.cluster}</span>
                      </p>
                      <p className="mt-3">
                        Live:&nbsp;
                        <span>
                          {singlerecord.is_live === true ? "Yes" : "No"}
                        </span>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WarehouseDetails;
