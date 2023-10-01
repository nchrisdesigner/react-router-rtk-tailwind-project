import React from 'react'
import { Link } from 'react-router-dom'
import SearchOrder from '../order/SearchOrder'
import Username from '../user/Username'

const Header = () => {
  return (
    <header className='flex flex-col md:flex-row  items-center justify-between bg-yellow-500 font-semibold px-4 py-4 border-b border-yellow-600 sm:py-6'>
        <Link className='text-xl sm:text-2xl tracking-wide py-4 inline-block' to='/'>Fast React Pizza Co</Link>
        <SearchOrder />
        <Username />
    </header>
  )
}

export default Header