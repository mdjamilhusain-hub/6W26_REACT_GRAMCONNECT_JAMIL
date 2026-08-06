import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { PacmanLoader } from "react-spinners";
import Swal from "sweetalert2";
import EventService from "../../../services/EventService";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function ManageEvents() {
  let [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);

  async function fetchEvents() {
    try {
      setLoading(true);
      let res = await EventService.all();
      setEvents(res);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  async function deleteEvent(id) {
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
          EventService.deleteEvent(id).then(() => {
            fetchEvents();
            Swal.fire({
              title: "Deleted!",
              text: "Event has been deleted.",
              icon: "success",
            });
          });
        }
      });
    } catch (err) {
      toast.error("Error Deleting Event");
      console.log("Error: ", err);
    }
  }

  return (
    <>
      <main className="main">
        {/* Page Title */}
        <div
          className="page-title dark-background"
          style={{ backgroundImage: "url(assets/img/page-title-bg.webp)" }}
        >
          <div className="container position-relative">
            <div className="row align-items-center gy-3">
              <div className="col-lg-12">
                <h1 className="mb-2">Manage Events</h1>
                <nav className="breadcrumbs">
                  <ol>
                    <li>
                      <Link to="/admin">Dashboard</Link>
                    </li>
                    <li className="current">Events</li>
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
              <h3>Village Events</h3>
              <Link to="/admin/event/add" className="btn btn-success">
                Add New Event
              </Link>
            </div>
            <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th scope="col">Sr. No.</th>
                    <th scope="col">Title</th>
                    <th scope="col">Location</th>
                    <th scope="col">Event Date</th>
                    <th scope="col">Status</th>
                    <th scope="col">Created At</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event, index) => (
                    <tr key={event.id}>
                      <td>{index + 1}</td>
                      <td>{event.title}</td>
                      <td>{event.location}</td>
                      <td>{event.eventDate}</td>
                      <td>{event.status}</td>
                      <td>{new Date(event.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button
                          onClick={() => {
                            deleteEvent(event.id);
                          }}
                          className="btn btn-sm btn-danger"
                        >
                          <i className="bi bi-trash" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {events.length === 0 && (
                    <tr>
                      <td colSpan="7" className="text-center">
                        No Events Found
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