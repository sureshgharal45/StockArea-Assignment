import { useDispatch } from "react-redux";
import { searchWarehouse } from "../Actions/warehouseAction";
import { useAlert } from "react-alert";

const Navbar = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const handleSearch = (e) => {
    e.preventDefault();
    const searchCriteria = {
      name: e.target.name.value,
    };
    if (!searchCriteria.name) {
      alert.error("please provide Warehouse Name to search");
    }
    dispatch(searchWarehouse(searchCriteria));
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-dark mx-3 w-100"
      style={{ height: "80px" }}
    >
      <div className="container">
        <div className="row w-100 align-items-center">
          <div className="col">
            <form className="form-inline" onSubmit={handleSearch}>
              <input
                className="form-control mr-sm-2"
                type="text"
                name="name"
                placeholder="Search by Warehouse Name"
                style={{
                  width: "300px",
                  backgroundColor: "white",
                  border: "none",
                  borderRadius: "10px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
                aria-label="Search"
              />
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
                style={{
                  backgroundColor: "dodgerblue",
                  borderColor: "dodgerblue",
                  color: "white",
                  borderRadius: "10px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                }}
              >
                Search
              </button>
            </form>
          </div>
          <div className="col text-center">
            <div className="warehouse-heading">Warehouses List</div>
          </div>
          <div className="col"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
