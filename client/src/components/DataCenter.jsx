import React, { useEffect, useState } from 'react';
import Display from './Display';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function DataCenter({ stack }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_URL}/api/${stack.code}`)
            .then(res => res.json())
            .then(res => {
                setData(res);
                setLoading(false);  
            })
            .catch(err => {
                toast.error("Error in Fetching");
            });
    }, [data]);

    return (
        <div>
            <ToastContainer />
            {loading ? (
                <div className='flex space-x-2 justify-center items-center bg-white h-screen dark:invert'>
                    <span className='sr-only'>Loading...</span>
                    <div className='h-4 w-4 md:w-8 md:h-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                    <div className='h-4 w-4 md:w-8 md:h-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                    <div className='h-4 w-4 md:w-8 md:h-8 bg-black rounded-full animate-bounce'></div>
                </div>
            ) : (
                <Display pro={data} />
            )}
        </div>
    );
}

export default DataCenter;
