import React, { useEffect, useRef, useState } from 'react'
import { IoIosHeart, IoIosHeartEmpty, IoMdCheckmark } from 'react-icons/io';
import { IoFilter } from 'react-icons/io5';
import { LuCheck } from 'react-icons/lu';
import { MdKeyboardArrowDown, MdKeyboardArrowLeft } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import Rating from '@/components/Rating';
import { searchCourses } from '@/Redux/Slices/searchSlice';
import { getConfig, updateCart, updateFavourite } from '@/Redux/Slices/UserConfigSlice';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';



const SortBy = ({ setSorting }) => {

  return <div className='border border-black rounded-sm  w-44 hover:bg-[#E3E7EA] duration-100 text-left relative flex items-center'>
    <h1 className='text-xs font-bold px-[11px] absolute top-1 pointer-events-none'>Sort by</h1>
    <MdKeyboardArrowDown className='absolute right-2 size-5 pointer-events-none' />

    <select onChange={(e) => setSorting(e.target?.value)} id='sortSelect' className='appearance-none outline-none bg-transparent h-full w-full pt-4 px-4 flex-grow cursor-pointer'>
      <option defaultChecked value="">Most Relevant</option>
      <option value="reviewed">Most Reviewed</option>
      <option value="date">Newest</option>
      <option value="rating">Highest Rated</option>
    </select>

  </div>
}

const FilterMenue = ({ menue, setAppliedFilters, appliedfilters }) => {

  const filterValues = [
    {
      type: 'Rating',
      options: [
        {
          name: '4.5 & up',
          value: 4.5
        },
        {
          name: '4.0 & up',
          value: 4.0
        },
        {
          name: '3.5 & up',
          value: 3.5
        },
        {
          name: '3.0 & up',
          value: 3.0
        }
      ]
    },

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

    const onEnableFilter = (type, value) => {
      type = type.toLowerCase();

      let state = { ...appliedfilters };

      if (state[type] === value) {
        delete state[type];
      } else {
        state = { ...state, [type]: value };
      }

      setAppliedFilters(state);

    };


    return <div className='border-y border-slate-300 select-none '>

      <div onClick={() => setOpen(!open)} className='flex font-bold text-xl items-center justify-between  py-4  cursor-pointer'>
        <h1 >{filter?.type}</h1>
        <MdKeyboardArrowDown className={`${open && "-rotate-180 duration-150"}`} />
      </div>

      {
        open && <div className='pb-4 relative'>

          {
            ((filter.options?.length > 5 && !more) ? filter.options.slice(0, 5) : filter.options).map((option, indx) => {
              return <label onClick={() => onEnableFilter(filter?.type, option?.value)} htmlFor={option.value + indx} key={indx} className='flex gap-3 cursor-pointer py-2'>

                <div className='relative flex items-center justify-center'>
                  <input checked={appliedfilters[filter?.type?.toLowerCase()] === option?.value} id={option.value + indx} name={option.value} className={`appearance-none  border-2 border-black size-4 peer cursor-pointer ${filter?.type == 'Rating' ? "rounded-full" : "checked:bg-black"} `} type='checkbox' />
                  {
                    filter?.type !== 'Rating' ? <LuCheck className='text-white opacity-0 absolute text-sm peer-checked:opacity-100 pointer-events-none' /> : <div className='bg-black size-2 opacity-0 rounded-full absolute peer-checked:opacity-100 pointer-events-none'></div>
                  }


                </div>

                {
                  filter?.type == 'Rating' ? <div className='flex text-sm gap-1'><Rating total={option.value} flag={false} /> {option?.name} </div> : <h2 className='flex-shrink-0 text-[15px]'>{option?.name}</h2>
                }


              </label>
            })
          }

          {
            filter.options?.length > 5 && <>
              {
                !more && <div className=' absolute bottom-0 h-full w-full bg-gradient-to-t from-white to-transparent pointer-events-none'></div>
              }
              <button onClick={() => setMore(!more)} className='text-blue-800 hover:text-blue-900 duration-100 relative mt-2  font-bold text-sm flex items-center gap-1'>Show {!more ? "more" : "less"} <MdKeyboardArrowDown className='size-4' /></button>
            </>
          }


        </div>
      }

    </div>
  }

  return <div className={`${!menue ? 'w-0' : 'w-[25%]'} duration-300 overflow-hidden flex-shrink-0`}>

    {
      filterValues.map((filter, index) => <Filteroptions key={index} filter={filter} />)
    }

  </div>
}

