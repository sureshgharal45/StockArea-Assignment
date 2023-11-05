import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { clearErrors, fetchWarehouseDetails } from "../Actions/warehouseAction";
import { saveEditWarehouse } from "../Actions/warehouseAction";
import { UPDATE_WAREHOUSE_RESET } from "../Constants/warehouseConstants";
import Spinner from "../Components/Spinner";

const UpdateWarehouse = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singlerecord, error } = useSelector(
    (state) => state.warehousedetails
  );
  const { isUpdated, error: updateError } = useSelector(
    (state) => state.updateWarehouse
  );
  const [showSpinner, setShowSpinner] = useState(true);
  const [warehouseName, setWarehouseName] = useState("");
  const [city, setCity] = useState("");
  const [availableSpace, setAvailableSpace] = useState("");
  const [warehouseCluster, setWarehouseCluster] = useState("");
  const [warehouseType, setWarehouseType] = useState("");
  const [isLive, setIsLive] = useState();

  const handleNameChange = (e) => {
    setWarehouseName(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleSpaceChange = (e) => {
    setAvailableSpace(e.target.value);
  };

  const handleTypeChange = (e) => {
    setWarehouseType(e.target.value);
  };

  const handleClusterChange = (e) => {
    setWarehouseCluster(e.target.value);
  };

  const handleLivechange = (e) => {
    setIsLive(e.target.value);
  };

  const submitWarehousedata = (e) => {
    e.preventDefault();

    const newValues = {
      name: warehouseName,
      warehouseCity: city,
      spaceAvailable: Number(availableSpace),
      warehouseType: warehouseType,
      warehouseCluster: warehouseCluster,
      isLive: isLive,
    };

    dispatch(saveEditWarehouse(singlerecord, newValues));
  };

  useEffect(() => {
    if (singlerecord && singlerecord.id !== id) {
      dispatch(fetchWarehouseDetails(id));
    }
    setWarehouseName(singlerecord.name);
    setCity(singlerecord.city);
    setAvailableSpace(singlerecord.space_available);
    setWarehouseCluster(singlerecord.cluster);
    setWarehouseType(singlerecord.type);
    setIsLive(singlerecord.is_live);

    if (error) {
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      navigate("/");
      alert.success("Warehouse updated successfully");
      dispatch({ type: UPDATE_WAREHOUSE_RESET });
    }

    setTimeout(() => {
      setShowSpinner(false);
    }, 1000);
  }, [dispatch, error, id, singlerecord, navigate, isUpdated, updateError, alert]);

  return (
    <>
      <div className="container">
        {showSpinner ? (
          <Spinner />
        ) : (
          <>
            <div className="d-flex justify-content-center align-items-center vh-100">
              <div className="card p-3" style={{ borderRadius: "15px" }}>
                <div className="card-body">
                  <h1>Update Warehouse</h1>
                  <form className="mt-3">
                    <div className="row">
                      <div class="mb-3 col-lg-6 col-md-6 col-12 text-start">
                        <label for="exampleInputEmail1" className="form-label">
                          Name
                        </label>
                        <input
                          type="text"
                          value={warehouseName}
                          onChange={(e) => handleNameChange(e)}
                          name="warehousename"
                          class="form-control"
                          placeholder="Enter Warehouse Name"
                        />
                      </div>
                      <div class="mb-3 col-lg-6 col-md-6 col-12 text-start">
                        <label for="exampleInputPassword1" class="form-label">
                          City
                        </label>
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => handleCityChange(e)}
                          name="city"
                          class="form-control"
                          placeholder="Enter City"
                        />
                      </div>
                      <div class="mb-3 col-lg-6 col-md-6 col-12 text-start">
                        <label for="exampleInputPassword1" class="form-label">
                          Available Space
                        </label>
                        <input
                          type="text"
                          value={availableSpace}
                          onChange={(e) => handleSpaceChange(e)}
                          name="availablespace"
                          class="form-control"
                        />
                      </div>
                      <div class="mb-3 col-lg-6 col-md-6 col-12 text-start">
                        <label for="exampleInputPassword1" class="form-label">
                          Type
                        </label>
                        <input
                          type="text"
                          value={warehouseType}
                          onChange={(e) => handleTypeChange(e)}
                          name="type"
                          class="form-control"
                          placeholder="Enter Warehouse Type"
                        />
                      </div>
                      <div class="mb-3 col-lg-6 col-md-6 col-12 text-start">
                        <label for="exampleInputPassword1" class="form-label">
                          Cluster
                        </label>
                        <input
                          type="text"
                          value={warehouseCluster}
                          onChange={(e) => handleClusterChange(e)}
                          name="cluster"
                          class="form-control"
                          placeholder="Enter the cluster"
                        />
                      </div>
                      <div class="mb-3 col-lg-6 col-md-6 col-12 text-start">
                        <label for="inputState">Live</label>
                        <select
                          id="inputState"
                          value={isLive}
                          class="form-control"
                          name="live"
                          onChange={(e) => handleLivechange(e)}
                        >
                          <option value={true}>Yes</option>
                          <option value={false}>No</option>
                        </select>
                      </div>

                      <button
                        type="submit"
                        onClick={submitWarehousedata}
                        class="btn btn-primary mt-4"
                      >
                        Update
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default UpdateWarehouse;
