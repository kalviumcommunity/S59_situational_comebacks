
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

function UpdateDataForm({ selectedID, initialFormData, onCloseForm }) {
    const location = useLocation();
    const [formData, setFormData] = useState({
        "line": '',
        "effectiveness": '',
        "context": ''
    });

    const [showForm, setShowForm] = useState(true);


    const apiUrl = `http://localhost:3000/api${location.pathname}/${selectedID}`;
    const apiUrlb = `http://localhost:3000/api${location.pathname}`;

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
    }, [apiUrlb, selectedID]);

    useEffect(() => {
        
        if (initialFormData) {
            setFormData(initialFormData);
        }
    }, [initialFormData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(apiUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                toast.success("Data Updated Successfully , Click Refresh To See Changes");
                onCloseForm();
            } else {
                toast.info("Failed to Update data")
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
                    <input type="text" name="line" className='text-black font-bold text-center rounded-2xl  my-2' placeholder="Line" value={formData.line} onChange={handleChange}  required />
                    <input type="text" name="context" className='text-black font-bold text-center rounded-2xl  my-2' placeholder="Context" value={formData.context}  onChange={handleChange} required />
                    <button type="submit" className='inline-flex items-center m-2  p-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 hover:scale-110 transform transition duration-y focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'>Update Data</button>
                </form>
            </div>
        )
    );
}

export default UpdateDataForm;
