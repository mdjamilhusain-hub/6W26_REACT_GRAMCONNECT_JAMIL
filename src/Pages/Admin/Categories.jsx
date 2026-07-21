import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../../firebase/FirebaseConfig";

import Swal from "sweetalert2";
import { toast } from "react-toastify";

function Categories() {
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "Active",
  });

  const [editId, setEditId] = useState(null);

  // ===========================
  // Fetch Categories
  // ===========================

  const fetchCategories = async () => {
    const querySnapshot = await getDocs(collection(db, "categories"));

    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ===========================
  // Handle Input
  // ===========================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ===========================
  // Save Category
  // ===========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.name === "") {
      toast.error("Category Name Required");
      return;
    }

    try {
      if (editId) {
        await updateDoc(doc(db, "categories", editId), {
          ...formData,
        });

        toast.success("Category Updated");
      } else {
        await addDoc(collection(db, "categories"), {
          ...formData,
          createdAt: serverTimestamp(),
        });

        toast.success("Category Added");
      }

      setFormData({
        name: "",
        description: "",
        status: "Active",
      });

      setEditId(null);

      fetchCategories();
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ===========================
  // Edit Category
  // ===========================

  const handleEdit = (item) => {
    setFormData({
      name: item.name,
      description: item.description,
      status: item.status,
    });

    setEditId(item.id);
  };

  // ===========================
  // Delete Category
  // ===========================

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Category?",
      text: "You won't be able to recover it.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(doc(db, "categories", id));

        toast.success("Category Deleted");

        fetchCategories();
      }
    });
  };

  return (
    <div className="container mt-4">

      <div className="card shadow">

        <div className="card-header bg-success text-white">
          <h3>Manage Categories</h3>
        </div>

        <div className="card-body">

          <form onSubmit={handleSubmit}>

            <div className="row">

              <div className="col-md-4 mb-3">
                <label>Category Name</label>

                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4 mb-3">
                <label>Description</label>

                <input
                  type="text"
                  className="form-control"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-2 mb-3">
                <label>Status</label>

                <select
                  className="form-select"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>

              <div className="col-md-2 d-grid mt-4">

                <button className="btn btn-success">

                  {editId ? "Update" : "Add"}

                </button>

              </div>

            </div>

          </form>

        </div>

      </div>

      <div className="card shadow mt-4">

        <div className="card-header bg-dark text-white">

          <h4>Category List</h4>

        </div>

        <div className="card-body">

          <table className="table table-bordered table-hover">

            <thead className="table-success">

              <tr>

                <th>#</th>

                <th>Name</th>

                <th>Description</th>

                <th>Status</th>

                <th width="180">Action</th>

              </tr>

            </thead>

            <tbody>

              {categories.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    No Categories Found
                  </td>
                </tr>
              ) : (
                categories.map((item, index) => (
                  <tr key={item.id}>

                    <td>{index + 1}</td>

                    <td>{item.name}</td>

                    <td>{item.description}</td>

                    <td>
                      <span
                        className={`badge ${
                          item.status === "Active"
                            ? "bg-success"
                            : "bg-danger"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td>

                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>

                    </td>

                  </tr>
                ))
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Categories;