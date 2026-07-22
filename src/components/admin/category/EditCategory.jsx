import { useEffect, useState } from "react";
import CategoryService from "../../../services/CategoryService";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditCategory() {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const nav = useNavigate();
    const params = useParams();

    async function getCategoryById(id) {
        try {
            const response = await CategoryService.single(params.id);
            setName(response.name);
            setDescription(response.description);
        } catch (error) {
            toast.error("Failed to fetch category");
        }
    }

    useEffect(() => {
        getCategoryById(params.id);
    }, [params.id]);

    async function editCategory(e) {
        e.preventDefault();
        try {
            let data = {
                name: name,
                description: description
            }
            await CategoryService.update(data, params.id);
            toast.success("Category Updated Successfully");
            nav("/admin/categories");
        } catch (error) {
            toast.error("Failed to update category");
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
                        <h1>Edit Category</h1>
                        <nav className="breadcrumbs">
                            <ol>
                                <li>
                                    <a href="index.html">Home</a>
                                </li>
                                <li className="current">Edit Category</li>
                            </ol>
                        </nav>
                    </div>

                    <Link
                        to="/admin/categories" className="btn btn-success text-white rounded-pill px-4 py-2 mt-2"
                    >
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
                                    onSubmit={editCategory}
                                >
                                    <div className="row ">
                                        <div className="col-md-12 form-group">
                                            <input
                                                type="text"
                                                name="name"
                                                className="form-control"
                                                id="name"
                                                value={name}
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
                                            value={description}
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