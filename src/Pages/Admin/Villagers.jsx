import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FadeLoader, PacmanLoader } from "react-spinners";
import Swal from "sweetalert2";
import UserService from "../../services/UserService";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function Villagers() {
   
   let [loading, setLoading] = useState(false);

  const [villagers, setVillagers] = useState([])

  async function fetchVillagers() {
    try {
      setLoading(true)
      let res = await UserService.all()
      setVillagers(res)
    } catch (err) {
      console.log(err)
    }
    finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    fetchVillagers();
  }, [])


  async function deleteDoc(id) {
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
      toast.error("Error Deleting Item")
      console.log("Error: ", err)
    }
  }
   
    return (
        <>
            <div className="container mt-5">
                <div className="d-flex justify-content-between">
                    <h1 className="text-center">Villagers List</h1>
                </div>
            </div>


            {loading ?
                <FadeLoader
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
                                        <th scope="col">Image</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Created At</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {villagers.map((item, index) => (
                                        <tr>
                                            <td>
                                                <p className="mb-0 mt-4">{index + 1}</p>
                                            </td>
                                            <td>
                                                <img className="img-fluid rounded-circle" style={{ width: "80px", height: "80px" }} src={item.image} alt="" />
                                            </td>
                                            <td>
                                                <p className="mb-0 mt-4">{item.name}</p>
                                            </td>
                                            <td>
                                                <p className="mb-0 mt-4">{item.description}</p>
                                            </td>
                                            <td>
                                                <p className="mb-0 mt-4">{item.status ? "Active" : "Inactive"}</p>
                                            </td>
                                            <td>
                                                <p className="mb-0 mt-4">{new Date(item.createdAt).toLocaleTimeString()}</p>
                                            </td>
                                            <td>
                                                <Link to={`/admin/villager/edit/${item.id}`}>
                                                    <button className="btn btn-md rounded-circle bg-light border mt-4">
                                                        <i className="bi bi-pencil text-danger" />
                                                    </button>
                                                </Link>
                                                &nbsp;
                                                <button onClick={() => { deleteDoc(item.id) }} className="btn btn-md rounded-circle bg-light border mt-4">
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