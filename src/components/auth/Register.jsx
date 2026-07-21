import { useState } from "react";
import { toast } from "react-toastify";
import UserService from "../../services/UserService";
import { useNavigate } from "react-router-dom";

export default function Register() {
 


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const nav = useNavigate()

  async function submitForm(e) {
    e.preventDefault();
    let payload = {
      name: name,
      email: email,
      phone: phone,
      password: password,
      address: address,
    }

    await UserService.register(payload)
    toast.success("Registeration Successful")
    nav('/login')
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
          <h1>Register</h1>
          <p>Home / Register</p>
          <nav className="breadcrumbs">
            <ol>
              <li>
                <a href="index.html">Home</a>
              </li>
              <li className="current">Register</li>
            </ol>
          </nav>
        </div>
      </div>
      {/* End Page Title */}
      {/* Register Section */}
      <section id="contact" className="contact section">
        <div className="container" data-="fade">
          <div className="row gy-5 gx-lg-5 mt-3">
            <div className="col-lg-8 mx-auto">
              <form
                onSubmit={submitForm}
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
                      onChange={(e)=>setName(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6 form-group mt-3 mt-md-0">
                    <input
                      type="text"
                      className="form-control"
                      name="contact"
                      id="contact"
                      placeholder="Your Contact"
                      required=""
                        onChange={(e)=>setPhone(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 form-group mt-3">
                    <input
                      type="text"
                      className="form-control"
                      name="email"
                      id="email"
                      placeholder="Your Email"
                      required=""
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6 form-group mt-3">
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      id="password"
                      placeholder="Password"
                      required=""
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group mt-3">
                  <textarea
                    className="form-control"
                    name="message"
                    placeholder="Address"
                    required=""
                    defaultValue={""}
                      onChange={(e)=>setAddress(e.target.value)}
                  />
                </div>

                <div className="text-center">
                  <button type="submit">Register</button>
                </div>
              </form>
            </div>
            {/* End Register Form */}
          </div>
        </div>
      </section>
      {/* /Register Section */}

      {/* /Call To Action Section */}
    </main>
  );
}