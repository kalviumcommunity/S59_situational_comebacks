
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { useAuth } from './Authcontext';

function UpdateDataForm({ selectedID, initialFormData, onCloseForm }) {
    const location = useLocation();
    const [formData, setFormData] = useState({
        "line": '',
        "effectiveness": '',
        "context": ''
    });

    const [showForm, setShowForm] = useState(true);
    const { token, setToken } = useAuth();


    const apiUrl = `${import.meta.env.VITE_URL}/api${location.pathname}/${selectedID}`;
    const apiUrlb = `${import.meta.env.VITE_URL}/api${location.pathname}`;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(apiUrlb);
                if (response.ok) {
                    const data = await response.json();
                    setFormData(data);
                } else {
                    console.error('Failed to update data');
                }
            } catch (error) {
                console.log("Error", error)
            }
        };
        fetchData();
    }, [selectedID]);

    useEffect(() => {
        
        if (initialFormData) {
            setFormData(initialFormData);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(apiUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                toast.success("Data Updated Successfully");
                onCloseForm();
            } else {
                toast.info('Login to Add Data');
            }
        } catch (error) {
            toast.error("Error Occurred")
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        showForm && (
            <div className='flex items-center justify-center flex-col w-56 p-4 rounded-xl lg:w-96 lg:h-80 bg-slate-700'>
                <h1 className='text-2xl lg:text-4xl mb-4 text-white font-semibold'>Set Changes</h1>
                <form onSubmit={handleSubmit} className='flex items-center justify-center flex-col' >
                    <ToastContainer />
                    <select name="effectiveness" value={formData.effectiveness} onChange={handleChange} className='text-black font-semibold text-center rounded-2xl my-2 lg:w-72 lg:h-8 lg:text-xl' required>
                        <option value="">Select Effectiveness</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                    <textarea type="text" name="line" className='text-black font-bold text-center rounded-2xl max-h-12  resize-y  my-2' placeholder="Line" value={formData.line} onChange={handleChange}  required />
                    <input type="text" name="context" className='text-black font-bold text-center rounded-2xl  my-2' placeholder="Context" value={formData.context}  onChange={handleChange} required />
                    <button type="submit" className='inline-flex items-center m-2  p-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 hover:scale-110 transform transition duration-y focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'>Update Data</button>
                </form>
            </div>
        )
    );
}

export default UpdateDataForm;
