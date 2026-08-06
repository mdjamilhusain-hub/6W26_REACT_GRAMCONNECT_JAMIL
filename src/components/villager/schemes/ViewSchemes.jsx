import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { PacmanLoader } from "react-spinners";
import GovernmentSchemeService from "../../../services/GovernmentSchemeService";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function ViewSchemes() {
  const [loading, setLoading] = useState(false);
  const [schemes, setSchemes] = useState([]);

  async function fetchSchemes() {
    try {
      setLoading(true);
      const res = await GovernmentSchemeService.all();
      setSchemes(res);
    } catch (err) {
      console.log(err);
      toast.error("Unable to fetch schemes");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSchemes();
  }, []);

  return (
    <main className="main">
      <div
        className="page-title dark-background"
        style={{ backgroundImage: "url(assets/img/page-title-bg.webp)" }}
      >
        <div className="container position-relative">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1>Government Schemes</h1>
              <nav className="breadcrumbs">
                <ol>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li className="current">Government Schemes</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <section className="services section">
        <div className="container">
          <div className="section-title text-center">
            <h2>Schemes</h2>
            <p>Browse and apply for the latest Government Schemes</p>
          </div>
          {loading ? (
            <PacmanLoader
              color="#81C408"
              loading={loading}
              cssOverride={override}
              size={50}
            />
          ) : (
            <div className="row gy-4">
              {schemes.map((scheme) => (
                <div
                  className="col-lg-6 col-md-6"
                  key={scheme.id}
                >
                  <div className="service-item position-relative shadow rounded p-4 h-100">
                    <div className="icon mb-3">
                      <i className="bi bi-file-earmark-text" style={{ fontSize: "2rem", color: "#81C408" }}></i>
                    </div>
                    <h3>{scheme.title}</h3>
                    <p>
                      <strong>Description:</strong> {scheme.description}
                    </p>
                    <p>
                      <strong>Eligibility:</strong> {scheme.eligibility}
                    </p>
                    <p>
                      <strong>Benefits:</strong> {scheme.benefits}
                    </p>
                    <p className="text-danger">
                      <strong>Last Date:</strong> {new Date(scheme.lastDate).toLocaleDateString()}
                    </p>
                    <Link
                      to={`/apply-scheme/${scheme.id}`}
                      className="btn btn-success mt-3"
                    >
                      Apply Now
                    </Link>
                  </div>
                </div>
              ))}
              {schemes.length === 0 && (
                <div className="col-12 text-center">
                  <p>No schemes available at the moment.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
