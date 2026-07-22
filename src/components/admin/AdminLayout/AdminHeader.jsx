import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthService from '../../../services/AuthService'
function AdminHeader() {

  const nav = useNavigate()
  async function logout() {
    await AuthService.logout();
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
        <NavLink to="/" className="logo d-flex align-items-center">
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
        </NavLink>

        {/* Navigation */}
        <nav id="navmenu" className="navmenu">
          <ul>
            <li>
              <NavLink to="/admin">
                Dashboard
              </NavLink>
            </li>

            <li>
              <NavLink to="/admin/villagers">
                Villagers
              </NavLink>
            </li>

            <li>
              <NavLink to="/admin/categories">
                Categories
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/complaints">
                Complaints
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/schemes">
                Schemes
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/events">
                Events
              </NavLink>
            </li>

            <li>
              <NavLink
                to=""
                onClick={logout}
                className="btn btn-success text-white rounded-pill px-4 py-2"
              >
                Logout
              </NavLink>
            </li>

          </ul>

          <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
        </nav>

      </div>
    </header>
  );
}

export default AdminHeader;