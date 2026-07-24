import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

import GovernmentSchemeService from "../../../services/GovernmentSchemeService";

export default function AddGovernmentScheme() {

    const navigate = useNavigate();

    const [scheme, setScheme] = useState({
        title: "",
        description: "",
        eligibility: "",
        benefits: "",
        lastDate: "",
    });

    function handleChange(e) {

        setScheme({
            ...scheme,
            [e.target.name]: e.target.value,
        });

    }

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            await GovernmentSchemeService.add(scheme);

            toast.success("Government Scheme Added");

            navigate(-1);

        }
        catch (err) {

            console.log(err);

            toast.error("Unable to add scheme");

        }

    }

     return (
<main className="main">

    {/* ===== Page Banner ===== */}

    <div
        className="page-title dark-background"
        style={{
            backgroundImage: "url(assets/img/page-title-bg.webp)"
        }}
    >
        <div className="container position-relative">

            <div className="row align-items-center gy-3">

                <div className="col-lg-8">

                    <h1 className="mb-2">
                        Add Government Scheme
                    </h1>

                    <p className="text-light mb-3">
                        Create and publish a new government welfare scheme for villagers.
                    </p>

                    <nav className="breadcrumbs">
                        <ol>
                            <li>
                                <Link to="/admin">
                                    Dashboard
                                </Link>
                            </li>

                            <li>
                                <Link to="/admin/manage-government-schemes">
                                    Government Schemes
                                </Link>
                            </li>

                            <li className="current">
                                Add Scheme
                            </li>
                        </ol>
                    </nav>

                </div>

                <div className="col-lg-4 text-lg-end">

                    <Link
                        to="/admin/manage-government-schemes"
                        className="btn btn-success rounded-pill px-4 py-2"
                    >
                        <i className="bi bi-list-ul me-2"></i>

                        View Schemes
                    </Link>

                </div>

            </div>

        </div>
    </div>

    {/* ===== Form ===== */}

    <section className="contact section">

        <div className="container">

            <div className="row justify-content-center">

                <div className="col-lg-9">

                    <div className="php-email-form mt-5 shadow rounded-4">

                        <div className="mb-4">

                            <h3>
                                Scheme Information
                            </h3>

                            <p className="text-muted mb-0">
                                Fill in the details below to publish a new government scheme.
                            </p>

                        </div>

                        <form onSubmit={handleSubmit}>

                            <div className="row gy-4">

                                {/* Title */}

                                <div className="col-12">

                                    <label className="form-label">
                                        Scheme Title
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="title"
                                        placeholder="Enter Scheme Title"
                                        value={scheme.title}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                {/* Description */}

                                <div className="col-12">

                                    <label className="form-label">
                                        Description
                                    </label>

                                    <textarea
                                        rows="4"
                                        className="form-control"
                                        name="description"
                                        placeholder="Describe the scheme..."
                                        value={scheme.description}
                                        onChange={handleChange}
                                        required
                                    ></textarea>

                                </div>

                                {/* Eligibility */}

                                <div className="col-md-6">

                                    <label className="form-label">
                                        Eligibility
                                    </label>

                                    <textarea
                                        rows="4"
                                        className="form-control"
                                        name="eligibility"
                                        placeholder="Eligibility Criteria"
                                        value={scheme.eligibility}
                                        onChange={handleChange}
                                        required
                                    ></textarea>

                                </div>

                                {/* Benefits */}

                                <div className="col-md-6">

                                    <label className="form-label">
                                        Benefits
                                    </label>

                                    <textarea
                                        rows="4"
                                        className="form-control"
                                        name="benefits"
                                        placeholder="Benefits of the scheme"
                                        value={scheme.benefits}
                                        onChange={handleChange}
                                        required
                                    ></textarea>

                                </div>

                                {/* Last Date */}

                                <div className="col-md-6">

                                    <label className="form-label">
                                        Last Application Date
                                    </label>

                                    <input
                                        type="date"
                                        className="form-control"
                                        name="lastDate"
                                        value={scheme.lastDate}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                {/* Status */}

                                <div className="col-md-6">

                                    <label className="form-label">
                                        Scheme Status
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value="Active"
                                        disabled
                                    />

                                </div>

                                {/* Button */}

                                <div className="col-12 text-center mt-3">

                                    <button
                                        type="submit"
                                        className="btn btn-success rounded-pill px-5 py-2"
                                    >
                                        <i className="bi bi-plus-circle me-2"></i>

                                        Publish Government Scheme

                                    </button>

                                </div>

                            </div>

                        </form>

                    </div>

                </div>

            </div>

        </div>

    </section>

</main>

    );
}