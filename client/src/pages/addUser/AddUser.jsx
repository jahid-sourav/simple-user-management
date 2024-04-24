import { updateProfile } from "firebase/auth";
import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";

function AddUser() {
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleAddUser = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const photoUrl = e.target.photoUrl.value;
    const gender = e.target.gender.value;
    const status = e.target.status.value;
    const newUser = { name, email, password, photoUrl, gender, status };
    createUser(name, email, photoUrl, password)
      .then((result) => {
        updateProfile(result.user, {
          displayName: name,
          photoURL: photoUrl,
        });
        // setUser({ ...result.user, displayName: name, photoURL: photoUrl });
        fetch("https://simple-user-management-server.vercel.app/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newUser),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.insertedId) {
              e.target.reset();
              Swal.fire({
                title: "User Added!",
                icon: "success",
              });
              navigate("/");
            }
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <section className="py-6">
      <Helmet>
        <title>Add User</title>
      </Helmet>
      <div className="template-container">
        <h2 className="mb-4">Add User</h2>
        <form onSubmit={handleAddUser} className="w-1/3">
          <div className="mb-4">
            <input
              type="text"
              name="name"
              placeholder="Enter Your Name"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Enter Your Password"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <input
              type="url"
              name="photoUrl"
              placeholder="Enter Your Photo URL"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4 flex items-center gap-2">
            <label>Gender : </label>
            <div className="ml-3">
              <input type="radio" name="gender" id="male" value="male" />
              <label htmlFor="male" className="ml-1">
                Male
              </label>
            </div>
            <div>
              <input type="radio" name="gender" id="female" value="female" />
              <label htmlFor="female" className="ml-1">
                Female
              </label>
            </div>
          </div>
          <div className="mb-4 flex items-center gap-2">
            <label>Status : </label>
            <div className="ml-3">
              <input type="radio" name="status" id="a" value="active" />
              <label htmlFor="a" className="ml-1">
                Active
              </label>
            </div>
            <div>
              <input type="radio" name="status" id="i" value="inactive" />
              <label htmlFor="i" className="ml-1">
                Inactive
              </label>
            </div>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="px-5 py-2 bg-black text-white rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default AddUser;
