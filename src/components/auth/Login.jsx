import { useState } from "react";
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import UserService from "../../services/UserService";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const nav=useNavigate()

  async function submitForm(e) {
    e.preventDefault();

    let payload = {
      email,
      password
    };

    console.log("En: ", payload)
    try {
      const user = await UserService.login(payload);

      console.log(user,"This");
      
      toast.success("Login Success");
      if (user.userType == "1") {
        nav("/admin");
      } else {
        nav("/");
      }
    } catch (err) {
      toast.error(err.message);
    }
  }
 return (
    <main className="main">
      {/* Page Title */}
      <div
        className="page-title dark-background"
        data-="fade"
        style={{ backgroundImage: "url(assets/img/page-title-bg.webp)" }}
      >
        <div className="container position-relative">
          <h1>Login</h1>
          <p>Home / Login</p>
          <nav className="breadcrumbs">
            <ol>
              <li>
                <a href="index.html">Home</a>
              </li>
              <li className="current">Login</li>
            </ol>
          </nav>
        </div>
      </div>
      {/* End Page Title */}
      {/* Login Section */}
      <section id="contact" className="contact section">
        <div className="container" data-="fade">
          <div className="row gy-5 gx-lg-5 mt-3">
            <div className="col-lg-8 mx-auto">
              <form
                onSubmit={submitForm}
                className="php-email-form"
              >
                <div className="row">
                  <div className="col-md-12 form-group">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      id="email"
                      placeholder="Your Email"
                      required=""
                      onChange={(e)=>{setEmail(e.target.value)}}
                    />
                  </div>
                  <div className="col-md-12 form-group mt-3 mt-md-0">
                    <input
                      type="password"
                      className="form-control"
                      name="pass"
                      id="pass"
                      placeholder="Your Password"
                      required=""
                      onChange={(e)=>{setPassword(e.target.value)}}
                    />
                  </div>
                </div>
               
             
                <div className="text-center">
                  <button type="submit">Login</button>
                </div>
              </form>
            </div>
            {/* End Login Form */}
          </div>
        </div>
      </section>
      {/* /Login Section */}

      {/* /Call To Action Section */}
    </main>
  );
}