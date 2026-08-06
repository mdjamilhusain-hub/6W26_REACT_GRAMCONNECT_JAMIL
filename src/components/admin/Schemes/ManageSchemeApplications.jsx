import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { PacmanLoader } from "react-spinners";
import Swal from "sweetalert2";

import SchemeApplicationService from "../../../services/SchemeApplicationService";
import GovernmentSchemeService from "../../../services/GovernmentSchemeService";
import UserService from "../../../services/UserService";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function ManageSchemeApplications() {
  const { id } = useParams(); // Scheme ID
  const [loading, setLoading] = useState(false);
  const [applications, setApplications] = useState([]);
  const [scheme, setScheme] = useState(null);

  async function fetchData() {
    try {
      setLoading(true);
      const schemeData = await GovernmentSchemeService.single(id);
      setScheme(schemeData);

      const apps = await SchemeApplicationService.getByScheme(id);
      
      const users = await UserService.all();
      const userMap = {};
      users.forEach(u => {
          userMap[u.id] = u;
      });

      const populatedApps = apps.map(app => ({
          ...app,
          userName: userMap[app.userId]?.name || "Unknown",
          userEmail: userMap[app.userId]?.email || "Unknown"
      }));

      setApplications(populatedApps);
    } catch (err) {
      console.log(err);
      toast.error("Unable to fetch data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [id]);

  async function handleStatusUpdate(appId, newStatus) {
    try {
      const { value: remarks } = await Swal.fire({
        title: `Enter Remarks for ${newStatus}`,
        input: 'text',
        inputPlaceholder: 'Enter remarks...',
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Submit"
      });

      if (remarks !== undefined) {
        await SchemeApplicationService.update({
            applicationStatus: newStatus,
            remarks: remarks
        }, appId);
        
        toast.success(`Application ${newStatus}`);
        fetchData();
      }
    } catch (err) {
      console.log(err);
      toast.error("Error updating application status");
    }
  }

  return (
    <>
      <main className="main">
        <div
          className="page-title dark-background"
          style={{ backgroundImage: "url(/assets/img/page-title-bg.webp)" }}
        >
          <div className="container position-relative">
            <h1>Scheme Applications</h1>
            <nav className="breadcrumbs">
              <ol>
                <li>
                  <Link to="/admin">Dashboard</Link>
                </li>
                <li>
                  <Link to="/admin/Schemes">Schemes</Link>
                </li>
                <li className="current">Applications</li>
              </ol>
            </nav>
          </div>
        </div>
      </main>

      {loading ? (
        <PacmanLoader
          color="#81C408"
          loading={loading}
          cssOverride={override}
          size={50}
        />
      ) : (
        <div className="container-fluid py-5">
          <div className="container py-5">
            <div className="d-flex justify-content-between mb-4">
              <h3>Applications for: {scheme?.title}</h3>
            </div>
            <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th scope="col">Sr. No.</th>
                    <th scope="col">Applicant Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Status</th>
                    <th scope="col">Remarks</th>
                    <th scope="col">Document</th>
                    <th scope="col">Applied On</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app, index) => (
                    <tr key={app.id}>
                      <td>{index + 1}</td>
                      <td>{app.userName}</td>
                      <td>{app.userEmail}</td>
                      <td>
                         <span className={`badge ${
                          app.applicationStatus === "Approved" ? "bg-success" : 
                          app.applicationStatus === "Rejected" ? "bg-danger" : "bg-warning text-dark"
                        }`}>
                          {app.applicationStatus}
                        </span>
                      </td>
                      <td>{app.remarks || "-"}</td>
                      <td>
                        {app.documentUrl ? (
                          <a href={app.documentUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-info text-white">
                            <i className="bi bi-file-earmark" /> View
                          </a>
                        ) : (
                          "No Document"
                        )}
                      </td>
                      <td>{new Date(app.createdAt).toLocaleDateString()}</td>
                      <td>
                        {app.applicationStatus === "Pending" && (
                            <>
                                <button
                                onClick={() => handleStatusUpdate(app.id, "Approved")}
                                className="btn btn-sm btn-success me-2"
                                title="Approve"
                                >
                                <i className="bi bi-check-circle" />
                                </button>
                                <button
                                onClick={() => handleStatusUpdate(app.id, "Rejected")}
                                className="btn btn-sm btn-danger"
                                title="Reject"
                                >
                                <i className="bi bi-x-circle" />
                                </button>
                            </>
                        )}
                      </td>
                    </tr>
                  ))}
                  {applications.length === 0 && (
                    <tr>
                      <td colSpan="8" className="text-center">
                        No Applications Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
