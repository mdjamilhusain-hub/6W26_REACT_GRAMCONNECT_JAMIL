import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { PacmanLoader } from "react-spinners";
import UserService from "../../../services/UserService";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function UpdateProfile() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const userId = localStorage.getItem("id");

  async function fetchProfile() {
    try {
      setLoading(true);
      const res = await UserService.single(userId);
      if (res) {
        setProfile({
          name: res.name || "",
          phone: res.phone || "",
          address: res.address || "",
        });
      }
    } catch (err) {
      console.log(err);
      toast.error("Unable to load profile");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (userId) {
      fetchProfile();
    }
  }, []);

  function handleChange(e) {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setSaving(true);
      await UserService.update(profile, userId);
      toast.success("Profile updated successfully");
    } catch (err) {
      console.log(err);
      toast.error("Unable to update profile");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="main">

      {/* Page Title */}
      <div
        className="page-title dark-background"
        style={{ backgroundImage: "url(assets/img/page-title-bg.webp)" }}
      >
        <div className="container position-relative">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1>Update Profile</h1>
              <nav className="breadcrumbs">
                <ol>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li className="current">Update Profile</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <section className="contact section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">

              {loading ? (
                <PacmanLoader
                  color="#81C408"
                  loading={loading}
                  cssOverride={override}
                  size={50}
                />
              ) : (
                <div className="mt-5 rounded-4">

                  <div className="mb-4">
                    <h3>My Profile</h3>
                    <p className="text-muted mb-0">
                      Update your personal information below.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="row gy-4">

                      {/* Name */}
                      <div className="col-12">
                        <label className="form-label">Full Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          placeholder="Enter your full name"
                          value={profile.name}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      {/* Phone */}
                      <div className="col-md-6">
                        <label className="form-label">Phone Number</label>
                        <input
                          type="text"
                          className="form-control"
                          name="phone"
                          placeholder="Enter your phone number"
                          value={profile.phone}
                          onChange={handleChange}
                        />
                      </div>

                      {/* Address */}
                      <div className="col-md-6">
                        <label className="form-label">Address</label>
                        <input
                          type="text"
                          className="form-control"
                          name="address"
                          placeholder="Enter your address"
                          value={profile.address}
                          onChange={handleChange}
                        />
                      </div>

                      {/* Submit */}
                      <div className="col-12 text-center mt-3">
                        <button
                          type="submit"
                          className="btn btn-success rounded-pill px-5 py-2"
                          disabled={saving}
                        >
                          <i className="bi bi-save me-2"></i>
                          {saving ? "Saving..." : "Save Changes"}
                        </button>
                      </div>

                    </div>
                  </form>

                </div>
              )}

            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
