import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBooks } from '../context/useBooks';
import { Buffer } from 'buffer';
import { bookInterface } from '../context/booksContext';
import Button from './Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteBook } from '../service';
import { toast } from 'react-toastify';

interface BookProps {
  book: bookInterface
}

const Book = ({ book }: BookProps) => {
  const { setCurrentBook, setChanged, changed } = useBooks();
  const [image, setImage] = useState("")
  const navigate = useNavigate();

  const handleBookDetails = () => {
    setCurrentBook(book);
    navigate(`/book/${book.id}`)
  }
  const handleDeleteBook = async () => {
    const resp = await deleteBook(book.id);
    if (resp.success) {
      setChanged(!changed)
      toast.success('Book Deleted')
    } else {
      toast.error('Error Deleting Book! Try Again Later.')
    }
  }

  useEffect(() => {
    const url = Buffer.from(book.cover.data).toString('base64');
    setImage(`data:image/jpeg;base64,${url}`)
  }, [])

  return (
    <div className='group relative cursor-pointer mr-8 mb-9'>
      <div className='z-30 hidden group-hover:flex flex-col justify-center items-center border-4 border-red-500 backdrop-blur-sm absolute w-48 h-[20rem] rounded-xl'>
        <div className='my-2' onClick={handleBookDetails}>
          <Button variant={2} label={'View'} icon={<VisibilityIcon style={{ fontSize: '20px' }}  />}></Button>
        </div>
        <div onClick={handleDeleteBook}>
          <Button variant={2} label={'Delete'} icon={<DeleteIcon style={{ fontSize: '20px' }} />} ></Button>
        </div>
      </div>
      <img className='w-48 h-[20rem] rounded-xl drop-shadow-book' src={image} alt="" />
      <p className='italic font-bold'>{book.name}</p>
      <p className='text-gray-500 text-sm'>{book.author}</p>
    </div>
  )
}

export default Book