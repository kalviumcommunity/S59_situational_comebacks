import React, { useState } from 'react';

function SearUser(props) {
    const [searchUserId, setSearchUserId] = useState('');

    const handleInput = (e) => {
        setSearchUserId(e.target.value);
        props.onSearchChange(e.target.value); // Passing the search term to the parent component
    };

    return (
        <div className='text-white w-full flex flex-col text-center items-center justify-center'>
            <input
                type="text"
                onChange={handleInput}
                value={searchUserId}
                placeholder="Search User ID Here"
                className='text-white text-center border-2 border-slate-200 bg-slate-600 rounded-xl mt-10 md:mt-2 h-10 md:w-64 hover:scale-110'
            />
        </div>
    );
}

export default SearUser;
