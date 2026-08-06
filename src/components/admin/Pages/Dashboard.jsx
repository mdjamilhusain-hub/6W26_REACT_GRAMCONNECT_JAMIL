import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserService from "../../../services/UserService";
import ComplaintService from "../../../services/ComplaintService";
import GovernmentSchemeService from "../../../services/GovernmentSchemeService";
import EventService from "../../../services/EventService";

export default function Dashboard() {

  const [stats, setStats] = useState({
    villagers: 0,
    complaints: 0,
    schemes: 0,
    events: 0,
  });

  const [loading, setLoading] = useState(false);

  async function fetchStats() {
    try {
      setLoading(true);
      const [villagers, complaints, schemes, events] = await Promise.all([
        UserService.all(),
        ComplaintService.all(),
        GovernmentSchemeService.all(),
        EventService.all(),
      ]);
      setStats({
        villagers: villagers.length,
        complaints: complaints.length,
        schemes: schemes.length,
        events: events.length,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <>
      <main className="main">
        <div
          className="page-title dark-background"
          style={{ backgroundImage: "url(assets/img/page-title-bg.webp)" }}
        >
          <div className="container position-relative">
            <h1>Admin Dashboard</h1>
            <nav className="breadcrumbs">
              <ol>
                <li className="current">Dashboard</li>
              </ol>
            </nav>
          </div>
        </div>
      </main>

      <div className="container py-5">

        <h4 className="mb-4">Overview</h4>

        {loading ? (
          <p>Loading stats...</p>
        ) : (
          <div className="row gy-4">

            {/* Villagers */}
            <div className="col-lg-3 col-md-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body d-flex align-items-center gap-3 p-4">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: "60px", height: "60px", backgroundColor: "#d4edda" }}
                  >
                    <i className="bi bi-people-fill text-success" style={{ fontSize: "1.6rem" }}></i>
                  </div>
                  <div>
                    <h2 className="mb-0 fw-bold">{stats.villagers}</h2>
                    <p className="mb-0 text-muted">Total Villagers</p>
                  </div>
                </div>
                <div className="card-footer bg-white border-0 pb-3 ps-4">
                  <Link to="/admin/villagers" className="text-success small">
                    View All <i className="bi bi-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>

            {/* Complaints */}
            <div className="col-lg-3 col-md-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body d-flex align-items-center gap-3 p-4">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: "60px", height: "60px", backgroundColor: "#fff3cd" }}
                  >
                    <i className="bi bi-exclamation-triangle-fill text-warning" style={{ fontSize: "1.6rem" }}></i>
                  </div>
                  <div>
                    <h2 className="mb-0 fw-bold">{stats.complaints}</h2>
                    <p className="mb-0 text-muted">Total Complaints</p>
                  </div>
                </div>
                <div className="card-footer bg-white border-0 pb-3 ps-4">
                  <Link to="/admin/complaints" className="text-warning small">
                    View All <i className="bi bi-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>

            {/* Government Schemes */}
            <div className="col-lg-3 col-md-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body d-flex align-items-center gap-3 p-4">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: "60px", height: "60px", backgroundColor: "#cce5ff" }}
                  >
                    <i className="bi bi-file-earmark-text-fill text-primary" style={{ fontSize: "1.6rem" }}></i>
                  </div>
                  <div>
                    <h2 className="mb-0 fw-bold">{stats.schemes}</h2>
                    <p className="mb-0 text-muted">Govt Schemes</p>
                  </div>
                </div>
                <div className="card-footer bg-white border-0 pb-3 ps-4">
                  <Link to="/admin/Schemes" className="text-primary small">
                    View All <i className="bi bi-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>

            {/* Events */}
            <div className="col-lg-3 col-md-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body d-flex align-items-center gap-3 p-4">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: "60px", height: "60px", backgroundColor: "#f8d7da" }}
                  >
                    <i className="bi bi-calendar-event-fill text-danger" style={{ fontSize: "1.6rem" }}></i>
                  </div>
                  <div>
                    <h2 className="mb-0 fw-bold">{stats.events}</h2>
                    <p className="mb-0 text-muted">Village Events</p>
                  </div>
                </div>
                <div className="card-footer bg-white border-0 pb-3 ps-4">
                  <Link to="/admin/Events" className="text-danger small">
                    View All <i className="bi bi-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Quick Actions */}
        <h4 className="mt-5 mb-4">Quick Actions</h4>
        <div className="row gy-3">

          <div className="col-md-4">
            <Link to="/admin/governmentScheme/add" className="btn btn-outline-primary w-100 py-3">
              <i className="bi bi-plus-circle me-2"></i>
              Add Government Scheme
            </Link>
          </div>

          <div className="col-md-4">
            <Link to="/admin/event/add" className="btn btn-outline-success w-100 py-3">
              <i className="bi bi-calendar-plus me-2"></i>
              Add New Event
            </Link>
          </div>

          <div className="col-md-4">
            <Link to="/admin/categories" className="btn btn-outline-secondary w-100 py-3">
              <i className="bi bi-tags me-2"></i>
              Manage Categories
            </Link>
          </div>

        </div>

      </div>
    </>
  );
}