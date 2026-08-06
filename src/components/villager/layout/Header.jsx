import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from '../../../services/AuthService'
import { toast } from "react-toastify";

function Header() {
  const[email, setEmail] = useState('')

  function getEmail() {
    const res = AuthService.getEmail()
    setEmail(res)
  }

  const nav = useNavigate()
  function logout() {
    AuthService.logout();
    toast.success("Logged Out")
    nav("/")
  }


  useEffect(() => {
    getEmail();
  })

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
              <Link to="/" className="active">
                Home
              </Link>
            </li>

            <li>
              <Link to="/about">
                About Us
              </Link>
            </li>

            <li>
              <Link to="/schemes">
                Schemes
              </Link>
            </li>

            <li>
              <Link to="/events">
                Events
              </Link>
            </li>

            <li>
              <Link to="/my-scheme-applications">
                My Applications
              </Link>
            </li>

            <li>
              <Link to="/complaints">
                My Complaints
              </Link>
            </li>

            <li>
              <Link to="/profile">
                Profile
              </Link>
            </li>

            <li>
              <Link to="/contact">
                Contact
              </Link>
            </li>

            {email ?
              <li>
                <Link
                  to="/"
                  className="btn btn-sm btn-success text-white rounded-pill px-4 py-2"
                  onClick={logout}
                >
                  Logout
                </Link>
              </li>
              :
              <>
                <li>
                  <Link
                    to="/login"
                    className="btn btn-sm btn-success text-white rounded-pill px-4 py-2"
                  >
                    Login
                  </Link>
                </li>
                &nbsp;
                <li>
                  <Link
                    to="/register"
                    className="btn btn-sm btn-success text-white rounded-pill px-4 py-2"
                  >
                    Register
                  </Link>
                </li>
              </>}
          </ul>

          <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
        </nav>

      </div>
    </header>
  );
}

export default Header;