
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddDataForm() {
  const location = useLocation();
  const [formData, setFormData] = useState({
    line: '',
    effectiveness: '',
    context: '',
    user: ''
  });

  // Determine the API endpoint based on the current route
  const apiUrl = `http://localhost:3000/api/${location.pathname}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        toast.success('Adition Done');
       
        // Reset form fields to empty
        setFormData({
          line: '',
          effectiveness: '',
          context: '',
          user: ''
        });
      } else {
        toast.info('Failed to add');
      }
    } catch (error) {
      toast.error('Error occurred');
    
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className='flex items-center justify-center flex-col w-56 p-4 rounded-xl lg:w-96 lg:h-80 bg-slate-700'>
      <h1 className='text-2xl lg:text-4xl mb-4 text-white font-semibold'>Fill Details</h1>
      <form onSubmit={handleSubmit} className='flex items-center justify-center flex-col text-center '>
        <ToastContainer />
        <select
          name='effectiveness'
          value={formData.effectiveness}
          className='text-black font-semibold text-center rounded-2xl my-2 lg:w-72 lg:h-8 lg:text-xl'
          onChange={handleChange}
          required
        >
          <option value=''>Select Effectiveness</option>
          <option value='High'>High</option>
          <option value='Medium'>Medium</option>
          <option value='Low'>Low</option>
        </select>
        <input
          type='text'
          name='line'
          placeholder='Line'
          value={formData.line}
          onChange={handleChange}
          className='text-black font-bold text-center rounded-2xl  my-2 '
          required
        />
        <input
          type='text'
          name='context'
          placeholder='Context'
          value={formData.context}
          className='text-black font-bold text-center rounded-2xl my-2 '
          onChange={handleChange}
          required
        />
        <input
          type='text'
          name='user'
          placeholder='UserID'
          value={formData.user}
          className='text-black font-bold text-center rounded-2xl my-2 '
          onChange={handleChange}
          required
        />
        <button
          type='submit'
          className='inline-flex items-center p-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 hover:scale-110 transform transition duration-y focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          Add Data
        </button>
      </form>
    </div>
  );
}

export default AddDataForm;

