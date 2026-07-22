import { useState } from "react";
import CategoryService from "../../../services/CategoryService";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

export default function AddCategory() {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const nav = useNavigate();

    async function addCategory(e) {
        e.preventDefault();
        try {
            let data = {
                name: name,
                description: description
            }
            await CategoryService.add(data);
            toast.success("Category Added Successfully");
            nav("/admin/categories");
        } catch (error) {
            toast.error("Failed to add category");
        }
    }

    return (
        <>

            <main className="main">
                {/* Page Title */}
                <div
                    className="page-title dark-background"
                    data-="fade"
                    style={{ backgroundImage: "url(assets/img/page-title-bg.webp)" }}
                >
                    <div className="container position-relative">
                        <h1>Add Category</h1>
                        <nav className="breadcrumbs">
                            <ol>
                                <li>
                                    <a href="index.html">Home</a>
                                </li>
                                <li className="current">Add Category</li>
                            </ol>
                        </nav>
                    </div>

                    <Link
                        to="/admin/categories" className="btn btn-success rounded-pill px-4 py-2"
                    >
                        <i className="bi bi-list me-2"></i>
                        View Categories
                    </Link>

                </div>
                {/* End Page Title */}
                {/* Add Category Section */}
                <section id="contact" className="contact section">
                    <div className="container" data-="fade">
                        <div className="row justify-content-center">

                            <div className="col-lg-8">
                                <form
                                    className="php-email-form mt-4"
                                    onSubmit={addCategory}
                                >
                                    <div className="row ">
                                        <div className="col-md-12 form-group">
                                            <input
                                                type="text"
                                                name="name"
                                                className="form-control"
                                                id="name"
                                                placeholder="Category Name"
                                                required=""
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>

                                    </div>
                                    <div className="form-group mt-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="description"
                                            id="description"
                                            placeholder="Category Description"
                                            required=""
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </div>

                                    <div className="text-center mt-3">
                                        <button type="submit">Add Category</button>
                                    </div>
                                </form>
                            </div>
                            {/* End Contact Form */}
                        </div>
                    </div>
                </section>
                {/* /Contact Section */}
            </main>

        </>
    )
}