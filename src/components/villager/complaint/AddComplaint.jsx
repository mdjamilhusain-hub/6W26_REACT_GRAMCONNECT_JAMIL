import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import ComplaintService from "../../../services/ComplaintService";
import CategoryService from "../../../services/CategoryService";
import CloudinaryService from "../../../services/CloudinaryService";

export default function AddComplaint() {

    const [categories, setCategories] = useState([]);

    const [categoryId, setCategoryId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [priority, setPriority] = useState("Low");
    const [image, setImage] = useState(null);

    const nav = useNavigate();

    const userId = localStorage.getItem("id");

    useEffect(() => {

        fetchCategories();

    }, []);

    useEffect(() => {

    const userId = localStorage.getItem("id");

    if (!userId) {

        toast.error("Please login first");

        nav("/login");

        return;

    }

    fetchCategories();

}, []);

    async function fetchCategories() {

        try {

            const res = await CategoryService.all();

            setCategories(res);

        } catch (err) {

            console.log(err);

            toast.error("Unable to fetch categories");

        }

    }

    async function addComplaint(e) {

        e.preventDefault();

        try {

            if (!userId) {

                toast.error("Please login to continue");

                nav("/login");

                return;

            }

            let imageURL = "";

            if (image) {

                imageURL = await CloudinaryService.upload(image);

            }

            const payload = {

                userId,

                categoryId,

                title,

                description,

                location,

                priority,

                image: imageURL,

                complaintStatus: "Pending",

                createdAt: Date.now(),
                updatedAt: ""

            };

            await ComplaintService.add(payload);

            toast.success("Complaint submitted successfully");

            nav("/complaints");

        } catch (err) {

            console.log(err);

            toast.error("Unable to submit complaint");

        }

    }

    return (

        <main className="main">

            <div
                className="page-title dark-background"
                style={{
                    backgroundImage:
                        "url(assets/img/page-title-bg.webp)"
                }}
            >

                <div className="container position-relative">

                    <div className="d-flex justify-content-between align-items-center">

                        <div>

                            <h1>

                                Add Complaint

                            </h1>

                            <nav className="breadcrumbs">

                                <ol>

                                    <li>

                                        <Link to="/">

                                            Home

                                        </Link>

                                    </li>

                                    <li className="current">

                                        Add Complaint

                                    </li>

                                </ol>

                            </nav>

                        </div>

                        <Link
                            to="/complaints"
                            className="btn btn-success rounded-pill px-4 py-2"
                        >

                            <i className="bi bi-list me-2"></i>

                            View Complaints

                        </Link>

                    </div>

                </div>

            </div>

            <section className="contact section">

                <div className="container">

                    <div className="row justify-content-center">

                        <div className="col-lg-8">

                            <form
                                className="php-email-form mt-4"
                                onSubmit={addComplaint}
                            >

                                <div className="row gy-3">

                                    <div className="col-md-6">

                                        <select
                                            className="form-control"
                                            value={categoryId}
                                            onChange={(e) =>
                                                setCategoryId(
                                                    e.target.value
                                                )
                                            }
                                            required
                                        >

                                            <option value="">

                                                Select Category

                                            </option>

                                            {categories.map((cat) => (

                                                <option
                                                    key={cat.id}
                                                    value={cat.id}
                                                >

                                                    {cat.name}

                                                </option>

                                            ))}

                                        </select>

                                    </div>

                                    <div className="col-md-6">

                                        <select
                                            className="form-control"
                                            value={priority}
                                            onChange={(e) =>
                                                setPriority(
                                                    e.target.value
                                                )
                                            }
                                        >

                                            <option value="Low">

                                                Low

                                            </option>

                                            <option value="Medium">

                                                Medium

                                            </option>

                                            <option value="High">

                                                High

                                            </option>

                                        </select>

                                    </div>

                                    <div className="col-12">

                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Complaint Title"
                                            value={title}
                                            onChange={(e) =>
                                                setTitle(
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />

                                    </div>

                                    <div className="col-12">

                                        <textarea
                                            className="form-control"
                                            rows="5"
                                            placeholder="Describe your complaint"
                                            value={description}
                                            onChange={(e) =>
                                                setDescription(
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />

                                    </div>

                                    <div className="col-12">

                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Complaint Location"
                                            value={location}
                                            onChange={(e) =>
                                                setLocation(
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />

                                    </div>

                                    <div className="col-12">

                                        <input
                                            type="file"
                                            className="form-control"
                                            accept="image/*"
                                            onChange={(e) =>
                                                setImage(
                                                    e.target.files[0]
                                                )
                                            }
                                        />

                                    </div>

                                    <div className="text-center mt-3">

                                        <button type="submit">

                                            Submit Complaint

                                        </button>

                                    </div>

                                </div>

                            </form>

                        </div>

                    </div>

                </div>

            </section>

        </main>

    );

}