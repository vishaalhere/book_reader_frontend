import React, { ReactNode } from 'react'

interface ButtonProps {
  label: string,
  icon?: ReactNode,
  onClick?: () => void,
  variant?: number,
  type?:any
}

const Button = ({ label, icon, onClick, variant = 1, type='null' }: ButtonProps) => {
  return (
    <button type={type} className={`px-6 py-2 w-max rounded-lg cursor-pointer border-[3px] text-base border-[#27378C] ${variant === 2 ? 'bg-[#27378C] text-white' : ' text-[#27378C]'}`} onClick={onClick}>
      {icon && <span className='mr-2'>{icon}</span>}
      {label}
    </button>
  )
}

export default Button