import React, { useEffect, useRef, useState } from 'react'
import { IoIosHeartEmpty } from 'react-icons/io';
import { MdCheck } from 'react-icons/md';

import Rating from './Rating'
import { Link } from 'react-router-dom';

function Card({ data, orignalPrice, currentIndex, cnum }) {

  const [visible, setVisible] = useState(false);

  const cardRef = useRef(null);

  console.log(currentIndex, cnum, "current index and cnum", cnum <= currentIndex + 3, data?.title);


  const isNearRight = !(cnum <= currentIndex + 3);

  // useEffect(()=>{

  //   const cardRight = cardRef?.current?.getBoundingClientRect()?.right;

  //   setIsNearRightEdge( cardRight + 400  > window.innerWidth );

  // },[])


  return (
    <Link to={`/course/${data?._id}`}>
      <div ref={cardRef} onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)} className='w-52 relative cursor-pointer group flex-shrink-0'>
        <img className='h-36 object-cover w-full group-hover:contrast-75 transition-all duration-150' src={data?.thumbnail?.secure_url} alt="" />
        <h1 className='font-bold text-lg  line-clamp-2'>{data?.title}</h1>
        <h3 className='text-sm text-[#6A6F85]'>{data?.instructor?.username}</h3>
        <Rating total={"5.0"} count={1} />
        <div className='flex space-x-3 items-center'>
          <h2 className='font-bold'>₹{data?.price}</h2>
          <h3 className='line-through text-sm text-[#6A6F73]'>₹{orignalPrice}</h3>
        </div>

        {/* hover  card */}

        <div className={`opacity-0 absolute ${isNearRight ? "top-0 -left-[365px] pr-[30px]" : "top-0 -right-[365px] pl-[30px]"} z-20  cursor-default ${visible ? "opacity-100 pointer-events-auto duration-300 transition-opacity " : "pointer-events-none"}  `}>
          <div className={` w-[340px] bg-white border-2 box-border shadow-xl p-6 space-y-2 cursor-default
          }`}

          >


            <h1 className='text-lg font-semibold hover:text-[#3B198F] duration-150 transition-all cursor-pointer'>{data?.title}</h1>
            <ol className='flex text-xs gap-2 text-[#3f4243]'>
              <li> 9.5 total hours</li>
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

            <div className='flex'>
              <button className='w-[80%] bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 transition-all duration-150'> Add to cart</button>

              <div className='border border-black p-2 rounded-full ml-auto hover:bg-[#E3E7EA] transition-all duration-150 cursor-pointer'>
                <IoIosHeartEmpty className='size-6' />
              </div>

            </div>

          </div>
        </div>

      </div>
    </Link>
  )
}

export default Card
