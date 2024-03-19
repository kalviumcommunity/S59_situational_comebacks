import React from 'react';
import { useLocation } from 'react-router-dom';
import { toast,ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { useAuth } from './Authcontext';


function DeleteData({ selectedID ,onComplete }) {
  const location = useLocation();
  const { token} = useAuth();

  // Determine the API endpoint based on the current route and the selected ID
  const apiUrl = `${import.meta.env.VITE_URL}/api${location.pathname}/${selectedID}`;

  const handleDelete = async () => {
    try {
      const response = await fetch(apiUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      if (response.ok) {
        toast.success("Deleted Succesfully")
        
      } else {
        toast.info('Login to Delete Data');
      }
    } catch (error) {
      toast.error("Error" , error)
    }
  };

  return (
    <div className='m-4'>
      <ToastContainer/>
      <button onClick={()=>{handleDelete(),onComplete()}} className='bg-red-500 text-white px-4 py-2 rounded'>
        Delete Data
      </button>
    </div>
  );
}

export default DeleteData;
