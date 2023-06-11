import { Link, NavLink } from "react-router-dom";
import Authorized from "./auth/Authorize";
import Button from "./utils/Button";
import { logout } from "./auth/handleJWT";
import { useContext } from "react";
import AuthenticationContext from "./auth/AuthenticationContext";

export default function Menu() {
  const { update, claims } = useContext(AuthenticationContext);

  function getUserEmail(): string {
    return claims.filter((x) => x.name === "email")[0]?.value;
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand">
          Game Review App
        </NavLink>
        <div
          className="collapse navbar-collapse"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/games/filter">
                Filter Games
              </NavLink>
            </li>
            <Authorized
              role="admin"
              authorized={
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/category">
                      Category
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink className="nav-link" to="/brands">
                      Brands
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/shops">
                      Shops
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/games/create">
                      Create a game
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/users">
                      Users
                    </NavLink>
                  </li>
                </>
              }
            />
          </ul>

          <div className="d-flex">
            <Authorized
              authorized={
                <>
                  <span className="nav-link">Hello, {getUserEmail()}</span>

                  <Button
                    onClick={() => {
                      logout();
                      update([]);
                    }}
                    className="nav-link btn btn-link"
                  >
                    Log out
                  </Button>
                </>
              }
              nonAuthorized={
                <>
                  <Link to="/register" className="nav-link btn btn-link">
                    Register
                  </Link>
                  <Link to="/login" className="nav-link btn btn-link">
                    Login
                  </Link>
                </>
              }
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
