import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FadeLoader, PacmanLoader } from "react-spinners";
import Swal from "sweetalert2";
import UserService from "../../../services/UserService";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};



export default function ManageVillagers(){
    
     let [loading, setLoading] = useState(false);
    
      const [users, setUsers] = useState([])
    
      async function fetchUsers() {
        try {
          setLoading(true)
          let res = await UserService.all()
          setUsers(res)
        } catch (err) {
          console.log(err)
        }
        finally {
          setLoading(false)
        }
      }
    
    
      useEffect(() => {
        fetchUsers();
      }, [])
    
    
      async function deleteUser(id) {
        try {
    
          Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
              CategoryService.deleteCat(id)
              fetchCategories();
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
          });
    
        } catch (err) {
          toast.error("Error Deleting User")
          console.log("Error: ", err)
        }
      }
    
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
      <h1>Villagers</h1>
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

</main>

  {loading ?
        <PacmanLoader
          color="#81C408"
          loading={loading}
          cssOverride={override}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />

        : <div className="container-fluid py-5">
          <div className="container py-5">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Sr. No.</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Contact</th>
                    <th scope="col">Status</th>
                    <th scope="col">Created At</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr>
                      <td>
                        <p className="mb-0 mt-4">{index + 1}</p>
                      </td>
                     
                      <td>
                        <p className="mb-0 mt-4">{user.name}</p>
                      </td>
                      <td>
                        <p className="mb-0 mt-4">{user.email}</p>
                      </td>
                      <td>
                        <p className="mb-0 mt-4">{user.phone}</p>
                      </td>
                      <td>
                        <p className="mb-0 mt-4">{user.status ? "Active" : "Inactive"}</p>
                      </td>
                      <td>
                        <p className="mb-0 mt-4">{new Date(user.createdAt).toLocaleDateString()}</p>
                      </td>
                      <td>
                       
                        <button onClick={() => { deleteUser(user.id) }} className="btn btn-md rounded-circle bg-light border mt-4">
                          <i className="bi bi-trash text-danger" />
                        </button>
                      </td>
                    </tr>
                  ))

                  }

                </tbody>
              </table>
            </div>
          </div>
        </div>}
</>
   )
}