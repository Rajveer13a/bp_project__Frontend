import React, { useEffect, useRef, useState } from 'react'
import { FaHeart } from 'react-icons/fa';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import { MdCheck } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getConfig, updateCart, updateFavourite } from '@/Redux/Slices/UserConfigSlice';

import Rating from './Rating'

function Card({ data, orignalPrice, currentIndex, cnum }) {

  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);

  const cardRef = useRef(null);

  const cart = useSelector((state) => state.config.cart);

  const favourite = useSelector((state) => state.config.favourite);

  const infavourite = favourite?.some((value) => value._id === data?._id);

  const inCart = cart.some((value) => value._id === data?._id);


  const isNearRight = !(cnum <= currentIndex + 3);

  const addToCart = () => {
    dispatch(updateCart([
      {
        add: data?._id
      },
      data
    ]));

    removeFromFavourite();
  }

  const addToFavourite = async () => {

    await dispatch(updateCart([
      {
        remove: data?._id
      }
    ]));

    await dispatch(updateFavourite([
      {
        add: data?._id
      },
      data
    ]))

    dispatch(getConfig())

  }

  const removeFromFavourite = () => {
    dispatch(updateFavourite([
      {
        remove: data?._id
      },
      data
    ]))
  }

  // useEffect(()=>{

  //   const cardRight = cardRef?.current?.getBoundingClientRect()?.right;

  //   setIsNearRightEdge( cardRight + 400  > window.innerWidth );

  // },[])


  return (

    <div ref={cardRef} onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)} className='w-56 relative cursor-pointer group flex-shrink-0'>
      <Link to={`/course/${data?._id}`}>
        <img className='h-32 object-cover w-full group-hover:contrast-75 transition-all duration-150' src={data?.thumbnail?.secure_url} alt="" />
        <h1 className='font-bold line-clamp-2'>{data?.title}</h1>
        <h3 className='text-sm text-[#6A6F85]'>{data?.instructor?.username}</h3>
        <Rating total={ Math.round(data?.averageRating * 10)/10 || 0} count={data?.totalRatings} />
        <div className='flex space-x-3 items-center'>
          <h2 className='font-bold'>₹{data?.price}</h2>
          <h3 className='line-through text-sm text-[#6A6F73]'>₹{orignalPrice}</h3>
        </div>
      </Link>

      {/* hover  card */}

      <div className={`opacity-0 absolute ${isNearRight ? "-left-[360px] pr-[30px]" : "-right-[360px] pl-[30px]"} z-20  cursor-default ${visible ? "opacity-100 pointer-events-auto duration-300 transition-opacity " : "pointer-events-none"}  -top-11  `}>
        <div className={` w-[340px] bg-white border-2 box-border shadow-xl p-6 space-y-2 cursor-default
          }`}

        >

          <div className={` bg-white size-7 absolute top-[30%]  rotate-45 shadow-2xl  ${isNearRight ? "right-4 border-t-2 border-r-2" : "left-4 border-b-2 border-l-2"}`}></div>


          <h1 className='text-lg font-semibold hover:text-[#3B198F] duration-150 transition-all cursor-pointer'>{data?.title}</h1>
          <ol className='flex text-xs gap-2 text-[#3f4243]'>
            <li> {(data.totalDuration/3600).toFixed(1)} total hours</li>
            <li>• {data?.level} </li>
            <li>• Subtitles</li>
          </ol>

          <p className='text-sm'>{data?.subtitle} </p>

          <ul className='text-sm space-y-2'>

            {
              data?.goals?.objectives?.slice(0, 3)?.map((value, indx) => (
                <li key={indx} className='relative pl-8 '> <MdCheck className='size-5 absolute text-[#2D2F31] left-0 top-1' /> <span>{value}</span></li>
              ))
            }

            {/* <li className='relative pl-8 '> <MdCheck className='size-5 absolute text-[#2D2F31] left-0 top-1' /> <span>Transfom your Android Device into an Advance Ethical Hacking Machine</span></li>

            <li className='relative pl-8 '> <MdCheck className='size-5 absolute text-[#2D2F31] left-0' /> <span>Instagram Hacking like pro ATTACKER and make people people aware of such an attack</span></li>

            <li className='relative pl-8 '> <MdCheck className='size-5 absolute text-[#2D2F31] left-0' /> <span>Facebook Hacking like pro ATTACKER and make people people aware of such an attack</span></li> */}

          </ul>

          <div className='flex  pt-3'>
            {
              inCart ? (
                <Link to={"/shoppingcart"} className='w-[80%] bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 transition-all duration-150 text-center'> Go to cart</Link>
              ) : (
                <button onClick={addToCart} className='w-[80%] bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 transition-all duration-150'> Add to cart</button>
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
      </div>

    </div>

  )
}

export default Card
