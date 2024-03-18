
import React, { useState } from 'react';

function Searching(props) {
    const [search, setSearch] = useState('');

    const handleInput = (e) => {
        setSearch(e.target.value.toUpperCase());
        props.onSearchChange(e.target.value); 
    };

    const handleKeys = (e) => {
        if (e.key === 'Escape') {
            setSearch('');
            props.onSearchChange(''); 
        }
    };

    const handleClickUniqueContext = (uniqueContext) => {
        setSearch(uniqueContext);
        props.onSearchChange(uniqueContext);
    };

    return (
        <div className='text-white w-full flex flex-col text-center items-center justify-center'>
            <input
                type="text"
                onChange={handleInput}
                onKeyDown={handleKeys}
                value={search}
                placeholder="Search Context Here"
                className='text-white text-center border-2 border-slate-200 bg-slate-600 rounded-xl mt-10 md:mt-2 h-10 md:w-64 hover:scale-110   '
            />
            {search && (
                <div className='m-2  flex w-72 md:w-96 flex-wrap text-center items-center justify-center'>
                    {[...new Set(props.data
                        .filter((e) => e.context.toUpperCase().includes(search))
                        .map((el) => el.context))]
                        .map((uniqueContext) => (
                            <p key={uniqueContext} onClick={() => handleClickUniqueContext(uniqueContext)} className='p-3 m-2 bg-slate-300 text-blue-900 font-semibold mt-1 rounded-2xl cursor-pointer'>{uniqueContext}</p>
                        ))}
                </div>
            )}
        </div>
    );
}

export default Searching;
