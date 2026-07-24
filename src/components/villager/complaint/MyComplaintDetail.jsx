import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PacmanLoader } from "react-spinners";
import { toast } from "react-toastify";

import ComplaintService from "../../../services/ComplaintService";
import Swal from "sweetalert2";

const override = {
    display: "block",
    margin: "0 auto",
};

export default function MyComplaintDetail() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [complaint, setComplaint] = useState(null);

    async function fetchComplaint() {
        try {
            setLoading(true);

            const res = await ComplaintService.single(id);

            if (!res) {
                toast.error("Complaint not found");
                navigate(-1);
                return;
            }

            setComplaint(res);

        } catch (err) {
            console.log(err);
            toast.error("Unable to load complaint");
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchComplaint();
    }, []);

    function statusClass(status) {
        switch (status) {
            case "Resolved":
                return "success";

            case "In Progress":
                return "warning";

            case "Rejected":
                return "danger";

            default:
                return "secondary";
        }
    }

    function priorityClass(priority) {
        switch (priority) {
            case "High":
                return "danger";

            case "Medium":
                return "warning";

            default:
                return "success";
        }
    }

    async function closeComplaint() {
        try {

            await ComplaintService.update(
                {
                    complaintStatus: "Closed",
                    updatedAt: Date.now()
                },
                complaint.id
            );

            toast.success("Complaint closed successfully");

            fetchComplaint();

        } catch (err) {
            console.log(err);
            toast.error("Unable to close complaint");
        }
    }

    async function deleteComplaint() {

        const result = await Swal.fire({
            title: "Delete Complaint?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete"
        });

        if (!result.isConfirmed) return;

        await ComplaintService.deleteComplaint(complaint.id);

        toast.success("Complaint deleted");

        navigate("/complaints");
    }

    return (
        <>
            <main className="main">

                <div
                    className="page-title dark-background"
                    style={{
                        backgroundImage:
                            "url(assets/img/page-title-bg.webp)"
                    }}
                >
                    <div className="container position-relative">

                        <h1>Complaint Details</h1>

                        <nav className="breadcrumbs">
                            <ol>
                                <li>
                                    <Link to="/">Home</Link>
                                </li>

                                <li>
                                    <Link to="/my-complaints">
                                        My Complaints
                                    </Link>
                                </li>

                                <li className="current">
                                    Details
                                </li>
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

                complaint &&

                <section className="section-padding">

                    <div className="container">

                        <div className="row">

                            <div className="col-lg-8">

                                <div className="shadow rounded p-4 bg-white">

                                    <div className="d-flex justify-content-between align-items-center mb-4">

                                        <h3 className="mb-0">
                                            {complaint.title}
                                        </h3>

                                        <span className={`badge bg-${statusClass(complaint.complaintStatus)}`}>
                                            {complaint.complaintStatus}
                                        </span>

                                    </div>

                                    <h5>Description</h5>

                                    <p className="text-muted">
                                        {complaint.description}
                                    </p>

                                    <hr />

                                    <div className="row">

                                        <div className="col-md-6 mb-3">

                                            <h6>Location</h6>

                                            <p>{complaint.location}</p>

                                        </div>

                                        <div className="col-md-6 mb-3">

                                            <h6>Priority</h6>

                                            <span className={`badge bg-${priorityClass(complaint.priority)}`}>
                                                {complaint.priority}
                                            </span>

                                        </div>

                                        <div className="col-md-6">

                                            <h6>Submitted On</h6>

                                            <p>
                                                {new Date(
                                                    complaint.createdAt
                                                ).toLocaleString()}
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </div>

                            <div className="col-lg-4">

                                <div className="shadow rounded p-4 bg-white">

                                    <h5 className="mb-3">
                                        Attached Image
                                    </h5>

                                    {complaint.image ? (

                                        <img
                                            src={complaint.image}
                                            alt=""
                                            className="img-fluid rounded"
                                        />

                                    ) : (

                                        <div className="text-center py-5">

                                            <i
                                                className="bi bi-image"
                                                style={{
                                                    fontSize: "60px"
                                                }}
                                            ></i>

                                            <p className="mt-3">
                                                No image uploaded
                                            </p>

                                        </div>

                                    )}

                                    <hr />

                                    <h5>Current Status</h5>

                                    <p className="mb-3">

                                        Your complaint is currently

                                        <strong>
                                            {" "}
                                            {complaint.complaintStatus}
                                        </strong>

                                    </p>
                                    <div className="d-grid gap-3 mt-4">

                                        {complaint.complaintStatus === "Pending" && (
                                            <>
                                                <Link
                                                    to={`/edit-complaint/${complaint.id}`}
                                                    className="btn btn-outline-warning text-center"
                                                >
                                                    <i className="bi bi-pencil-square me-2"></i>
                                                    Edit Complaint
                                                </Link>

                                                <button
                                                    className="btn btn-outline-danger"
                                                    onClick={deleteComplaint}
                                                >
                                                    <i className="bi bi-trash me-2"></i>
                                                    Delete Complaint
                                                </button>
                                            </>
                                        )}

                                        {complaint.complaintStatus === "Resolved" && (
                                            <button
                                                className="contact_btn"
                                                onClick={closeComplaint}
                                            >
                                                <i className="bi bi-check-circle me-2"></i>
                                                Close Complaint
                                            </button>
                                        )}

                                        <button
                                            className="btn btn-outline-secondary"
                                            onClick={() => navigate(-1)}
                                        >
                                            <i className="bi bi-arrow-left me-2"></i>
                                            Back
                                        </button>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </section>

            )}

        </>
    );
}