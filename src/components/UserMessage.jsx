import React from 'react'

export const UserMessage = (props) => {
  return (
    <div className='self-end flex flex-col items-end mr-[10px]'>
          <div>
            <p className='w-[29px] h-[29px] bg-[#D9D9D933] flex justify-center items-center rounded-[50%] text-center font-semibold text-[16px] text-white font-[Montserrat]'>{props.letter}</p>
          </div>
          <p className="bg-[#3586F0] mt-[5px] min-w-[30px] inline-block max-w-[90%] pt-[25px] pb-[25px] pl-[7px] pr-[7px] rounded-b-[13px] rounded-tl-[13px] text-white font-semibold animate-fade-up animate-duration-[500ms]">{props.input}</p>
    </div>
  )
}
