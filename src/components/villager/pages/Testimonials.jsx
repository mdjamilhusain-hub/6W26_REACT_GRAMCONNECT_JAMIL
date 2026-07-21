export default function Testimonials (){
    return(
        <>
        
        <main className="main">
  {/* Page Title */}
  <div
    className="page-title dark-background"
    data-aos="fade"
    style={{ backgroundImage: "url(assets/img/page-title-bg.webp)" }}
  >
    <div className="container position-relative">
      <h1>Testimonials</h1>
      <p>Home / Testimonials</p>
      <nav className="breadcrumbs">
        <ol>
          <li>
            <a href="index.html">Home</a>
          </li>
          <li className="current">Testimonials</li>
        </ol>
      </nav>
    </div>
  </div>
  {/* End Page Title */}
  {/* Testimonials Section */}
  <section className="testimonials-12 testimonials section" id="testimonials">
    {/* Section Title */}
    <div className="container section-title" data-aos="fade-up">
      <h2>TESTIMONIALS</h2>
      <p>Necessitatibus eius consequatur</p>
    </div>
    {/* End Section Title */}
    <div className="testimonial-wrap">
      <div className="container">
        <div className="row">
          <div className="col-md-6 mb-4 mb-md-4">
            <div className="testimonial">
              <img
                src="assets/img/testimonials/testimonials-1.jpg"
                alt="Testimonial author"
              />
              <blockquote>
                <p>
                  “Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Provident deleniti iusto molestias, dolore vel fugiat ab
                  placeat ea?”
                </p>
              </blockquote>
              <p className="client-name">James Smith</p>
            </div>
          </div>
          <div className="col-md-6 mb-4 mb-md-4">
            <div className="testimonial">
              <img
                src="assets/img/testimonials/testimonials-2.jpg"
                alt="Testimonial author"
              />
              <blockquote>
                <p>
                  “Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Provident deleniti iusto molestias, dolore vel fugiat ab
                  placeat ea?”
                </p>
              </blockquote>
              <p className="client-name">Kate Smith</p>
            </div>
          </div>
          <div className="col-md-6 mb-4 mb-md-4">
            <div className="testimonial">
              <img
                src="assets/img/testimonials/testimonials-3.jpg"
                alt="Testimonial author"
              />
              <blockquote>
                <p>
                  “Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Provident deleniti iusto molestias, dolore vel fugiat ab
                  placeat ea?”
                </p>
              </blockquote>
              <p className="client-name">Claire Anderson</p>
            </div>
          </div>
          <div className="col-md-6 mb-4 mb-md-4">
            <div className="testimonial">
              <img
                src="assets/img/testimonials/testimonials-4.jpg"
                alt="Testimonial author"
              />
              <blockquote>
                <p>
                  “Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Provident deleniti iusto molestias, dolore vel fugiat ab
                  placeat ea?”
                </p>
              </blockquote>
              <p className="client-name">Dan Smith</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* /Testimonials Section */}
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