import React from 'react'

function Input({ count, placeholder, autoFocus = false, onChange, name, value }) {
    return (
        <div className='w-[90%] relative'>
            <input className='border border-black w-full h-[30px] px-3 text-sm placeholder:text-slate-600 focus:outline-none' type="text" placeholder={placeholder} maxLength={count} autoFocus={autoFocus} onChange={onChange} name={name} value={value} />
            <h1 className='absolute top-1 right-4 text-sm text-slate-800'>
                {count - (value?.length || 0)}
            </h1>

        </div>
    )
}

export default Input
