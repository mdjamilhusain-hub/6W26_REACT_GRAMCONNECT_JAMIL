import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { PacmanLoader } from "react-spinners";

import ComplaintService from "../../../services/ComplaintService";

const override = {
    display: "block",
    margin: "0 auto",
};

export default function ComplaintDetail() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [complaint, setComplaint] = useState(null);
    const [status, setStatus] = useState("");

    async function fetchComplaint() {
        try {
            setLoading(true);

            let res = await ComplaintService.single(id);

            if (!res) {
                toast.error("Complaint not found");
                navigate(-1);
                return;
            }

            setComplaint(res);
            setStatus(res.complaintStatus);

        } catch (err) {
            console.log(err);
            toast.error("Error loading complaint");
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchComplaint();
    }, []);

    async function updateStatus(e) {
        e.preventDefault();

        try {

            await ComplaintService.update(
                {
                    complaintStatus: status,
                    updatedAt: Date.now()
                },
                id
            );

            toast.success("Complaint updated successfully");
            navigate(-1);

        } catch (err) {
            console.log(err);
            toast.error("Unable to update complaint");
        }
    }

    return (
    <>
        <main className="main">

            <div
                className="page-title dark-background"
                style={{
                    backgroundImage:
                        "url(assets/img/page-title-bg.webp)",
                }}
            >
                <div className="container position-relative">
                    <h1>Complaint Details</h1>

                    <nav className="breadcrumbs">
                        <ol>
                            <li>
                                <Link to="/admin">
                                    Dashboard
                                </Link>
                            </li>

                            <li>
                                <Link to="/admin/manage-complaints">
                                    Complaints
                                </Link>
                            </li>

                            <li className="current">
                                Complaint Details
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

                        {/* LEFT */}

                        <div className="col-lg-8">

                            <div className="p-4 shadow rounded bg-white h-100">

                                <h3 className="mb-4">
                                    {complaint.title}
                                </h3>

                                <div className="mb-4">

                                    <h6>Description</h6>

                                    <p className="text-muted">
                                        {complaint.description}
                                    </p>

                                </div>

                                <div className="row">

                                    <div className="col-md-6 mb-4">

                                        <h6>Location</h6>

                                        <p>
                                            {complaint.location}
                                        </p>

                                    </div>

                                    <div className="col-md-6 mb-4">

                                        <h6>Priority</h6>

                                        <span
                                            className={`badge ${complaint.priority === "High"
                                                    ? "bg-danger"
                                                    : complaint.priority === "Medium"
                                                        ? "bg-warning text-dark"
                                                        : "bg-success"
                                                }`}
                                        >
                                            {complaint.priority}
                                        </span>

                                    </div>

                                </div>

                                <div className="mb-4">

                                    <h6>Submitted On</h6>

                                    <p>
                                        {new Date(
                                            complaint.createdAt
                                        ).toLocaleString()}
                                    </p>

                                </div>

                            </div>

                        </div>

                        {/* RIGHT */}

                        <div className="col-lg-4">

                            <div className="shadow rounded bg-white p-4">

                                <h5 className="mb-4">
                                    Complaint Summary
                                </h5>

                                {complaint.image ? (

                                    <img
                                        src={complaint.image}
                                        className="img-fluid rounded mb-4"
                                        alt=""
                                    />

                                ) : (

                                    <div
                                        className="text-center border rounded py-5 mb-4"
                                    >
                                        <i
                                            className="bi bi-image"
                                            style={{
                                                fontSize: "50px",
                                            }}
                                        ></i>

                                        <p className="mt-2">
                                            No Image
                                        </p>

                                    </div>

                                )}

                                <div className="mb-4">

                                    <label className="mb-2">
                                        Status
                                    </label>

                                    <select
                                        className="form-control"
                                        value={status}
                                        onChange={(e) =>
                                            setStatus(
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option>
                                            Pending
                                        </option>

                                        <option>
                                            In Progress
                                        </option>

                                        <option>
                                            Resolved
                                        </option>

                                        <option>
                                            Rejected
                                        </option>

                                    </select>

                                </div>

                                <button
                                    onClick={updateStatus}
                                    className="btn btn-success border w-100"
                                >
                                    Update Status
                                </button>

                                <button
                                    onClick={() =>
                                        navigate(-1)
                                    }
                                    className="btn btn-light border w-100 mt-3"
                                >
                                    Back
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

        )}
    </>
);
}