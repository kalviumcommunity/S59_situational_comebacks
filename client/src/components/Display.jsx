
import React, { useState } from 'react';
import Searching from './Searching';
import { Link, useLocation } from 'react-router-dom';
import AddDataForm from './Form';
import UpdateDataForm from './UpdateForm';
import DeleteData from './DeleteIt';

function Display(props) {
    const location = useLocation();
    const [ourFilter, setFilter] = useState('');
    const [effectivenessFilter, setEffectivenessFilter] = useState('');
    const [intensityLabel, setIntensityLabel] = useState('Intensity');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const [enteredUserID, setEnteredUserID] = useState('');
    const [selectedID, setSelectedID] = useState(null);
    const [idMatch, setIdmatch] = useState(false);
    const [showPPost, setShowPost] = useState(false);
    const [OrgID, setOrgID] = useState('');
    const [DeletHandle, setDeleteHandle] = useState(false);
    const [Deletit, setDeleteit] = useState(false);
    const [dID, setDit] = useState('');
    const [deletUserId, setdeletUserId] = useState('');
    const [displayForm, setDisplayForm] = useState(false);
    const [deleteInProgress, setDeleteInProgress] = useState(false); 

    const Adminpassword="SatyamHP36@1603"

    const handleSearchChange = (searchTerm) => {
        setFilter(searchTerm);
    };

    const checkStand = location.pathname === '/standups';
    const checkFamily = location.pathname === '/familys';
    const checkLover = location.pathname === '/pickups';

    const handleEffectivenessFilter = (filter, label) => {
        setEffectivenessFilter(filter);
        setIntensityLabel(label);
        setIsDropdownOpen(false);
    };

    const resetEffectivenessFilter = () => {
        setEffectivenessFilter('');
        setIntensityLabel('Intensity');
        setIsDropdownOpen(false);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const filteredData = props.pro.filter((el) => {
        const isMatched = ourFilter === '' || el.context.toLowerCase().includes(ourFilter.toLowerCase());
        const isEffectivenessMatched = effectivenessFilter === '' || el.effectiveness.toLowerCase() === effectivenessFilter.toLowerCase();
        return isMatched && isEffectivenessMatched;
    });

    const checkId = (_id) => {
        
        setOrgID(_id);
    };

    const enterID = (user_ID) => {
        setEdit(true);
        setSelectedID(user_ID);
    };

    const handleChange = (e) => {
        setEnteredUserID(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        e.target.reset();
        setEnteredUserID('');
        if (enteredUserID === selectedID|| enteredUserID === Adminpassword) {
            setEdit(false);
            setEnteredUserID('');
            setIdmatch(false);
            setShowPost(true);
        } else {
            setIdmatch(true);
        }
    };

    const CompUser = (user) => {
        setdeletUserId(user);
        setDeleteit(true);
    };

    const handleDel = (e) => {
        if (e.target.value === deletUserId|| e.target.value === Adminpassword) {
            setDeleteHandle(true);
            setdeletUserId('');
            e.target.reset();
        }
    };

    const CompId = (_id) => {
        setDit(_id);
    };

    const shForm = () => {
        setDisplayForm(!displayForm);
    };

    const handleRefresh = () => {
        window.location.reload(); 
    };

    const closeVer = () => {
        setEdit(false);
        setIdmatch(!idMatch);
    };

    const toggleUpdateForm = () => {
        setTimeout(() => {
            setShowPost(!showPPost);
        }, 5000); 
    };

    const toggleDelete = () => {
        setTimeout(() => {
            setDeleteit(!Deletit);
        }, 5000);
    };

    const closeDel = () => {
        setDeleteit(false);
        setDeleteInProgress(false);
    };

    const handleDeleteStart = () => {
        setDeleteInProgress(true);
    };

    const handleDeleteComplete = () => {
        setDeleteInProgress(false);
    };

    return (
        <div className="bg-black h-full pb-10">
            <div className="w-full flex items-center justify-center">
                <div className="text-transparent font-semibold mb-5 bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 text-5xl p-2 lg:text-7xl sm:text-4xl">
                    {checkStand ? <div>Standup</div> : null}
                    {checkFamily ? <div>Family</div> : null}
                    {checkLover ? <div>Lover</div> : null}
                </div>
            </div>

            <div className="flex justify-between  items-center relative">
                <button onClick={() => shForm()} className="m-2 p-2 bg-slate-600 text-white rounded">
                    {displayForm ? <p>Go Back</p> : <p>Contribute</p>}
                </button>
                <button onClick={toggleDropdown} className="m-2 p-2 bg-slate-600 absolute right-0 text-white rounded">
                    {intensityLabel}
                </button>
                {isDropdownOpen && (
                    <div className="absolute right-0 mt-10 w-16 md:w-44 text-sm text-center bg-slate-400 divide-y divide-white text-black-900 font-semibold  rounded-lg shadow">
                        <button onClick={() => handleEffectivenessFilter('high', 'High')} className="block w-full md:px-4 md:py-2  px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">High</button>
                        <button onClick={() => handleEffectivenessFilter('medium', 'Medium')} className="block w-full md:px-4 md:py-2 px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Medium</button>
                        <button onClick={() => handleEffectivenessFilter('low', 'Low')} className="block w-full md:px-4 md:py-2 px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Low</button>
                        <button onClick={() => resetEffectivenessFilter()} className="block w-full md:px-4 md:py-2  px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Reset Intensity</button>
                    </div>
                )}

                <div className="fixed top-72 left-10 md:left-64 md:ml-2 xl:left-96 xl:ml-56 z-30">
                    {edit && (
                        <div className="flex items-center justify-center bg-slate-600 p-5 rounded-lg  flex-col">
                            <button className="text-white font-semibold  bg-red-600  px-2 rounded-full absolute top-2 right-3" onClick={closeVer}>X</button>
                            <h1 className="text-2xl text-white font-semibold mt-4 xl:text-4xl xl:mb-3">Verify Your Identity</h1>
                            <form onSubmit={handleSubmit} className="flex items-center justify-center flex-col">
                                <input type="text" placeholder="Enter your ID here" className="m-2 font-semibold text-center rounded-lg text-black" onChange={handleChange} value={enteredUserID} />
                                <button type="submit" className="inline-flex items-center m-2 p-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 hover:scale-110 transform transition duration-y focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                            </form>
                            {idMatch ? <div className="text-white mt-3 font-semibold bg-red-700 p-2 rounded-2xl">You Didn't have Access</div> : null}
                        </div>
                    )}
                </div>

                <button className="m-2 fixed top-28  sm:top-24 xl:top-44 xl:left-4 xl:font-semibold   xl:p-1 z-50 left-0 text-sm p-0.5  bg-white text-black rounded" onClick={handleRefresh}>Refresh</button>

                <div className="fixed z-20 top-52 sm:left-72 lg:left-80 lg:ml-4 xl:ml-52 xl:left-96 left-12">
                    {showPPost ? <UpdateDataForm selectedID={OrgID} initialFormData={filteredData.find(item => item.user === selectedID)} onCloseForm={toggleUpdateForm} /> : null}
                </div>
                {Deletit ? (
                    <div className="fixed z-50 top-64 sm:left-72 lg:left-80 lg:ml-4 xl:p-5 xl:ml-56 xl:left-96  bg-slate-600 p-2 rounded-xl flex items-center justify-center flex-col">
                        <button className="text-white font-semibold  bg-red-600  px-2 rounded-full absolute top-2 right-3" onClick={closeDel}>X</button>
                        <h1 className="text-2xl text-white mb-2 mt-2 xl:text-4xl  font-semibold">Delete Post</h1>
                        <div className="flex items-center justify-center text-center flex-col">
                            <input type="text" placeholder="User ID" className="text-center font-semibold  rounded-xl" onChange={handleDel} />
                            {DeletHandle ? <DeleteData selectedID={dID} onDelete={toggleDelete} onComplete={handleDeleteComplete} /> : <div className="text-black"><p className="text-black mt-2 p-1 rounded-xl bg-yellow-500">Verify Your ID</p></div>}
                        </div>
                    </div>
                ) : null}
            </div>
            <div className="fixed z-10 top-52 sm:left-72 lg:left-80 lg:ml-4 xl:ml-64 left-16">
                {displayForm ? <AddDataForm /> : null}
            </div>

            <Searching data={props.pro} onSearchChange={handleSearchChange} />
            <div className="text-white flex items-center justify-center  flex-wrap m-14 text-center">
                {filteredData.length > 0 ? (
                    filteredData.map((e) => {
                        return (
                            <div className="m-5 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:scale-110 transform transition duration-y bg-opacity-10" key={e.id}>
                                <h2 className="text-5xl mb-2 tracking-tight  text-white font-semibold p-5">{e.effectiveness}</h2>
                                <br />
                                <h1 className="text-2xl mb-3 font-normal text-gray-200">{e.line}</h1>
                                <br />
                                <h2 className="p-1 font-semibold"> {e.context}</h2>
                                <button disabled={deleteInProgress} onClick={() => { enterID(e.user), checkId(e._id) }} className="inline-flex items-center m-2 p-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 hover:scale-110 transform transition duration-y focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit</button>
                                <button disabled={deleteInProgress} className="inline-flex items-center m-2  p-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 hover:scale-110 transform transition duration-y focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" onClick={() => { CompId(e._id), CompUser(e.user), handleDeleteStart() }}>Delete</button>
                            </div>
                        );
                    })
                ) : (
                    <div className="text-gray-200 flex items-start font-extrabold justify-center text-5xl h-screen">
                        <h1>
                        Sorry, not found
                        </h1>
                        </div>
                )}
            </div>
        </div>
    );
}

export default Display;
