import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { PacmanLoader } from "react-spinners";

import SchemeApplicationService from "../../../services/SchemeApplicationService";
import GovernmentSchemeService from "../../../services/GovernmentSchemeService";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function MySchemeApplications() {
  const [loading, setLoading] = useState(false);
  const [applications, setApplications] = useState([]);
  
  const userId = localStorage.getItem("id");

  async function fetchApplications() {
    try {
      setLoading(true);
      const apps = await SchemeApplicationService.getByUser(userId);
      
      // Fetch scheme details for each application to display the title
      const schemes = await GovernmentSchemeService.all();
      const schemeMap = {};
      schemes.forEach(s => {
          schemeMap[s.id] = s.title;
      });
      
      const populatedApps = apps.map(app => ({
          ...app,
          schemeTitle: schemeMap[app.schemeId] || "Unknown Scheme"
      }));
      
      setApplications(populatedApps);
    } catch (err) {
      console.log(err);
      toast.error("Unable to fetch applications");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (userId) {
        fetchApplications();
    }
  }, [userId]);

  return (
    <main className="main">
      <div
        className="page-title dark-background"
        style={{ backgroundImage: "url(assets/img/page-title-bg.webp)" }}
      >
        <div className="container position-relative">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1>My Scheme Applications</h1>
              <nav className="breadcrumbs">
                <ol>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li className="current">My Applications</li>
                </ol>
              </nav>
            </div>
            <Link to="/schemes" className="btn btn-success rounded-pill px-4 py-2">
              Browse More Schemes
            </Link>
          </div>
        </div>
      </div>

      <section className="contact section">
        <div className="container py-5">
          {loading ? (
            <PacmanLoader
              color="#81C408"
              loading={loading}
              cssOverride={override}
              size={50}
            />
          ) : (
            <div className="table-responsive shadow rounded p-4 bg-white">
              <table className="table table-bordered table-hover mt-3">
                <thead className="table-light">
                  <tr>
                    <th>Sr. No.</th>
                    <th>Scheme Name</th>
                    <th>Status</th>
                    <th>Remarks</th>
                    <th>Applied On</th>
                    <th>Document</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app, index) => (
                    <tr key={app.id}>
                      <td>{index + 1}</td>
                      <td>{app.schemeTitle}</td>
                      <td>
                        <span className={`badge ${
                          app.applicationStatus === "Approved" ? "bg-success" : 
                          app.applicationStatus === "Rejected" ? "bg-danger" : "bg-warning text-dark"
                        }`}>
                          {app.applicationStatus}
                        </span>
                      </td>
                      <td>{app.remarks || "-"}</td>
                      <td>{new Date(app.createdAt).toLocaleDateString()}</td>
                      <td>
                        {app.documentUrl ? (
                          <a href={app.documentUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">
                            <i className="bi bi-file-earmark" /> View
                          </a>
                        ) : (
                          "No Document"
                        )}
                      </td>
                    </tr>
                  ))}
                  {applications.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center py-4">
                        You have not applied to any schemes yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
