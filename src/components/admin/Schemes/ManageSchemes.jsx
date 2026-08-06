import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { PacmanLoader } from "react-spinners";
import Swal from "sweetalert2";
import GovernmentSchemeService from "../../../services/GovernmentSchemeService";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function ManageSchemes() {
  let [loading, setLoading] = useState(false);
  const [schemes, setSchemes] = useState([]);

  async function fetchSchemes() {
    try {
      setLoading(true);
      let res = await GovernmentSchemeService.all();
      setSchemes(res);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSchemes();
  }, []);

  async function deleteScheme(id) {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          GovernmentSchemeService.deleteScheme(id).then(() => {
            fetchSchemes();
            Swal.fire({
              title: "Deleted!",
              text: "Scheme has been deleted.",
              icon: "success",
            });
          });
        }
      });
    } catch (err) {
      toast.error("Error Deleting Scheme");
      console.log("Error: ", err);
    }
  }

  return (
    <>
      <main className="main">
        {/* Page Title */}
       
    <div
        className="page-title dark-background"
        style={{
            backgroundImage: "url(assets/img/page-title-bg.webp)"
        }}
    >
        <div className="container position-relative">

            <div className="row align-items-center gy-3">

                <div className="col-lg-12">

                    <h1 className="mb-2">
                        All Government Schemes
                    </h1>

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

            </div>

        </div>
    </div>
      </main>

      {loading ? (
        <PacmanLoader
          color="#81C408"
          loading={loading}
          cssOverride={override}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <div className="container-fluid pb-5">
          <div className="container py-5">
            <div className="d-flex justify-content-between mb-4">
              <h3>Government Schemes</h3>
              <Link to="/admin/governmentScheme/add" className="btn btn-success">
                Add New Scheme
              </Link>
            </div>
            <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th scope="col">Sr. No.</th>
                    <th scope="col">Title</th>
                    <th scope="col">Last Date</th>
                    <th scope="col">Status</th>
                    <th scope="col">Created At</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {schemes.map((scheme, index) => (
                    <tr key={scheme.id}>
                      <td>{index + 1}</td>
                      <td>{scheme.title}</td>
                      <td>{scheme.lastDate}</td>
                      <td>{scheme.status}</td>
                      <td>{new Date(scheme.createdAt).toLocaleDateString()}</td>
                      <td>
                        <Link to={`/admin/scheme-applications/${scheme.id}`} className="btn btn-sm btn-info me-2 text-white">
                          <i className="bi bi-eye" /> Applications
                        </Link>
                        <button
                          onClick={() => {
                            deleteScheme(scheme.id);
                          }}
                          className="btn btn-sm btn-danger"
                        >
                          <i className="bi bi-trash" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {schemes.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No Schemes Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
