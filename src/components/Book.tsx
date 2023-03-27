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
  const [image, setImage] = useState("")
  const navigate = useNavigate();

  const handleBookDetails = ()=>{
    setCurrentBook(book);
    navigate(`/book/${book.id}`)
  }

  useEffect(() => {
    // const base64String = Buffer.from(book.cover.data, 'binary').toString('base64');
    // const base64String = book.cover.data.toString("base64");
    const blob = new Blob([book.cover.data], { type: 'image/jpeg' });
      const url = URL.createObjectURL(blob);
    setImage(`${url}`)
  }, [])

  return (
    <div onClick={handleBookDetails} className='cursor-pointer mr-8 mb-9'>
      <img className='w-48 h-[20rem] rounded-xl drop-shadow-book' src={image} alt="" />
      <p className='italic font-bold'>{book.name}</p>
      <p className='text-gray-500 text-sm'>{book.author}</p>
    </div>
  )
}

export default Book