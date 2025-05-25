import React from 'react'

const InfoCard = ({icon, label, value, color}) => {
  return (
    <div className='flex gap-6 bg-white p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50'>
        <div className={`w-14 h-14 flex justify-center items-center ${color} text-white  text-[26px] rounded-full drop-shadow-xl`}>
            {icon}
        </div>
        <div className=''>
            <h6 className='text-gray-500 mb-1 text-sm'>{label}</h6>
            <span className='text-[22px]'>${value}</span>
        </div>
    </div>
  )
}

export default InfoCard