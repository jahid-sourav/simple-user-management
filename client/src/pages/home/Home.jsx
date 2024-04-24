import { Spinner } from "@material-tailwind/react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import UseUserHooks from "../../hooks/UseUserHooks";

function Home() {
  const { data, isLoading, refetch } = UseUserHooks();

  const handleDeleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://simple-user-management-server.vercel.app/users/${id}`, {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "User has been Deleted.",
                icon: "success",
              });
              refetch();
            }
          });
      }
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner className="h-16 w-16 text-gray-900/50" />
      </div>
    );
  }

  return (
    <div className="template-container py-6">
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className="mb-6">
        <Link
          to="/add-user"
          className="px-5 py-2 bg-black text-white text-lg rounded-lg"
        >
          Create A New User
        </Link>
      </div>
      <h2>All Users {data.length}</h2>
      <table className="mt-5 table-auto w-full border border-gray-700">
        <thead>
          <tr>
            <th className="border border-gray-700">ID</th>
            <th className="border border-gray-700">Name</th>
            <th className="border border-gray-700">Image</th>
            <th className="border border-gray-700">Email</th>
            <th className="border border-gray-700">Password</th>
            <th className="border border-gray-700">Gender</th>
            <th className="border border-gray-700">Status</th>
            <th className="border border-gray-700">Action</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {data.map((user, index) => (
            <tr key={user._id}>
              <td className="border border-gray-700">{index + 1}</td>
              <td className="border border-gray-700">{user.name}</td>
              <td className="border border-gray-700">
                <img
                  src={user.photoUrl}
                  alt="Image"
                  className="h-[50px] w-[50px] object-cover mx-auto"
                />
              </td>
              <td className="border border-gray-700">{user.email}</td>
              <td className="border border-gray-700">{user.password}</td>
              <td className="border border-gray-700 capitalize">
                {user.gender}
              </td>
              <td className="border border-gray-700 capitalize">
                {user.status}
              </td>
              <td className="border border-gray-700 py-2">
                <Link
                  className="mr-1 px-2 py-1 bg-green-600 text-white rounded-lg"
                  to={`/edit-user/${user._id}`}
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDeleteUser(user._id)}
                  className="px-2 py-1 bg-red-600 text-white rounded-lg"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
