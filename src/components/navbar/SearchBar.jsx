import React, { useCallback, useEffect, useState } from 'react'
import { MdOutlineSearch } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {termSuggestions } from '@/Redux/Slices/searchSlice';

function debounce(cb, delay = 1000) {

  let timeout;

  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => cb(...args), delay);
  }
}

function SearchBar() {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const user_id = useSelector((state) => state.auth.data._id);

  const term  = useSelector(state => state.search.searchTerm);

  const [input, setInput] = useState("");

  const [suggestion, setSuggestion] = useState([]);

  const debouncedFetchSuggestions = useCallback(
    debounce(async (value) => {
      const res = await dispatch(termSuggestions({
        searchTerm: value,
        user_id
      }));
      setSuggestion(res.payload.data);
    }, 1000),
    [user_id]
  );

  const onUserInput = async (e) => {

    const { value } = e.target;

    setSuggestion([]);

    setInput(value);

    if (value.length > 0) {
      debouncedFetchSuggestions(value);
    }

  }

  const onSearch = async (val) => {

    setInput(val);

    setSuggestion([]);

    navigate(`/search/${val}`);

  }

  const onEnter = (e) => {
    console.log("here");
    
    if(e.key === "Enter"){
      onSearch(input);
    }
  }

  useEffect(() => {
    setInput(term);
  }, [term])

  return (
    <div className='relative w-[40%] px-3 text-sm flex justify-center'>
      <input onKeyDown={onEnter}  value={input} onChange={onUserInput} placeholder='Search for anything' className='outline-none border border-black rounded-3xl pl-12 py-[12px] w-full placeholder:text-slate-500 placeholder:text-sm pr-8' type="text" />
      <MdOutlineSearch className={`absolute size-6 top-[11px] left-8  ${input ? "fill-black" : "fill-slate-400"} `} />

      {
        (input != "" && suggestion.length > 0) &&
        <div className='w-[95%]  absolute bg-white z-50 border border-slate-400 top-12 animate-in py-2'>
          {
            suggestion?.map((val, indx) =>
              <button onClick={() => onSearch(val)} className='flex items-center font-bold gap-4 px-4 py-3 hover:bg-[#F7F9FA] duration-150 w-full  ' key={indx}>
                <MdOutlineSearch className='size-6 shrink-0' />
                <h1 className='text-ellipsis truncate whitespace-nowrap text-base-lg'>
                  {val}
                </h1>
              </button>)
          }
        </div>
      }

    </div>
  )
}

export default SearchBar
