import React, { useRef, useState } from 'react'
import { FaPlus } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { RxHamburgerMenu } from 'react-icons/rx';

function DragInputList({ iscount = true, name, state, placeholders, addActive=false }) {

  const [data, setData] = state;

  const defaultLength = useRef(data[name].length);
  // console.log( defaultLength.current <= data[name].length);
  // console.log( defaultLength.current , data[name].length);
  const draggingItem = useRef();

  const dragOverItem = useRef();
  
  const dragRef = useRef();

  const [draggingIndex, setDraggingIndex] = useState(null);

  const handleDragStart = (e, indx) => {
    draggingItem.current = indx;
    setDraggingIndex(draggingItem.current);
    e.dataTransfer.setDragImage(dragRef.current, 760, 0);
  };

  const handleDragEnter = (e, indx) => {
    e.preventDefault()
    dragOverItem.current = indx;

    const newList = [...data[name]];

    const [draggedItem] = newList.splice(draggingItem.current, 1);

    newList.splice(dragOverItem.current, 0, draggedItem);

    draggingItem.current = dragOverItem.current;

    setDraggingIndex(draggingItem.current);

    setActive(dragOverItem.current)

    dragOverItem.current = null;

    setData({ ...data, [name]: newList })


  }



  const handleUserInput = (e, indx) => {
    const { name, value } = e.target;

    let updated = [...data[name]];
  
    updated[indx] = value;
  
    setData({ ...data, [name]: updated });
  };
  

  const addMoreObj = (key) => {
    let updated = [...data[key]]; 
     
    if (updated.some((value) => value.trim() === "")) {
      return;
    }
  
   
    updated.push("");
  
    setData({ ...data, [key]: updated });
  };
  

  const [active, setActive] = useState(undefined);

  const getPlaceholder = (index) => placeholders[index % placeholders.length];

  const remove = (indx)=>{
    if(data[name].length <= defaultLength.current ) return;

        const newList = [...data[name]];
        newList.splice(indx,1)
        setData({...data , [name]: newList})
  }


  return (
    <div className=' pt-2'>
      {
        data?.[name].map((text, indx) => (
          <div ref={active==indx ? dragRef : null}
            onDragStart={(e)=> handleDragStart(e,indx)}
            onDragEnter={(e)=> handleDragEnter(e,indx)}
            onDragEnd={()=>{setDraggingIndex(null); }}
            onDragOver={(e)=>e.preventDefault()}
            key={indx}
            onMouseEnter={() => setActive(indx)}
            onMouseLeave={() => setActive(undefined)}
            className={`relative  py-2 `}
            style={{opacity: 1}}
          >

            <input
              onChange={(e) => {
                handleUserInput(e, indx)
              }}
              className={`border border-black focus:outline-none px-4 py-[10px] pr-14 w-[87%] placeholder:text-slate-600 draggable-item ${draggingIndex === indx ? 'dragging' : ''}`}
              type="text"
              placeholder={getPlaceholder(indx)}
              maxLength={160}
              value={text}
              name={name} />

            <h4
              className={`absolute top-5 right-[118px] ${!iscount && "hidden"}`}>
              {160 - data[name][indx].length}
            </h4>

            <div
              className={`flex absolute right-[9px] top-2 border border-black h-[75%] w-[12%] ${(active !== indx || text.length==0) ? "opacity-0 pointer-events-none" : ""} duration-75`} >

              <div onClick={()=>{remove(indx)}} 
              className={`h-full  w-[50%] border-x  border-black flex hover:bg-[#E3E7EA] cursor-default  ${data[name].length <= defaultLength.current  ? "cursor-not-allowed": "cursor-pointer" }`}
              >
                <MdDelete className={`size-6  m-auto `} />
                </div>

              <div draggable className='h-full  w-[50%]  flex border-l border-black hover:bg-[#E3E7EA] cursor-move '><RxHamburgerMenu className='size-6 m-auto ' /></div>

            </div>

          </div>
        ))
      }

      <button onClick={() => addMoreObj(name)} className={`${addActive &&  "hidden"} items-center gap-2 pt-4 font-bold text-blue-700 hover:text-blue-800 duration-75 flex cursor-pointer`}>
        <FaPlus />
        Add more to your response</button>
    </div>
  )

}

export default DragInputList
