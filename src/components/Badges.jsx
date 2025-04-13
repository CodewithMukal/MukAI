import React from 'react'

export const Badges = (props) => {
  return (
    <button onClick={props.onClick} className='w-[65px] h-[65px] cursor-pointer rounded-[13px] bg-[#D9D9D91A] hover:bg-[#D9D9D94D] flex justify-center items-center'>
        <img src={props.image} alt="" />
    </button>
  )
}
