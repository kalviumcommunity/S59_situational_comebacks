import React from 'react';
import { useLocation } from 'react-router-dom';
import { toast,ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

function DeleteData({ selectedID ,onDelete }) {
  const location = useLocation();

  // Determine the API endpoint based on the current route and the selected ID
  const apiUrl = `http://localhost:3000/api${location.pathname}/${selectedID}`;

  const handleDelete = async () => {
    try {
      const response = await fetch(apiUrl, {
        method: 'DELETE',
      });
      if (response.ok) {
        toast.success("Deleted Succesfully")
      } else {
        toast.info("Failed To Delete Data !")
      }
    } catch (error) {
      toast.error("Error Occured")
    }
  };

  return (
    <div className='m-4'>
      <ToastContainer/>
      <button onClick={handleDelete} className='bg-red-500 text-white px-4 py-2 rounded'>
        Delete Data
      </button>
    </div>
  );
}

export default DeleteData;
