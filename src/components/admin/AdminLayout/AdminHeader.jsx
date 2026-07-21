import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthService from '../../../services/AuthService'
function AdminHeader() {

  const nav = useNavigate()
  function logout() {
    AuthService.logout();
    toast.success("Logged Out")
    nav("/")
  }

  return (
    <header
      id="header"
      className="header d-flex align-items-center position-relative"
    >
      <div className="container-fluid container-xl d-flex align-items-center justify-content-between">

        {/* Logo */}
        <Link to="/" className="logo d-flex align-items-center">
          <img
            src="/assets/img/logo.png"
            alt="Gramin-Connect Logo"
            style={{
              height: "60px",
              width: "auto",
              marginRight: "10px",
            }}
          />

          <h1
            className="sitename"
            style={{
              color: "#fff",
              fontWeight: "700",
              fontSize: "32px",
              margin: 0,
            }}
          >
            <span style={{ color: "#ffffff" }}>Gramin-</span>
            <span style={{ color: "#f4b400" }}>Connect</span>
          </h1>
        </Link>

        {/* Navigation */}
        <nav id="navmenu" className="navmenu">
          <ul>
            <li>
              <Link to="/admin" className="active">
                Dashboard
              </Link>
            </li>

            <li>
              <Link to="/admin/villagers">
                Villagers
              </Link>
            </li>

            <li>
              <Link to="/admin/categories">
                Categories
              </Link>
            </li>
            <li>
              <Link to="/admin/complaints">
                Complaints
              </Link>
            </li>
            <li>
              <Link to="/admin/schemes">
                Schemes
              </Link>
            </li>
            <li>
              <Link to="/admin/events">
                Events
              </Link>
            </li>

            <li>
              <Link
                to=""
                onClick={logout}
                className="btn btn-primary px-4 py-2"
              >
                Logout
              </Link>
            </li>

          </ul>

          <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
        </nav>

      </div>
    </header>
  );
}

export default AdminHeader;