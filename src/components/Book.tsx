import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBooks } from '../context/useBooks';

interface BookProps {
  book: {
    id: string,
    name: string,
    author: string,
    readTime: string,
    description: string,
    rating:number,
    cover: any,
    pdf: any,
  }
}

const Book = ({ book }: BookProps) => {
  const { setCurrentBook } = useBooks();
  const navigate = useNavigate();

  const handleBookDetails = ()=>{
    setCurrentBook(book);
    navigate(`/book/${book.id}`)
  }

  return (
    <div onClick={handleBookDetails} className='cursor-pointer mr-8 mb-9'>
      <img className='w-48 h-[20rem] rounded-xl drop-shadow-book' src={book.cover} alt="" />
      <p className='italic font-bold'>{book.name}</p>
      <p className='text-gray-500 text-sm'>{book.author}</p>
    </div>
  )
}

export default Book