import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { PacmanLoader } from "react-spinners";
import EventService from "../../../services/EventService";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function ViewEvents() {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);

  async function fetchEvents() {
    try {
      setLoading(true);
      const res = await EventService.all();
      setEvents(res);
    } catch (err) {
      console.log(err);
      toast.error("Unable to fetch events");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEvents();
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
              <h1>Village Events</h1>
              <nav className="breadcrumbs">
                <ol>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li className="current">Events</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <section className="services section">
        <div className="container">
          <div className="section-title text-center">
            <h2>Upcoming Events</h2>
            <p>Stay updated with the latest village events and activities</p>
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
              {events.map((event) => (
                <div className="col-lg-6 col-md-6" key={event.id}>
                  <div className="service-item position-relative shadow rounded p-4 h-100">
                    <div className="icon mb-3">
                      <i
                        className="bi bi-calendar-event"
                        style={{ fontSize: "2rem", color: "#81C408" }}
                      ></i>
                    </div>
                    <h3>{event.title}</h3>
                    <p>
                      <strong>Description:</strong> {event.description}
                    </p>
                    <p>
                      <strong>Location:</strong> {event.location}
                    </p>
                    <p className="text-danger">
                      <strong>Date:</strong>{" "}
                      {new Date(event.eventDate).toLocaleDateString()}
                    </p>
                    <span className="badge bg-success">{event.status}</span>
                  </div>
                </div>
              ))}
              {events.length === 0 && (
                <div className="col-12 text-center">
                  <p>No events available at the moment.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
