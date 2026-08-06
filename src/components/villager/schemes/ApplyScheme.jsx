import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import GovernmentSchemeService from "../../../services/GovernmentSchemeService";
import SchemeApplicationService from "../../../services/SchemeApplicationService";
import CloudinaryService from "../../../services/CloudinaryService";

export default function ApplyScheme() {
  const { id } = useParams(); // Scheme ID
  const nav = useNavigate();
  const userId = localStorage.getItem("id");

  const [scheme, setScheme] = useState(null);
  const [documentFile, setDocumentFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!userId) {
      toast.error("Please login first to apply for a scheme");
      nav("/login");
      return;
    }
    fetchScheme();
  }, [id]);

  async function fetchScheme() {
    try {
      const res = await GovernmentSchemeService.single(id);
      if (res) {
        setScheme(res);
      } else {
        toast.error("Scheme not found");
        nav("/schemes");
      }
    } catch (err) {
      console.log(err);
      toast.error("Unable to fetch scheme details");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!documentFile) {
      toast.error("Please upload the required document");
      return;
    }

    try {
      setIsSubmitting(true);
      
      let documentUrl = "";
      if (documentFile) {
        documentUrl = await CloudinaryService.upload(documentFile);
      }

      const payload = {
        userId,
        schemeId: id,
        documentUrl,
      };

      await SchemeApplicationService.add(payload);
      toast.success("Application submitted successfully");
      nav("/my-scheme-applications");
    } catch (err) {
      console.log(err);
      toast.error("Unable to submit application");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="main">
      <div
        className="page-title dark-background"
        style={{
          backgroundImage: "url(/assets/img/page-title-bg.webp)",
        }}
      >
        <div className="container position-relative">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1>Apply for Scheme</h1>
              <nav className="breadcrumbs">
                <ol>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/schemes">Schemes</Link>
                  </li>
                  <li className="current">Apply</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <section className="contact section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              {scheme && (
                <div className="mb-4 p-4 shadow rounded bg-light">
                  <h4>Applying for: {scheme.title}</h4>
                  <p><strong>Eligibility:</strong> {scheme.eligibility}</p>
                </div>
              )}
              
              <form className="php-email-form mt-4" onSubmit={handleSubmit}>
                <div className="row gy-3">
                  <div className="col-12">
                    <label className="form-label fw-bold">Upload Required Documents (PDF/Image)</label>
                    <input
                      type="file"
                      className="form-control"
                      accept=".pdf, image/*"
                      onChange={(e) => setDocumentFile(e.target.files[0])}
                      required
                    />
                    <small className="text-muted">Please upload proof of eligibility or other required documents.</small>
                  </div>
                  
                  <div className="text-center mt-4">
                    <button type="submit" disabled={isSubmitting} className="btn btn-success px-5 py-2 rounded-pill">
                      {isSubmitting ? "Submitting..." : "Submit Application"}
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
