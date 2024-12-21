import React, { useEffect, useState } from 'react'
import { IoFilter } from 'react-icons/io5';
import { LuCheck } from 'react-icons/lu';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { searchCourses } from '@/Redux/Slices/searchSlice';

const SortBy = () => {

  return <div className='border border-black rounded-sm  w-44 hover:bg-[#E3E7EA] duration-100 text-left relative flex items-center'>
    <h1 className='text-xs font-bold px-[11px] absolute top-1 pointer-events-none'>Sort by</h1>
    <MdKeyboardArrowDown className='absolute right-2 size-5 pointer-events-none' />

    <select id='sortSelect' className='appearance-none outline-none bg-transparent h-full w-full pt-4 px-4 flex-grow cursor-pointer'>
      <option defaultChecked value="">Most Relevant</option>
      <option value="">Most Reviewed</option>
      <option value="">Newest</option>
      <option value="">Highest Rated</option>
    </select>

  </div>
}

const FilterMenue = ({ menue }) => {

  const filterValues = [

    {
      type: 'Level',
      options: [
        {
          name: 'All levels',
          value: 'all'
        },
        {
          name: 'Beginner',
          value: 'beginner'
        },
        {
          name: 'Intermediate',
          value: 'intermediate'
        },
        {
          name: 'expert',
          value: 'expert'
        }
      ]
    },

    {
      type: 'Language',
      options: [
        {
          name: "English",
          value: "english"
        },
        {
          name: "Arabic",
          value: "arabic"
        },
        {
          name: "Chinese",
          value: "chinese"
        },
        {
          name: "Dutch",
          value: "dutch"
        },
        {
          name: "French",
          value: "french"
        },
        {
          name: "German",
          value: "german"
        },
        {
          name: "Hindi",
          value: "hindi"
        },
        {
          name: "Italian",
          value: "italian"
        },
        {
          name: "Japanese",
          value: "japanese"
        },
        {
          name: "Korean",
          value: "korean"
        },
        {
          name: "Portuguese",
          value: "portuguese"
        },
        {
          name: "Russian",
          value: "russian"
        },
        {
          name: "Spanish",
          value: "spanish"
        },
        {
          name: "Swedish",
          value: "swedish"
        },
        {
          name: "Turkish",
          value: "turkish"
        },
        {
          name: "Vietnamese",
          value: "vietnamese"
        }
      ]
    }
  ]

  const Filteroptions = ({ filter }) => {

    const [open, setOpen] = useState(true);

    const [more, setMore] = useState(false);

    return <div className='border-y border-slate-300 select-none '>

      <div onClick={() => setOpen(!open)} className='flex font-bold text-xl items-center justify-between  py-4  cursor-pointer'>
        <h1 >{filter?.type}</h1>
        <MdKeyboardArrowDown className={`${open && "-rotate-180 duration-150"}`} />
      </div>

      {
        open && <div className='pb-4 relative'>

          {
            ((filter.options?.length > 5 && !more) ? filter.options.splice(0, 5) : filter.options).map((option, indx) => {
              return <label htmlFor={option.value + indx} key={indx} className='flex gap-3 cursor-pointer py-2'>

                <div className='relative flex items-center justify-center'>
                  <input id={option.value + indx} name={option.value} className='appearance-none checked:bg-black border-2 border-black size-4 peer cursor-pointer' type='checkbox' />
                  <LuCheck className='text-white opacity-0 absolute text-sm peer-checked:opacity-100 pointer-events-none' />
                </div>

                <h2 className='flex-shrink-0 text-[15px]'>{option?.name}</h2>
              </label>
            })
          }

          {
            filter.options?.length > 5 && <>
              {
                !more && <div className=' absolute bottom-0 h-full w-full bg-gradient-to-t from-white to-transparent'></div>
              }
              <button onClick={() => setMore(!more)} className='text-blue-800 hover:text-blue-900 duration-100 relative font-bold text-sm flex items-center gap-1'>Show {!more ? "more" : "less"} <MdKeyboardArrowDown className='size-4' /></button>
            </>
          }


        </div>
      }

    </div>
  }

  return <div className={`${menue ? 'w-0' : 'w-[25%]'} duration-300 overflow-hidden`}>

    {
      filterValues.map((filter, index) => <Filteroptions key={index} filter={filter} />)
    }

  </div>
}

function SearchCourses() {

  const dispatch = useDispatch();

  const term = useParams().searchTerm;

  const user_id = useSelector((state) => state.auth.data._id);

  const { searchTerm, result } = useSelector(state => state.search);

  const [menue, setMenue] = useState(true);

  useEffect(() => {
    dispatch(
      searchCourses({
        user_id,
        searchTerm: term
      })
    );
  }, [term])




  return (
    <div className=' px-5 pt-12'>

      <h1 className='font-bold text-3xl'>{result?.length} results for {`"${searchTerm}"`} </h1>

      <div className='py-5 flex justify-between items-baseline'>

        <div className='flex gap-4'>

          <button onClick={() => setMenue(!menue)} className='flex gap-2 items-center font-bold border border-black p-[11px] py-[16px] rounded-sm hover:bg-[#E3E7EA] duration-100'>
            <IoFilter />
            Filter
          </button>

          <SortBy />
        </div>

        <h2 className='pr-6 font-bold text-base-lg text-[#6A6F73]'>{result?.length} results</h2>

      </div>

      <div className='flex'>

        <FilterMenue menue={menue} />

        <div className='border border-black h-[100vh] flex-grow'>

        </div>

      </div>

    </div>
  )
}

export default SearchCourses
