import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

import EventService from "../../../services/EventService";

export default function AddEvent() {

    const navigate = useNavigate();

    const [event, setEvent] = useState({
        title: "",
        description: "",
        location: "",
        eventDate: "",
    });

    function handleChange(e) {
        setEvent({
            ...event,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            await EventService.add(event);

            toast.success("Event Added Successfully");

            navigate(-1);

        } catch (err) {

            console.log(err);

            toast.error("Unable to add event");

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
                                Add Event
                            </h1>

                            <p className="text-light mb-3">
                                Create and publish a new village event for the community.
                            </p>

                            <nav className="breadcrumbs">
                                <ol>
                                    <li>
                                        <Link to="/admin">
                                            Dashboard
                                        </Link>
                                    </li>

                                    <li>
                                        <Link to="/admin/Events">
                                            Events
                                        </Link>
                                    </li>

                                    <li className="current">
                                        Add Event
                                    </li>
                                </ol>
                            </nav>

                        </div>

                        <div className="col-lg-4 text-lg-end">

                            <Link
                                to="/admin/Events"
                                className="btn btn-success rounded-pill px-4 py-2"
                            >
                                <i className="bi bi-list-ul me-2"></i>

                                View Events
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

                            <div className="mt-5 rounded-4">

                                <div className="mb-4">

                                    <h3>
                                        Event Information
                                    </h3>

                                    <p className="text-muted mb-0">
                                        Fill in the details below to publish a new village event.
                                    </p>

                                </div>

                                <form onSubmit={handleSubmit}>

                                    <div className="row gy-4">

                                        {/* Title */}

                                        <div className="col-12">

                                            <label className="form-label">
                                                Event Title
                                            </label>

                                            <input
                                                type="text"
                                                className="form-control"
                                                name="title"
                                                placeholder="Enter Event Title"
                                                value={event.title}
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
                                                placeholder="Describe the event..."
                                                value={event.description}
                                                onChange={handleChange}
                                                required
                                            ></textarea>

                                        </div>

                                        {/* Location */}

                                        <div className="col-md-6">

                                            <label className="form-label">
                                                Location
                                            </label>

                                            <input
                                                type="text"
                                                className="form-control"
                                                name="location"
                                                placeholder="Enter Event Location"
                                                value={event.location}
                                                onChange={handleChange}
                                                required
                                            />

                                        </div>

                                        {/* Event Date */}

                                        <div className="col-md-6">

                                            <label className="form-label">
                                                Event Date
                                            </label>

                                            <input
                                                type="date"
                                                className="form-control"
                                                name="eventDate"
                                                value={event.eventDate}
                                                onChange={handleChange}
                                                required
                                            />

                                        </div>

                                        {/* Status */}

                                        <div className="col-md-6">

                                            <label className="form-label">
                                                Event Status
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

                                                Publish Event

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
