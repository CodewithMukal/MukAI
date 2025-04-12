import React from 'react'

export const Profile = (props) => {
  return (
    <div>
        <button onClick={props.click} className='w-[50px] h-[50px] cursor-pointer bg-[#D9D9D933] rounded-[50%] font-semibold text-[32px] text-white font-[Montserrat]'>
            {props.letter}
        </button>
    </div>
  )
}
