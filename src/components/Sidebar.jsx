import React from 'react'
import ham from '../assets/ham.svg'
import newIcon from "../assets/new.png"

export const Sidebar = () => {
  return (
    <div className='absolute top-0 left-0 w-[100px] h-[100vh] bg-[#232530] flex flex-col justify-start pt-[22px] gap-16 items-center'>
        <button>
            <img src={ham} alt="" />
        </button>
        <button>
            <img src={newIcon} width={52} height={52} alt="" />
        </button>
    </div>
  )
}
