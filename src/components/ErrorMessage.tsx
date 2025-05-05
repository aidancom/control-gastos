import React from 'react'

type ErrorMessageProps = {
  children: React.ReactNode
}

const ErrorMessage = ({children}: ErrorMessageProps) => {
  return (
    <p className='bg-red-400 text-white font-bold text-center p-2'>
      {children}
    </p>
  )
}

export default ErrorMessage
