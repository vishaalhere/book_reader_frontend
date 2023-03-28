import React, { useEffect, useState } from 'react'
import Button from '../components/Button'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate, useParams } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import { Rating } from '@mui/material';
import { useBooks } from '../context/useBooks';
import { Document, Page } from 'react-pdf';
import { getBookById, ratingBook } from '../service';
import { toast } from 'react-toastify';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';


const BookDetails = () => {
  const { books, currentBook } = useBooks();
  const [book, setBook] = useState(currentBook)
  const classes = {
    container: 'flex items-center justify-center w-full',
    content: 'w-[90%] mt-16 h-[55rem]',
    book: ' mt-6 flex',
    bookImg: 'mr-12 rounded-xl w-[26.5rem]',
    bookDetails: 'flex flex-col justify-between w-[60%] h-[37rem]',
    bookDetails1: 'flex flex-col justify-between h-[17rem]',
    headingImg: 'inline mb-4 mr-2 w-8',
    headingText: 'text-4xl font-semibold text-[#27378C]  mb-2',
    writer: 'text-xl text-[#545454]',
    summary: "",
    booksContainer: 'flex flex-wrap',
    rating: " pr-8 border-r-2 border-gray-200",
    rate: ' ml-8 w-[33%] flex flex-col justify-center'
  }
  const params: any = useParams();
  const navigate = useNavigate();
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(0);
  const [showPdf, setShowPdf] = useState(false)
  const [files, setFiles] = useState(null)

  const backToHome = () => {
    navigate('/')
  }
  useEffect(() => {
    const getBook = async () => {
      const result = await getBookById(params.id);
      setBook(result.book);
    }
    getBook();
  }, [params, showRating])

  const rateBook = async () => {
    if (showRating && rating) {
      const response = await ratingBook(params.id, rating);
      if (response.success) {
        toast.success('Rated Book Successfully!')
      } else {
        toast.error('Try Again Later!')
      }
    }
    setShowRating(!showRating);
  }

  const newplugin = defaultLayoutPlugin()

  const fileType = ['application/pdf']
  const handleFiles = (e: any)=>{
    let selectedFile = e.target.files[0];
    if(selectedFile && fileType.includes(selectedFile.type)){
      let reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = (e: any)=>{
        setFiles(e.target.result)
      }
    }else{
      setFiles(null)
    }
  }

  return (
    <div className={`${classes.container}`}>
      {book && Object.keys(book).length > 0 && <div className={`${classes.content}`}>
        <Button onClick={backToHome} label='Back to Home' icon={<ArrowBackIosIcon style={{ fontSize: '13px', marginBottom: '1px' }} />} />
        <div className={`${classes.book}`}>
          <img className={`${classes.bookImg}`} src={book.cover} alt="" />
          <div className={`${classes.bookDetails}`}>
            <div className={`${classes.bookDetails1}`}>
              <p className={`${classes.headingText}`}>{book.name}</p>
              <p className={`${classes.writer}`}>{book.author}</p>
              <p className={`${classes.writer} mb-5`}>Book Read Time: {book.readTime}</p>
              <p className={`font-semibold`}>{book.description}</p>
            </div>
            <div className='flex'>
              <div className={`${classes.rating}`}>
                <p>Summary</p>
                <div className='flex'>
                  <div className=''>
                    <img className='w-44 h-40' src="/images/ratings.png" alt="" />
                  </div>
                  <div className=''>
                    <span className='text-4xl font-bold'>{book.rating}</span> <StarIcon className='text-[#FFB400] mb-4' />
                    <p className='text-gray-500'>273 Reviews</p>
                    <p className='text-4xl mt-5 font-bold'>88%</p>
                    <p className='text-gray-500'>Recommended</p>
                  </div>
                </div>
              </div>
              <div className={`${classes.rate}`}>
                {showRating ?
                  <>
                    <p className='ml-1'>Rating</p>
                    <Rating
                      className="text-center mb-4"
                      onChange={(e: any) => setRating(e.target.value)}
                      value={rating}
                      size="large" />
                  </> : <p className='mb-5'>You have not rated this book yet. Click on the button to start rating.</p>}
                <Button label="Rate This Book" onClick={rateBook} />
              </div>
            </div>
            <Button label='Read This Book' variant={2} onClick={() => setShowPdf(true)} />
            <input type="file" onChange={handleFiles} />
            
          </div>
        </div>
      </div>}

      {/* <Worker workerUrl='https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js'> */}
        {/* @ts-ignore  */}
        
        {/* {showPdf && <Viewer fileUrl={files} plugins={[newplugin]} />} */}
      {/* </Worker> */}
    </div>
  )
}

export default BookDetails