const Card = ({ course }) => {

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.config.cart);

  const inCart = cart.some((value) => value._id === course?._id);

  const favourite = useSelector((state) => state.config.favourite);

  const infavourite = favourite?.some((value) => value._id === course?._id);

  const [isNearBottom, setNearBottom] = useState(false);

  const [hover, sethover] = useState(false);

  const cardRef = useRef(null);

  const addToCart = () => {
    dispatch(updateCart([
      {
        add: course?._id
      },
      course
    ]));

    removeFromFavourite();
  }

  const addToFavourite = async () => {

    await dispatch(updateCart([
      {
        remove: course?._id
      }
    ]));

    await dispatch(updateFavourite([
      {
        add: course?._id
      },
      course
    ]))

    dispatch(getConfig())

  }

  const removeFromFavourite = () => {
    dispatch(updateFavourite([
      {
        remove: course?._id
      },
      course
    ]))
  }

  const checkPosition = () => {
    const cardBottom = cardRef?.current?.getBoundingClientRect()?.bottom;
    setNearBottom(cardBottom + 150 > window.innerHeight);
  };

  useEffect(() => {

    checkPosition();

    const handleScroll = () => {
      checkPosition();
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return <div ref={cardRef} onMouseEnter={() => sethover(true)} onMouseLeave={() => sethover(false)} className='flex border-b border-slate-400 py-4 select-none cursor-pointer relative justify-center'>

    <Link to={`/course/${course._id}`} className='flex gap-4 w-full'>
      <div className='h-[134px] w-60 flex-shrink-0 relative'>
        <img className='h-full w-full object-cover' src={course?.thumbnail?.secure_url} alt="" />
        <div className={`${hover ? "opacity-20" : "opacity-0"} duration-200 h-full w-full bg-black absolute top-0 z-10 `}></div>
      </div>

      <div className='w-[50%] space-y-[3px]'>
        <h1 className='font-bold'>{course?.title}</h1>

        <h3 className='text-sm'>{course?.subtitle}</h3>

        <h4 className='text-xs text-slate-500'>{course?.instructor}</h4>

        <Rating total={course?.averageRating?.toFixed(1) || 0} count={course?.totalRatings} color='#B4690E' size='text-sm' flag={true} />

        <div className='text-slate-500 text-xs'> 61.5 total hours • 373 lectures • {course?.level} </div>

      </div>

      <h1 className='font-bold ml-auto mr-2'>₹{course?.price}</h1>

    </Link>

    {
      hover && (
        <div className={`h-[46vh] w-[30vw] bg-white border border-slate-400 absolute rounded-lg px-6  py-2 shadow-2xl space-y-4 ${isNearBottom ? "-top-[272px]" : "-bottom-[272px]"} animate-in  z-[60]`}>

          <div className={` bg-white size-7 absolute left-[170px]  -rotate-45 shadow-2xl  ${!isNearBottom ? " border-t-2 border-r-2 -top-[15px]" : "border-b-2 border-l-2 -bottom-[15px]"}`}></div>

          <h2 className='font-bold'>What you’ll learn</h2>

          {
            course?.goals?.objectives?.slice(0, 3)?.map((learn, indx) => <h3 key={indx} className='text-sm flex gap-4 text-slate-900'> <IoMdCheckmark className='flex-shrink-0 mt-1 text-black' /> {learn}</h3>)
          }

          <div className='flex  pt-3'>
            {
              inCart ? (
                <Link to={"/shoppingcart"} className='w-[85%] bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 transition-all duration-150 text-center rounded-md'> Go to cart</Link>
              ) : (
                <button onClick={addToCart} className='w-[85%] bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 transition-all duration-150 rounded-md'> Add to cart</button>
              )
            }

            {
              infavourite ? (
                <div onClick={removeFromFavourite} className='border border-black p-3 rounded-full ml-auto hover:bg-[#E3E7EA] transition-all duration-150 cursor-pointer flex size-11 items-center justify-center '>
                  <IoIosHeart className='size-6 flex-shrink-0  ' />
                </div>
              ) : (
                <div onClick={addToFavourite} className='border border-black p-2 rounded-full ml-auto hover:bg-[#E3E7EA] transition-all duration-150 cursor-pointer size-11 flex items-center justify-center'>
                  <IoIosHeartEmpty className='size-6 flex-shrink-0  ' />
                </div>
              )
            }


          </div>

        </div>
      )
    }

  </div>
}

function SearchCourses() {

  const dispatch = useDispatch();

  const term = useParams().searchTerm;

  const user_id = useSelector((state) => state.auth.data._id);

  const { searchTerm, result, total, limit } = useSelector(state => state.search);

  const [menue, setMenue] = useState(true);

  const [appliedfilters, setAppliedFilters] = useState({});

  const [sorting, setSorting] = useState({});

  const [page, setPage] = useState(1);

  const totalPage = Math.round(total / limit);

  useEffect(() => {
    dispatch(
      searchCourses({
        user_id,
        searchTerm: term,
        ...appliedfilters,
        sortBy: sorting,
        sortOrder: "desc",
        page
      })
    );
  }, [appliedfilters, sorting, term, page]);

  useEffect(() => {
    setPage(1)
  }, [searchTerm, appliedfilters]);

  // useEffect(() => {
  //   dispatch(
  //     searchCourses({
  //       user_id,
  //       searchTerm: term
  //     })
  //   );
  // }, [term])




  return (
    <>

      {
        result?.length > 0 && (
          <div className=' px-5 pt-12'>

            <h1 className='font-bold text-3xl'>{total} results for {`"${searchTerm}"`} </h1>

            <div className='py-5 flex justify-between items-baseline'>

              <div className='flex gap-4'>

                <button onClick={() => setMenue(!menue)} className='flex gap-2 items-center font-bold border border-black p-[11px] py-[16px] rounded-sm hover:bg-[#E3E7EA] duration-100'>
                  <IoFilter />
                  Filter
                  {
                    Object.keys(appliedfilters).length > 0 && <> ({Object.keys(appliedfilters).length})</>
                  }
                </button>

                <SortBy setSorting={setSorting} />

                {
                  Object.keys(appliedfilters).length > 0 && <button onClick={() => setAppliedFilters({})} className='text-blue-800 hover:text-blue-900 duration-100 font-bold'>Clear filters</button>
                }

              </div>

              <h2 className='pr-6 font-bold text-base-lg text-[#6A6F73]'>{total} results</h2>

            </div>

            <div className='flex gap-5 pb-40'>

              <FilterMenue menue={menue} setAppliedFilters={setAppliedFilters} appliedfilters={appliedfilters} />

              <div className='flex-grow space-y-4 min-w-[70vw]'>

                {
                  result?.map((course, indx) => <Card key={indx} course={course} />)
                }

                {
                  totalPage > 1 && <div className='flex ml-40 items-center gap-3 select-none pt-9'>

                    <div onClick={() => page != 1 && setPage(page - 1)} className={`border border-black rounded-full p-1  duration-100  ${page == 1 ? "opacity-50 cursor-not-allowed " : "cursor-pointer hover:bg-[#E3E7EA]"}`}>
                      <MdKeyboardArrowLeft className='size-6' />
                    </div>

                    <h3
                      onClick={() => setPage(1)}
                      className={`text-blue-800 font-bold cursor-pointer relative px-[3px] ${page === 1 ? 'activePage' : ''}`}
                    >
                      1
                    </h3>

                    <h3
                      onClick={() => setPage(2)}
                      className={`text-blue-800 font-bold cursor-pointer relative px-1 ${page === 2 ? 'activePage' : ''}`}
                    >
                      {page > 2 ? <HiOutlineDotsHorizontal /> : 2}

                    </h3>

                    <h3
                      onClick={() => setPage(page > 3 ? page : 3)}
                      className={`text-blue-800 font-bold cursor-pointer relative px-1 ${page === (page > 3 ? (page == totalPage ? page - 1 : page) : 3) ? 'activePage' : ''}`}
                    >
                      {page > 3 ? (page == totalPage ? page - 1 : page) : 3}

                    </h3>

                    <h3
                      onClick={() => setPage("x")}
                      className={`text-blue-800 font-bold cursor-pointer relative px-1 ${page === "x" ? 'activePage' : ''}`}
                    >
                      <HiOutlineDotsHorizontal />

                    </h3>

                    <h3
                      onClick={() => setPage(50)}
                      className={`text-blue-800 font-bold cursor-pointer relative px-1 ${page === totalPage ? 'activePage' : ''}`}
                    >
                      {totalPage}

                    </h3>



                    <div onClick={() => page != totalPage && setPage(page + 1)} className={`border border-black rounded-full p-1 hover:bg-[#E3E7EA] duration-100 cursor-pointer ${page == totalPage ? "opacity-50 cursor-not-allowed " : "cursor-pointer hover:bg-[#E3E7EA]"}`}>
                      <MdKeyboardArrowLeft className='size-6 rotate-180' />
                    </div>

                  </div>
                }

              </div>

            </div>

          </div>
        )
      }

      {
        result?.length === 0 && (
          <div className='px-8 py-12 space-y-7'>
            <h1 className='text-2xl font-bold'> Sorry, we couldn't find any results for &quot;{searchTerm}&quot; </h1>

            <h3 className='text-lg font-bold text-[#2D2F31]'>Try adjusting your search. Here are some ideas:</h3>

            <ul className='list-disc pl-6 space-y-1'>
              <li>Make sure all words are spelled correctly</li>
              <li>Try different search terms</li>
              <li>Try more general search terms</li>
            </ul>

          </div>
        )
      }

    </>
  )
}

export default SearchCourses
