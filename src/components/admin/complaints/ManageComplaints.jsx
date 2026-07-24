import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { PacmanLoader } from "react-spinners";
import Swal from "sweetalert2";

import ComplaintService from "../../../services/ComplaintService";

const override = {
  display: "block",
  margin: "0 auto",
};

export default function ManageComplaints() {
  const [loading, setLoading] = useState(false);
  const [complaints, setComplaints] = useState([]);

  async function fetchComplaints() {
    try {
      setLoading(true);
      const res = await ComplaintService.all();
      setComplaints(res);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load complaints");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchComplaints();
  }, []);

  async function deleteComplaint(id) {
    const result = await Swal.fire({
      title: "Delete complaint?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it",
    });

    if (!result.isConfirmed) return;

    try {
      await ComplaintService.deleteComplaint(id);
      toast.success("Complaint deleted successfully");
      fetchComplaints();
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete complaint");
    }
  }

  function getPriorityBadge(priority) {
    switch (priority) {
      case "High":
        return "bg-danger";
      case "Medium":
        return "bg-warning text-dark";
      default:
        return "bg-success";
    }
  }

  function getStatusBadge(status) {
    switch (status) {
      case "Resolved":
        return "bg-success";
      case "In Progress":
        return "bg-primary";
      case "Rejected":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  }

  return (
    <>
      <main className="main">
        <div
          className="page-title dark-background"
          style={{ backgroundImage: "url(assets/img/page-title-bg.webp)" }}
        >
          <div className="container position-relative">
            <h1>Manage Complaints</h1>

            <nav className="breadcrumbs">
              <ol>
                <li>
                  <Link to="/admin">Dashboard</Link>
                </li>

                <li className="current">Complaints</li>
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
            <div className="table-responsive">
              <table className="table ">
                <thead>
                  <tr>
                    <th>Sr. No.</th>
                    <th>Title</th>
                    <th>Location</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Created At</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {complaints.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center py-5">
                        No complaints found.
                      </td>
                    </tr>
                  ) : (
                    complaints.map((complaint, index) => (
                      <tr key={complaint.id}>
                        <td>{index + 1}</td>

                        <td>
                          <div className="fw-semibold">{complaint.title}</div>

                          <small className="text-muted">
                            {complaint.description?.slice(0, 60)}
                            {complaint.description?.length > 60 ? "..." : ""}
                          </small>
                        </td>

                        <td>{complaint.location || "N/A"}</td>

                        <td>
                          <span className={`badge ${getPriorityBadge(complaint.priority)}`}>
                            {complaint.priority}
                          </span>
                        </td>

                        <td>
                          <span className={`badge ${getStatusBadge(complaint.complaintStatus)}`}>
                            {complaint.complaintStatus}
                          </span>
                        </td>

                        <td>
                          {complaint.createdAt
                            ? new Date(complaint.createdAt).toLocaleDateString()
                            : "N/A"}
                        </td>

                        <td className="text-center">
                          <div className="d-flex justify-content-center gap-2">
                            <Link
                              to={`/admin/complaint/${complaint.id}`}
                              className="btn btn-sm btn-primary"
                            >
                              <i className="bi bi-eye"></i>
                            </Link>

                            <button
                              onClick={() => deleteComplaint(complaint.id)}
                              className="btn btn-sm btn-danger"
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
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