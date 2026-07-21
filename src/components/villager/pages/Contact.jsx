export default function Contact(){
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
      <h1>Contact</h1>
      <p>Home / Contact</p>
      <nav className="breadcrumbs">
        <ol>
          <li>
            <a href="index.html">Home</a>
          </li>
          <li className="current">Contact</li>
        </ol>
      </nav>
    </div>
  </div>
  {/* End Page Title */}
  {/* Contact Section */}
  <section id="contact" className="contact section">
    <div className="mb-5">
      <iframe
        style={{ width: "100%", height: 400 }}
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12097.433213460943!2d-74.0062269!3d40.7101282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb89d1fe6bc499443!2sDowntown+Conference+Center!5e0!3m2!1smk!2sbg!4v1539943755621"
        frameBorder={0}
        allowFullScreen=""
      />
    </div>
    {/* End Google Maps */}
    <div className="container" data-="fade">
      <div className="row gy-5 gx-lg-5">
        <div className="col-lg-4">
          <div className="info">
            <h3>Get in touch</h3>
            <p>
              Et id eius voluptates atque nihil voluptatem enim in tempore
              minima sit ad mollitia commodi minus.
            </p>
            <div className="info-item d-flex">
              <i className="bi bi-geo-alt flex-shrink-0" />
              <div>
                <h4>Location:</h4>
                <p>A108 Adam Street, New York, NY 535022</p>
              </div>
            </div>
            {/* End Info Item */}
            <div className="info-item d-flex">
              <i className="bi bi-envelope flex-shrink-0" />
              <div>
                <h4>Email:</h4>
                <p>info@example.com</p>
              </div>
            </div>
            {/* End Info Item */}
            <div className="info-item d-flex">
              <i className="bi bi-phone flex-shrink-0" />
              <div>
                <h4>Call:</h4>
                <p>+1 5589 55488 55</p>
              </div>
            </div>
            {/* End Info Item */}
          </div>
        </div>
        <div className="col-lg-8">
          <form
            action="forms/contact.php"
            method="post"
            role="form"
            className="php-email-form"
          >
            <div className="row">
              <div className="col-md-6 form-group">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  id="name"
                  placeholder="Your Name"
                  required=""
                />
              </div>
              <div className="col-md-6 form-group mt-3 mt-md-0">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  id="email"
                  placeholder="Your Email"
                  required=""
                />
              </div>
            </div>
            <div className="form-group mt-3">
              <input
                type="text"
                className="form-control"
                name="subject"
                id="subject"
                placeholder="Subject"
                required=""
              />
            </div>
            <div className="form-group mt-3">
              <textarea
                className="form-control"
                name="message"
                placeholder="Message"
                required=""
                defaultValue={""}
              />
            </div>
            <div className="my-3">
              <div className="loading">Loading</div>
              <div className="error-message" />
              <div className="sent-message">
                Your message has been sent. Thank you!
              </div>
            </div>
            <div className="text-center">
              <button type="submit">Send Message</button>
            </div>
          </form>
        </div>
        {/* End Contact Form */}
      </div>
    </div>
  </section>
  {/* /Contact Section */}
  {/* Call To Action Section */}
  <section
    id="call-to-action"
    className="call-to-action section light-background"
  >
    <div className="content">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <h3>Subscribe To Our Newsletter</h3>
            <p className="opacity-50">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt,
              reprehenderit!
            </p>
          </div>
          <div className="col-lg-6">
            <form
              action="forms/newsletter.php"
              className="form-subscribe php-email-form"
            >
              <div className="form-group d-flex align-items-stretch">
                <input
                  type="email"
                  name="email"
                  className="form-control h-100"
                  placeholder="Enter your e-mail"
                />
                <input
                  type="submit"
                  className="btn btn-secondary px-4"
                  defaultValue="Subcribe"
                />
              </div>
              <div className="loading">Loading</div>
              <div className="error-message" />
              <div className="sent-message">
                Your subscription request has been sent. Thank you!
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* /Call To Action Section */}
</main>

        </>
    )
}