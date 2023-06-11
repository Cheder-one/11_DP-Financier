import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link to={"/"} className="navbar-brand">
          Financier
        </Link>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul
            className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
            style={{ bsScrollHeight: "100px" }}
          >
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Link
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link disabled">Link</a>
            </li>
          </ul>
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-light dropdown-toggle"
              data-bs-toggle="dropdown"
              data-bs-display="static"
              aria-expanded="false"
            >
              {"Username"}
            </button>
            <ul className="dropdown-menu dropdown-menu-lg-end">
              <li>
                <Link to={"/profile"} className="dropdown-item">
                  Профиль
                </Link>
              </li>
              <li>
                <Link to={"/settings"} className="dropdown-item">
                  Настройки
                </Link>
              </li>
              <li>
                <Link to={"/exit"} className="dropdown-item">
                  Выйти
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
