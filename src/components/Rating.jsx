import React from 'react'
import { IoIosStarHalf, IoIosStarOutline } from 'react-icons/io';
import { IoStar} from 'react-icons/io5';

function Rating({total , count=0 , color="#B4690E",flag=true}) {

        const fullStars = Math.floor(total);
        const halfStars = total % 1;
        const emptyStars = 5 - fullStars - (halfStars ? 1 : 0);

        // console.log("here",halfStars);
        

    return (
        <div className='flex items-center text-sm '>
            {flag && <h1 className='font-bold mr-1'>{total}</h1>}
            
            {
                Array(fullStars).fill().map((_,i)=> <IoStar key={i} style={{ fill: color }} />)
            }

            {
                halfStars !=0 && ((halfStars >= 0.5 && fullStars < 4 ) ? <IoStar  style={{ fill: color }} /> : <IoIosStarHalf style={{ fill: color }}/> )
            }

            {
                Array(emptyStars).fill().map((_,i)=> <IoIosStarOutline key={i} style={{ fill: color }} />)
            }
            

            {flag && <h3 className='ml-1'>({count})</h3>}

        </div>
    )
}

export default Rating
