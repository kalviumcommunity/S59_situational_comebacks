import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './Authcontext';

function AddDataForm() {
  const { token, userId } = useAuth();
  const location = useLocation();
  const [formData, setFormData] = useState({
    line: '',
    effectiveness: '',
    context: '',
    user: userId
  });
  const [chek, setChek] = useState(false);
  const [contriId, setContriId] = useState('');

  const apiUrl = `${import.meta.env.VITE_URL}/api${location.pathname}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...formData,
        user: chek ? contriId : userId 
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dataToSend)
      });

      if (response.ok) {
        toast.success('Addition Done');
        setFormData({
          line: '',
          effectiveness: '',
          context: '',
          user: userId
        });
        setContriId('');
        setChek(false);
      } else {
        toast.info('Login to Add Data');
      }
    } catch (error) {
      toast.error('Error occurred');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contriSection = () => {
    setChek(!chek);
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
        <textarea
          type='text'
          name='line'
          placeholder='Line'
          value={formData.line}
          onChange={handleChange}
          className='text-black font-bold text-center rounded-2xl max-h-12  resize-y  my-2 '
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
        <button onClick={contriSection} className='inline-flex items-center p-2 text-sm font-medium text-center text-white  rounded-lg hover:bg-green-800 focus:ring-4 hover:scale-110 transform transition duration-y focus:outline-none bg-green-800 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mb-3' >
          Collab Id
        </button>
        {chek && (
          <input
            type="text"
            placeholder='Contribution ID'
            value={contriId}
            onChange={(e) => setContriId(e.target.value)}
            pattern="@[a-zA-Z0-9]{6,}"
            title="Contribution ID should start with @ and have a minimum of 6 characters"
            required
            className='rounded-xl text-center font-bold'
          />
        )}
        <button
          type='submit'
          className='inline-flex mt-1 items-center p-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 hover:scale-110 transform transition duration-y focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          Add Data
        </button>
      </form>
    </div>
  );
}

export default AddDataForm;
