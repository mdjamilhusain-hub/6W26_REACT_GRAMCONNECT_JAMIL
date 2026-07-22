import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import { toast } from "react-toastify";

import ComplaintService from "../../../services/ComplaintService";

const override = {
    display: "block",
    margin: "0 auto"
};

export default function ViewComplaint() {

    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        fetchComplaints();

    }, []);

   async function fetchComplaints() {

    try {

        setLoading(true);

        const userId = localStorage.getItem("id");

        const res = await ComplaintService.getByUser(userId);

        setComplaints(res);

    } catch (err) {

        toast.error("Unable to fetch complaints");

        console.log(err);

    } finally {

        setLoading(false);

    }

}

    function getStatusBadge(status) {

        switch (status) {

            case "Resolved":
                return "bg-success";

            case "Rejected":
                return "bg-danger";

            case "In Progress":
                return "bg-warning";

            default:
                return "bg-secondary";

        }

    }

    return (

        <section
            id="recent-posts"
            className="recent-posts section"
        >

            <div className="container section-title">

                <div className="d-flex justify-content-between align-items-center">

                    <h2 className="mb-0">

                        Complaints

                    </h2>

                    <Link
                        to="/complaint/add"
                        className="btn btn-success rounded-pill px-4"
                    >

                        <i className="bi bi-plus-circle me-2"></i>

                        Post Complaint

                    </Link>

                </div>

            </div>

            <div className="container">

                {loading && (

                    <PacmanLoader
                        color="#198754"
                        loading={loading}
                        cssOverride={override}
                        size={30}
                    />

                )}

                {!loading && complaints.length === 0 && (

                    <div className="text-center py-5">

                        <h4>

                            No complaints found

                        </h4>

                    </div>

                )}

                <div className="row gy-5">

                    {complaints.map((complaint) => (

                        <div
                            className="col-xl-4 col-md-6"
                            key={complaint.id}
                        >

                            <div className="post-item position-relative h-100">

                                <div className="post-img position-relative overflow-hidden">

                                    <img
                                        src={
                                            complaint.image ||
                                            "assets/img/blog/blog-1.jpg"
                                        }
                                        className="img-fluid"
                                        alt={complaint.title}
                                        style={{
                                            height: "250px",
                                            width: "100%",
                                            objectFit: "cover"
                                        }}
                                    />

                                    <span className="post-date">

                                        {new Date(
                                            complaint.createdAt
                                        ).toLocaleDateString()}

                                    </span>

                                </div>

                                <div className="post-content d-flex flex-column">

                                    <h3 className="post-title">

                                        {complaint.title}

                                    </h3>

                                    <div className="meta d-flex align-items-center flex-wrap">

                                        <div className="d-flex align-items-center">

                                            <i className="bi bi-geo-alt" />

                                            <span className="ps-2">

                                                {complaint.location}

                                            </span>

                                        </div>

                                        <span className="px-3 text-black-50">

                                            /

                                        </span>

                                        <div>

                                            <span className={`badge ${complaint.priority === "High"
                                                    ? "bg-danger"
                                                    : complaint.priority === "Medium"
                                                        ? "bg-warning"
                                                        : "bg-success"
                                                }`}>

                                                {complaint.priority}

                                            </span>

                                        </div>

                                    </div>

                                    <hr />

                                    <p>

                                        {complaint.description.length > 100
                                            ? complaint.description.slice(0, 100) + "..."
                                            : complaint.description}

                                    </p>

                                    <div className="d-flex justify-content-between align-items-center mt-auto">

                                        <span className={`badge ${complaint.complaintStatus === "Resolved"
                                                ? "bg-success"
                                                : complaint.complaintStatus === "Rejected"
                                                    ? "bg-danger"
                                                    : complaint.complaintStatus === "In Progress"
                                                        ? "bg-warning"
                                                        : "bg-secondary"
                                            }`}>

                                            {complaint.complaintStatus}

                                        </span>

                                        <Link
                                            to={`/complaint/${complaint.id}`}
                                            className="readmore stretched-link"
                                        >

                                            <span>

                                                View Details

                                            </span>

                                            <i className="bi bi-arrow-right" />

                                        </Link>

                                    </div>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </section>

    );

}