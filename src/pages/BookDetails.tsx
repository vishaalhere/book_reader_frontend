import { useEffect, useState } from 'react';
import Button from '../components/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate, useParams } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import { Rating } from '@mui/material';
import { useBooks } from '../context/useBooks';
import { getBookById, ratingBook } from '../service';
import {Viewer} from '@react-pdf-viewer/core';
import { toast } from 'react-toastify';
import { Buffer } from 'buffer';
import { bookInterface } from '../context/booksContext';
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const BookDetails = () => {
  const { currentBook } = useBooks();
  const [book, setBook] = useState<bookInterface>(currentBook)
  const classes = {
    container: 'flex items-center justify-center w-full',
    content: 'w-[90%] mt-16 h-[55rem]',
    book: ' mt-6 flex',
    bookImg: 'mr-12 rounded-xl w-[23.5rem] h-[42rem]',
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
  const [image, setImage] = useState("");
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(0);
  const [showPdf, setShowPdf] = useState(false)
  const [pdfUrl, setPdfUrl] = useState<any>("");
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [defaultLayout, setDefaultLayout] = useState();
  
  const handleDefaultLayout = (defaultLayout:any) => {
    setDefaultLayout(defaultLayout);
  };


  function onDocumentLoadSuccess({ numPages }:any) {
    setNumPages(numPages);
  }
  const backToHome = () => {
    navigate('/')
  }

  const arrayBufferToBase64 = (Arraybuffer: any, Filetype: any, fileName: any) => {
    let binary = '';
    const bytes = new Uint8Array(Arraybuffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const file = window.btoa(binary);
    const url = `data:application/pdf;base64,` + file;
    const byteCharacters = atob(file);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const pdfBlob = new Blob([Arraybuffer], { type: 'application/pdf' });
    
    // Generate a URL for the Blob object
    const url2 = URL.createObjectURL(pdfBlob);
    setPdfUrl(url2);
    // let fileUrl = sanitizer.bypassSecurityTrustResourceUrl(url);
    console.log('====================================');
    console.log({url, url2, pdfBlob});
    console.log('====================================');
    // setPdfUrl(url);
    // url for the file

    // download the file
    // const a = document.createElement('a');
    // a.href = url;
    // a.download = fileName;
    // document.body.appendChild(a);
    // a.click();
    // document.body.removeChild(a);
    // window.URL.revokeObjectURL(url);
  }

  useEffect(() => {
    const getBook = async () => {
      const result: any = await getBookById(params.id);
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


  useEffect(() => {
    if (book?.cover?.data) {
      const url = Buffer.from(book.cover.data).toString('base64');
      setImage(`data:image/jpeg;base64,${url}`)
    }
  }, [book])

  return (
    <div className={`${classes.container}`}>
      {book && Object.keys(book).length > 0 && <div className={`${classes.content}`}>
        <Button onClick={backToHome} label='Back to Home' icon={<ArrowBackIosIcon style={{ fontSize: '13px', marginBottom: '1px' }} />} />
        <div className={`${classes.book}`}>
          <img className={`${classes.bookImg}`} src={image} alt="" />
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
            <Button label='Read This Book' variant={2} onClick={() => { setShowPdf(true); arrayBufferToBase64(book.pdf.data, 'pdf', 'document.pdf'); }} />
            {showPdf && <div  style={{ height: '750px' }} className='border-2 border-red-500'>
              <Document
                file={pdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                <Page pageNumber={pageNumber} />
              </Document>
              <p>
                Page {pageNumber} of {numPages}
              </p>
            </div>}
            {/* {
              showPdf && <div className='border-2 border-green-500' style={{ height: '750px' }}>
              <Viewer
                fileUrl={pdfUrl}
              />
            </div>
            } */}
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