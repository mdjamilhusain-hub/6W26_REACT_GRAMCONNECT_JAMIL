import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FadeLoader, PacmanLoader } from "react-spinners";
import Swal from "sweetalert2";
import CategoryService from "../../../services/CategoryService";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};



export default function ManageCategories() {

  let [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState([]);

  async function fetchCategories() {
    try {
      setLoading(true)
      let res = await CategoryService.all()
      setCategories(res)
    } catch (err) {
      console.log(err)
    }
    finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    fetchCategories();
  }, [])


  async function deleteCategory(id) {

    const result = await Swal.fire({

      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"

    });

    if (!result.isConfirmed) {
      return;
    }

    try {

      await CategoryService.deleteCat(id);

      toast.success("Category deleted");

      fetchCategories();

    } catch (err) {

      console.log(err);

      toast.error("Error deleting category");

    }

  }

  return (
    <>

      <main className="main">

        <div
          className="page-title dark-background"
          style={{
            backgroundImage: "url(assets/img/page-title-bg.webp)"
          }}
        >

          <div className="container position-relative">

            <div className="d-flex justify-content-between align-items-center">

              <div>

                <h1>

                  All Categories

                </h1>

                <nav className="breadcrumbs">

                  <ol>

                    <li>

                      <Link to="/">

                        Home

                      </Link>

                    </li>

                    <li className="current">

                      All Categories

                    </li>

                  </ol>

                </nav>

              </div>

              <Link
                to="/complaints"
                className="btn btn-success rounded-pill px-4 py-2"
              >

                <i className="bi bi-plus-circle me-2"></i>

                Add Category

              </Link>

            </div>

          </div>
        </div>

      </main>

      {loading ?
        <FadeLoader
          color="#81C408"
          loading={loading}
          cssOverride={override}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />

        : <div className="container-fluid py-5">
          <div className="container py-5">
            <div className="table-responsive">
              <table className="table">

                <thead>
                  <tr>
                    <th>Sr. No.</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Created At</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {categories.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center py-5">
                        No categories found.
                      </td>
                    </tr>
                  )}
                  {categories.map((category, index) => (
                    <tr key={category.id}>
                      <td>
                        <p className="mb-0 mt-4">
                          {index + 1}
                        </p>
                      </td>
                      <td>
                        <p className="mb-0 mt-4">
                          {category.name}
                        </p>
                      </td>
                      <td>
                        <p className="mb-0 mt-4">
                          {category.description}
                        </p>
                      </td>
                      <td>
                        <span
                          className={`badge mt-4 ${category.status
                            ? "bg-success"
                            : "bg-danger"
                            }`}
                        >
                          {category.status
                            ? "Active"
                            : "Inactive"}
                        </span>
                      </td>
                      <td>
                        <p className="mb-0 mt-4">
                          {new Date(
                            category.createdAt
                          ).toLocaleDateString()}
                        </p>
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <Link
                            to={`/admin/category/edit/${category.id}`}
                            className="btn btn-md rounded-circle bg-light border mt-4"
                          >
                            <i className="bi bi-pencil text-primary" />
                          </Link>
                          <button
                            onClick={() =>
                              deleteCategory(category.id)
                            }
                            className="btn btn-md rounded-circle bg-light border mt-4"
                          >
                            <i className="bi bi-trash text-danger" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>}
    </>
  )
}