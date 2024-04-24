import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function EditUser() {
  const user = useLoaderData();
  const [gender, setGender] = useState(user.gender || "");
  const [status, setStatus] = useState(user.status || "");

  const navigate = useNavigate();

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleUpdateUser = (e) => {
    event.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const photoUrl = e.target.photoUrl.value;
    const id = user._id;
    const updatedUser = { name, email, password, photoUrl, gender, status };

    fetch(`https://simple-user-management-server.vercel.app/users/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: "User Updated!",
            icon: "success",
          }).then(() => {
            navigate("/");
          });
        }
      });
  };

  return (
    <section className="py-6">
      <Helmet>
        <title>Edit User</title>
      </Helmet>
      <div className="template-container">
        <h2 className="mb-4">Edit User</h2>
        <form onSubmit={handleUpdateUser} className="w-1/3">
          <div className="mb-4">
            <input
              defaultValue={user.name}
              type="text"
              name="name"
              placeholder="Enter Your Name"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <input
              readOnly
              defaultValue={user.email}
              type="email"
              name="email"
              placeholder="Enter Your Email"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <input
              defaultValue={user.password}
              type="password"
              name="password"
              placeholder="Enter Your Password"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <input
              defaultValue={user.photoUrl}
              type="url"
              name="photoUrl"
              placeholder="Enter Your Photo URL"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4 flex items-center gap-2">
            <label>Gender : </label>
            <div className="ml-3">
              <input
                type="radio"
                name="gender"
                id="male"
                value="male"
                checked={gender === "male"}
                onChange={handleGenderChange}
              />
              <label htmlFor="male" className="ml-1">
                Male
              </label>
            </div>
            <div>
              <input
                type="radio"
                name="gender"
                id="female"
                value="female"
                checked={gender === "female"}
                onChange={handleGenderChange}
              />
              <label htmlFor="female" className="ml-1">
                Female
              </label>
            </div>
          </div>
          <div className="mb-4 flex items-center gap-2">
            <label>Status : </label>
            <div className="ml-3">
              <input
                type="radio"
                name="status"
                id="a"
                value="active"
                checked={status === "active"}
                onChange={handleStatusChange}
              />
              <label htmlFor="a" className="ml-1">
                Active
              </label>
            </div>
            <div>
              <input
                type="radio"
                name="status"
                id="i"
                value="inactive"
                checked={status === "inactive"}
                onChange={handleStatusChange}
              />
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
              Update
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default EditUser;
