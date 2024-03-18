import React, { useState } from 'react';
import Searching from './Searching';
import { Link, useLocation } from 'react-router-dom';
import AddDataForm from './Form';
import UpdateDataForm from './UpdateForm';
import DeleteData from './DeleteIt';
import { useAuth } from './Authcontext';
import SearUser from './SearUser'

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
    const [verifyUserId, setVerifyUserId] = useState(false); 
    const [userFilter, setUserFilter] = useState(''); 
    const [userIdFilter, setUserIdFilter] = useState(''); 
    const [showAtUserDivs, setShowAtUserDivs] = useState(false); 
    const [isOpen, setIsOpen] = useState(false);
    const [constri,setCountri]=useState(false)
    

    const { userId } = useAuth(); 

    const handleSearchChanging = (searchTerm) => {
        setUserFilter(searchTerm); 
    };

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
        const isMatched =
            (ourFilter === '' || el.context.toLowerCase().includes(ourFilter.toLowerCase())) &&
            (effectivenessFilter === '' || el.effectiveness.toLowerCase() === effectivenessFilter.toLowerCase()) &&
            (
                (userFilter === '' || (el.user.toLowerCase().includes(userFilter.toLowerCase())))
            ) &&
            (userIdFilter === '' || el.user.toLowerCase().includes(userIdFilter.toLowerCase()));
    
        return isMatched;
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
        if (enteredUserID === selectedID || enteredUserID === import.meta.env.VITE_ADMIN) {
            setEdit(false);
            setEnteredUserID('');
            setIdmatch(false);
            setShowPost(true);
            setVerifyUserId(false); 
        } else {
            setIdmatch(true);
        }
    };

    const CompUser = (user) => {
        setdeletUserId(user);
        setDeleteit(true);
    };

    const handleDel = (e) => {
        if (e.target.value === deletUserId || e.target.value === import.meta.env.VITE_ADMIN) {
            setDeleteHandle(true);
            setdeletUserId('');
            e.target.form.reset();
            setVerifyUserId(false); 
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
        setIdmatch(false);
        setVerifyUserId(false); 
    };

    const toggleUpdateForm = () => {
        setTimeout(() => {
            setShowPost(false);
        }, 3000); 
    };

    const closeDel = () => {
        setDeleteit(!Deletit);
        setDeleteHandle(false);
        setDeleteInProgress(false);
    };
    const handleDeleteComplete = () => {
        setTimeout(() => {
            setDeleteit(false);
            setDeleteHandle(false);
            setDeleteInProgress(false);
        setDeleteit(false);
        ;},3000)
    };

    const handleDeleteStart = () => {
        setDeleteInProgress(true);
    };

  

    const closeF = () => {
        setDisplayForm(false);
    };

    const closeUpd = () => {
        setShowPost(false);
    };

    const checkdId = (_id) => {
        setShowPost(true)
        setOrgID(_id);
        setSelectedID(_id);
    };

    const enterdID = (user_ID) => {
        setEdit(false)
        setSelectedID(user_ID);
    };


    const handleRemove = (_id, user_ID) => {
        setVerifyUserId(true); 
        CompId(_id);
        CompUser(user_ID);
        handleDeleteStart();
    };


    const handleCont = () => {
        setUserFilter(userFilter === '' ? '@' : '');
    };

    
    const handleOpenClick = () => {
        setIsOpen(!isOpen);
        setShowAtUserDivs(!showAtUserDivs);   
    };

    const filteredAtUserData = filteredData.filter(e => e.user.startsWith('@'));

    const handleUserIdSearchChange = (searchTerm) => {
        setUserIdFilter(searchTerm);
    };

    const handleContribute = (userId, id) => {
        setEdit(true); 
        setSelectedID(userId);
        setOrgID(id);
    };


const handleContributess = (userId, id) => {
    if (constri) {
        setCountri(false);
        setUserFilter(''); 
    } else {
        setCountri(true);
        setUserFilter(userId); 
    }
    setSelectedID(userId);
    setOrgID(id);
};

const [show,setShow]=useState(false);
    
const hanSer=()=>{
    setShow(!show);
};


const resetFilters = () => {
    setFilter('');
    setEffectivenessFilter('');
    setIntensityLabel('Intensity');
    setUserFilter('');
    setUserIdFilter('');
    setIsOpen(false);
    setShowAtUserDivs(false);
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
                <div  className='flex items-center justify-center flex-col'>
                <button onClick={() => shForm()} className="m-2 p-2 bg-slate-600 hover:bg-white hover:scale-110 hover:text-black text-white rounded">
                    {displayForm ? <p>Go Back</p> : <p>Contribute</p>}
                </button>
                {userId &&
                    <button onClick={() => handleContributess(userId, OrgID)} className="m-2 p-2 bg-slate-600 hover:bg-white hover:scale-110 hover:text-black text-white rounded">
                   {constri?<div><span>Close Collection</span><br/>
                   <div></div>
                   </div>
                   :<span>Your Collection </span>} 
                    </button>
                    
                }
                {!show?<button onClick={hanSer} className="m-2 p-2 bg-slate-600 hover:bg-white hover:scale-110 hover:text-black text-white rounded">Search User Id</button>:
                <button onClick={hanSer} className="m-2 p-2 bg-slate-600 hover:bg-white hover:scale-110 hover:text-black text-white rounded">Close Search</button>}
                </div>
                
                

                <div className='flex items-center justify-center flex-col-reverse'>
                <button onClick={resetFilters} className="m-2 p-2 bg-slate-600 hover:bg-white hover:scale-110 hover:text-black text-white rounded">
                Reset Filters
            </button>
                <button onClick={handleOpenClick} className="m-2 p-2 bg-slate-600 hover:bg-white hover:scale-110 hover:text-black text-white rounded" >
                   {isOpen?<span>Close Chat </span>:<span>Conversations</span>}</button>

                <button onClick={toggleDropdown} className="m-2 p-2 bg-slate-600   hover:bg-white hover:scale-110 hover:text-black text-white rounded">
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
                </div>
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

                <div className="fixed z-20 top-52 sm:left-72 lg:left-80 lg:ml-4 xl:ml-48 xl:left-96 left-12">
                    {showPPost ? <button className="text-white font-semibold  bg-red-600  px-2 rounded-full absolute top-2 right-3" onClick={closeUpd}>X</button> :null}
                
                    {showPPost ? <UpdateDataForm selectedID={OrgID} initialFormData={filteredData.find(item => item._id === selectedID)} onCloseForm={toggleUpdateForm} /> : null}
                </div>
                {Deletit ? (
                    <div className="fixed z-50 top-64 sm:left-72 lg:left-80 left-16 lg:ml-4 xl:p-5 xl:ml-64 xl:left-96  bg-slate-600 p-2 rounded-xl flex items-center justify-center flex-col">
                        <button className="text-white font-semibold  bg-red-600  px-2 rounded-full absolute top-2 right-3" onClick={closeDel}>X</button>
                        <h1 className="text-2xl text-white mb-2 mt-2 xl:text-4xl  font-semibold">Delete Post</h1>
                        <div className="flex items-center justify-center text-center flex-col">
                            <form>
                            <input type="text" placeholder="User ID" className="text-center font-semibold  rounded-xl" onChange={handleDel} />
                            </form>
                            {DeletHandle ? <DeleteData selectedID={dID}  onComplete={handleDeleteComplete} /> : <div className="text-black"><p className="text-black mt-2 p-1 rounded-xl bg-yellow-500">Verify Your ID</p></div>}
                        </div>
                    </div>
                ) : null}
            </div>
            <div className="fixed z-10 top-52 sm:left-72 lg:left-80 lg:ml-4 xl:ml-64 left-12">
            {displayForm? <button className="text-white font-semibold  bg-red-600  px-2 rounded-full absolute top-2 right-3" onClick={closeF}>X</button> :null}
           
                {displayForm ? <AddDataForm /> : null}
            </div>
            {show? <SearUser onSearchChange={handleSearchChanging}></SearUser>:null}
            <Searching data={props.pro} onSearchChange={handleSearchChange} onUserIdSearchChange={handleUserIdSearchChange} />
            <div className="text-white flex items-center justify-center flex-wrap m-14 text-center" >
                {showAtUserDivs ? (
                    filteredAtUserData.length > 0 ? (
                        filteredAtUserData.map((e) => {
                            const isCurrentUser = userId === e.user || userId === import.meta.env.VITE_ADMIN;
                            return (
                                <div className="m-5 max-w-sm p-6 flex justify-center items-center flex-col bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:scale-110 transform transition duration-y bg-opacity-10" key={e._id}>
                                    <h2 className="text-5xl mb-2 tracking-tight  text-white font-semibold p-5">{e.effectiveness}</h2>
                                    <br />
                                    <h1 className="text-2xl mb-3 font-normal text-gray-200">{e.line}</h1>
                                    <br />
                                    <h2 className="p-1 font-semibold hover:scale-110 bg-black px-3 rounded-xl"> {e.context}</h2>
                                    <br/>
                                    {isCurrentUser&&(
                        <div className='flex items-center justify-center'>
                            <button disabled={deleteInProgress} onClick={() => { enterdID(e.user), checkdId(e._id) }} className="inline-flex items-center m-2 p-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 hover:scale-110 transform transition duration-y focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit</button>
                            <button disabled={deleteInProgress} className="inline-flex items-center m-2  p-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 hover:scale-110 transform transition duration-y focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" onClick={() => { CompId(e._id), CompUser(e.user), handleDeleteStart() }}>Delete</button>
                        </div>)}
                             { e.user.startsWith('@')&&( <div className='flex items-center justify-center'> <button disabled={deleteInProgress} onClick={() => handleContribute(e.user, e._id)} className='inline-flex items-center m-2 p-2 px-4 text-sm font-medium text-center text-white bg-slate-700 rounded-lg hover:bg-green-800 focus:ring-4 hover:scale-110 transform transition duration-y focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'>Collab</button>
                             <button disabled={deleteInProgress} className="inline-flex items-center m-2  p-2 text-sm font-medium text-center text-white bg-orange-700 rounded-lg hover:bg-orange-800 focus:ring-4 hover:scale-110 transform transition duration-y focus:outline-none focus:ring-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800" onClick={() => handleRemove(e._id, e.user)}>Remove</button></div>)}
                             </div>         
                            );
                        })
                    ) : (
                        <div className="text-gray-200 flex items-start font-extrabold justify-center text-5xl h-screen">
                            <h1>
                            Sorry, not found
                            </h1>
                        </div>
                    )
                ) : (
                    filteredData.length > 0 ? (
                        filteredData.map((e) => {
                            const isCurrentUser = userId === e.user || userId === import.meta.env.VITE_ADMIN;
                            return (
                                <div className="m-5 max-w-sm p-6 flex justify-center items-center flex-col bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:scale-110 transform transition duration-y bg-opacity-10" key={e._id}>
                                    <h2 className="text-5xl mb-2 tracking-tight  text-white font-semibold p-5">{e.effectiveness}</h2>
                                    <br />
                                    <h1 className="text-2xl mb-3 font-normal text-gray-200">{e.line}</h1>
                                    <br />
                                    <h2 className="p-1 font-semibold hover:scale-110 bg-black px-3 rounded-xl"> {e.context}</h2>
                                    <br/>
                                    {isCurrentUser&&(
                        <div className='flex items-center justify-center'>
                            <button disabled={deleteInProgress} onClick={() => { enterdID(e.user), checkdId(e._id) }} className="inline-flex items-center m-2 p-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 hover:scale-110 transform transition duration-y focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit</button>
                            <button disabled={deleteInProgress} className="inline-flex items-center m-2  p-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 hover:scale-110 transform transition duration-y focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" onClick={() => { CompId(e._id), CompUser(e.user), handleDeleteStart() }}>Delete</button>
                        </div>)}
                             { e.user.startsWith('@')&&( <div className='flex items-center justify-center'> <button disabled={deleteInProgress} onClick={() => handleContribute(e.user, e._id)} className='inline-flex items-center m-2 p-2 px-4 text-sm font-medium text-center text-white bg-slate-700 rounded-lg hover:bg-green-800 focus:ring-4 hover:scale-110 transform transition duration-y focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'>Collab</button>
                             <button disabled={deleteInProgress} className="inline-flex items-center m-2  p-2 text-sm font-medium text-center text-white bg-orange-700 rounded-lg hover:bg-orange-800 focus:ring-4 hover:scale-110 transform transition duration-y focus:outline-none focus:ring-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800" onClick={() => handleRemove(e._id, e.user)}>Remove</button></div>)}
                             </div>         
                            );
                        })
                    ) : (
                        <div className="text-gray-200 flex items-start font-extrabold justify-center text-5xl h-screen">
                            <h1>
                            Sorry, not found
                            </h1>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}

export default Display;


