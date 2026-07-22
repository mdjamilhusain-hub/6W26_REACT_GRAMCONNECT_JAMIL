export default function Blog (){
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
      <h1>Blog</h1>
      <p>Home / Blog</p>
      <nav className="breadcrumbs">
        <ol>
          <li>
            <a href="index.html">Home</a>
          </li>
          <li className="current">Blog</li>
        </ol>
      </nav>
    </div>
  </div>
  {/* End Page Title */}
  {/* Blog Posts 2 Section */}
  <section id="blog-posts-2" className="blog-posts-2 section">
    <div className="container">
      <div className="row gy-4">
        <div className="col-lg-4">
          <article className="position-relative h-100">
            <div className="post-img position-relative overflow-hidden">
              <img
                src="assets/img/blog/blog-1.jpg"
                className="img-fluid"
                alt=""
              />
            </div>
            <div className="meta d-flex align-items-end">
              <span className="post-date">
                <span>12</span>December
              </span>
              <div className="d-flex align-items-center">
                <i className="bi bi-person" />{" "}
                <span className="ps-2">John Doe</span>
              </div>
              <span className="px-3 text-black-50">/</span>
              <div className="d-flex align-items-center">
                <i className="bi bi-folder2" />{" "}
                <span className="ps-2">Politics</span>
              </div>
            </div>
            <div className="post-content d-flex flex-column">
              <h3 className="post-title">
                Dolorum optio tempore voluptas dignissimos
              </h3>
              <a href="blog-details.html" className="readmore stretched-link">
                <span>Read More</span>
                <i className="bi bi-arrow-right" />
              </a>
            </div>
          </article>
        </div>
        {/* End post list item */}
        <div className="col-lg-4">
          <article className="position-relative h-100">
            <div className="post-img position-relative overflow-hidden">
              <img
                src="assets/img/blog/blog-2.jpg"
                className="img-fluid"
                alt=""
              />
            </div>
            <div className="meta d-flex align-items-end">
              <span className="post-date">
                <span>19</span>March
              </span>
              <div className="d-flex align-items-center">
                <i className="bi bi-person" />{" "}
                <span className="ps-2">Julia Parker</span>
              </div>
              <span className="px-3 text-black-50">/</span>
              <div className="d-flex align-items-center">
                <i className="bi bi-folder2" />{" "}
                <span className="ps-2">Economics</span>
              </div>
            </div>
            <div className="post-content d-flex flex-column">
              <h3 className="post-title">
                Nisi magni odit consequatur autem nulla dolorem
              </h3>
              <a href="blog-details.html" className="readmore stretched-link">
                <span>Read More</span>
                <i className="bi bi-arrow-right" />
              </a>
            </div>
          </article>
        </div>
        {/* End post list item */}
        <div className="col-lg-4">
          <article className="position-relative h-100">
            <div className="post-img position-relative overflow-hidden">
              <img
                src="assets/img/blog/blog-3.jpg"
                className="img-fluid"
                alt=""
              />
            </div>
            <div className="meta d-flex align-items-end">
              <span className="post-date">
                <span>24</span>June
              </span>
              <div className="d-flex align-items-center">
                <i className="bi bi-person" />{" "}
                <span className="ps-2">Maria Doe</span>
              </div>
              <span className="px-3 text-black-50">/</span>
              <div className="d-flex align-items-center">
                <i className="bi bi-folder2" />{" "}
                <span className="ps-2">Sports</span>
              </div>
            </div>
            <div className="post-content d-flex flex-column">
              <h3 className="post-title">
                Possimus soluta ut id suscipit ea ut. In quo quia et soluta
                libero sit sint.
              </h3>
              <a href="blog-details.html" className="readmore stretched-link">
                <span>Read More</span>
                <i className="bi bi-arrow-right" />
              </a>
            </div>
          </article>
        </div>
        {/* End post list item */}
        <div className="col-lg-4">
          <article className="position-relative h-100">
            <div className="post-img position-relative overflow-hidden">
              <img
                src="assets/img/blog/blog-4.jpg"
                className="img-fluid"
                alt=""
              />
            </div>
            <div className="meta d-flex align-items-end">
              <span className="post-date">
                <span>05</span>August
              </span>
              <div className="d-flex align-items-center">
                <i className="bi bi-person" />{" "}
                <span className="ps-2">Maria Doe</span>
              </div>
              <span className="px-3 text-black-50">/</span>
              <div className="d-flex align-items-center">
                <i className="bi bi-folder2" />{" "}
                <span className="ps-2">Sports</span>
              </div>
            </div>
            <div className="post-content d-flex flex-column">
              <h3 className="post-title">
                Non rem rerum nam cum quo minus explicabo eius exercitationem.
              </h3>
              <a href="blog-details.html" className="readmore stretched-link">
                <span>Read More</span>
                <i className="bi bi-arrow-right" />
              </a>
            </div>
          </article>
        </div>
        {/* End post list item */}
        <div className="col-lg-4">
          <article className="position-relative h-100">
            <div className="post-img position-relative overflow-hidden">
              <img
                src="assets/img/blog/blog-5.jpg"
                className="img-fluid"
                alt=""
              />
            </div>
            <div className="meta d-flex align-items-end">
              <span className="post-date">
                <span>17</span>September
              </span>
              <div className="d-flex align-items-center">
                <i className="bi bi-person" />{" "}
                <span className="ps-2">John Parker</span>
              </div>
              <span className="px-3 text-black-50">/</span>
              <div className="d-flex align-items-center">
                <i className="bi bi-folder2" />{" "}
                <span className="ps-2">Politics</span>
              </div>
            </div>
            <div className="post-content d-flex flex-column">
              <h3 className="post-title">
                Accusamus quaerat aliquam qui debitis facilis consequatur
              </h3>
              <a href="blog-details.html" className="readmore stretched-link">
                <span>Read More</span>
                <i className="bi bi-arrow-right" />
              </a>
            </div>
          </article>
        </div>
        {/* End post list item */}
        <div className="col-lg-4">
          <article className="position-relative h-100">
            <div className="post-img position-relative overflow-hidden">
              <img
                src="assets/img/blog/blog-6.jpg"
                className="img-fluid"
                alt=""
              />
            </div>
            <div className="meta d-flex align-items-end">
              <span className="post-date">
                <span>07</span>December
              </span>
              <div className="d-flex align-items-center">
                <i className="bi bi-person" />{" "}
                <span className="ps-2">Julia White</span>
              </div>
              <span className="px-3 text-black-50">/</span>
              <div className="d-flex align-items-center">
                <i className="bi bi-folder2" />{" "}
                <span className="ps-2">Economics</span>
              </div>
            </div>
            <div className="post-content d-flex flex-column">
              <h3 className="post-title">
                Distinctio provident quibusdam numquam aperiam aut
              </h3>
              <a href="blog-details.html" className="readmore stretched-link">
                <span>Read More</span>
                <i className="bi bi-arrow-right" />
              </a>
            </div>
          </article>
        </div>
        {/* End post list item */}
      </div>
    </div>
  </section>
  {/* /Blog Posts 2 Section */}
  {/* Blog Pagination Section */}
  <section id="blog-pagination" className="blog-pagination section">
    <div className="container">
      <div className="d-flex justify-content-center">
        <ul>
          <li>
            <a href="#">
              <i className="bi bi-chevron-left" />
            </a>
          </li>
          <li>
            <a href="#">1</a>
          </li>
          <li>
            <a href="#" className="active">
              2
            </a>
          </li>
          <li>
            <a href="#">3</a>
          </li>
          <li>
            <a href="#">4</a>
          </li>
          <li>...</li>
          <li>
            <a href="#">10</a>
          </li>
          <li>
            <a href="#">
              <i className="bi bi-chevron-right" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </section>
  {/* /Blog Pagination Section */}
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