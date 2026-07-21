import { useState } from "react";

import { toast } from 'react-toastify'

import { useNavigate } from 'react-router-dom'
import UserService from "../../services/UserService";

export default function Login() {

    // useState() - hook


    // STATE HANDLING

    // let count = 1;

    // function inc(){
    //     count = count + 1;
    //     console.log(count);
    // }

    // const [count, setCount] = useState(0)

    // function inc() {
    //     setCount(count+1)
    //     console.log(count);
    // }

    const nav = useNavigate();


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function getEmail(e) {
        setEmail(e.target.value)
    }

    function getPassword(e) {
        setPassword(e.target.value)
    }

    async function submitForm(e) {
        e.preventDefault();

        let payload = {
            email,
            password
        };

        try {
            const user = await UserService.login(payload);
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
        <>

            {/* Single Page Header start */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Login</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item">
                        <a href="#">Home</a>
                    </li>
                    <li className="breadcrumb-item">
                        <a href="#">Pages</a>
                    </li>
                    <li className="breadcrumb-item active text-white">Login</li>
                </ol>
            </div>
            {/* Single Page Header End */}

            <div className="d-flex justify-content-center mt-5">

                <div className="col-lg-7">
                    <form action="" className="" onSubmit={submitForm}>


                        <input
                            type="email"
                            className="w-100 form-control border-0 py-3 mb-4"
                            placeholder="Enter Your Email" onChange={getEmail}
                        />
                        <input
                            type="password"
                            className="w-100 form-control border-0 py-3 mb-4"
                            placeholder="Your Password" onChange={getPassword}
                        />

                        <button
                            className="w-100 btn form-control border-secondary py-3 bg-white text-primary "
                            type="submit"
                        >
                            Submit
                        </button>
                    </form>
                </div>

            </div>


        </>
    )
}