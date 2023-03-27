import React, { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Button from '../components/Button';
import AddIcon from '@mui/icons-material/Add';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useDropzone } from 'react-dropzone'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { addBook } from '../service';
import { toast } from 'react-toastify';
import { useBooks } from '../context/useBooks';

const AddBook = () => {
  const {setChanged, changed} = useBooks();
  const classes = {
    container: 'flex items-center justify-center w-full',
    content: 'w-[90%] h-[55rem] mt-16',
    formContainer: "",
    bookCover: " hover:bg-gray-200 text-[#27378C] flex items-center justify-center w-[27%] h-[85vh] rounded-xl border-dashed border-2 border-[#27378C]",
    bookDetails: "w-[67%]",
    input: 'mb-4 rounded-md w-full p-2 px-3 block border-2 border-gray-200 focus:outline-none'
  }
  const [pdfFile, setPdfFile] = useState(null);
  const [image, setImage] = useState(null);
  const [name, setName] = useState("")
  const [author, setAuthor] = useState("")
  const [readTime, setReadTime] = useState("")
  const [description, setDescription] = useState("")
  const [imagePreview, setImagePreview] = useState('/images/white.png')
  const navigate = useNavigate();

  const backToHome = () => {
    navigate('/')
  }
  const fileType = ['application/pdf'];

  const onDrop = useCallback((acceptedFiles: any) => {
    let selectedFile = acceptedFiles[0];
    if (selectedFile && fileType.includes(selectedFile.type)) {
      let reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = (e: any) => {
        setPdfFile(e.target.result)
      }
    } else {
      setPdfFile(null)
    }
  }, [])

  const onDrop2 = useCallback((acceptedFiles: any) => {
    console.log("<<<<<<<<<<<<<<<<<FILES", acceptedFiles[0])
    const reader: any = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setImagePreview(reader.result);
        setImage(reader.result);
      }
    };

    reader.readAsDataURL(acceptedFiles[0]);
  }, [])

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    if (pdfFile && image) {
      formData.append('name', name);
      formData.append('author', author);
      formData.append('readTime', readTime);
      formData.append('description', description);
      formData.append('cover', image);
      formData.append('pdf', pdfFile);

      const resp = await addBook(formData);
      if (resp.success) {
        toast.success('Book Added');
        setChanged(!changed);
        navigate('/');
      }
    }

  }

  console.log("<<<<<<<<<<<<<imagePreview", imagePreview, image)
  const { getRootProps: getRootProps2, getInputProps: getInputProps2 } = useDropzone({ onDrop: onDrop2 })
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div className={`${classes.container}`}>
      <div className={`${classes.content}`}>
        {/* @ts-ignore */}
        <Button onClick={backToHome} label='Back to Home' icon={<ArrowBackIosIcon style={{ fontSize: '13px', marginBottom: '1px' }} />} />
        <form onSubmit={handleSubmit}>
          <div className={`${classes.formContainer} flex justify-between mt-6`}>
            <img
              src={imagePreview}
              alt=""
              className='w-[30%] h-[85vh] border-2 border-gray-400 rounded-xl'
            // style={{ width: '13rem', height: '10rem', borderRadius: '10px', margin: '1rem 1rem' }}
            />
            <div className={`${classes.bookCover} absolute`} {...getRootProps2()}>
              <input
                {...getInputProps2()}
              />
              <div className='text-center'>
                <AddIcon className='mb-5' />
                <p className='underline'>Add a Book Cover</p>
              </div>
            </div>
            <div className={`${classes.bookDetails}`}>
              <div className='flex justify-between w-full mb-1'>
                <span>
                  Name of the Book <span className='text-red-500'>*</span>
                </span>
                <span>
                  <InfoOutlinedIcon className='text-gray-500 cursor-pointer' />
                </span>
              </div>
              <input value={name} onChange={(e) => setName(e.target.value)} className={classes.input} type="text" placeholder={'Enter the published name'} />
              <div className='flex w-full justify-between'>
                <div className='w-[49%]'>
                  <div className='flex justify-between w-full mb-1'>
                    <span>
                      Author of the Book <span className='text-red-500'>*</span>
                    </span>
                    <span>
                      <InfoOutlinedIcon className='text-gray-500 cursor-pointer' />
                    </span>
                  </div>
                  <input value={author} onChange={(e) => setAuthor(e.target.value)} className={classes.input} type="text" placeholder={'Add all the authors comma seperated'} />
                </div>
                <div className='w-[49%]'>
                  <div className='flex justify-between w-full mb-1'>
                    <span>
                      Book read time  <span className='text-red-500'>*</span>
                    </span>
                    <span>
                      <InfoOutlinedIcon className='text-gray-500 cursor-pointer' />
                    </span>
                  </div>
                  <input value={readTime} onChange={(e) => setReadTime(e.target.value)} className={classes.input} type="text" placeholder={'Eg: 6hrs 10mins'} />
                </div>
              </div>
              <div className='flex justify-between w-full mb-1'>
                <span>
                  Book Details <span className='text-red-500'>*</span>
                </span>
                <span>
                  <InfoOutlinedIcon className='text-gray-500 cursor-pointer' />
                </span>
              </div>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} cols={4} rows={4} className='mb-4 resize-none rounded-md w-full p-2 px-3 block border-2 border-gray-200 focus:outline-none' placeholder='Should not be more than 300 words'></textarea>
              {/* Upload PDF  */}
              <div className='flex justify-between mb-1 w-[30%]'>
                <span>
                  Upload PDF <span className='text-red-500'>*</span>
                </span>
                <span>
                  <InfoOutlinedIcon className='text-gray-500 cursor-pointer' />
                </span>
              </div>
              <div className='border-2 border-dashed rounded-md border-[#CCCCCC] w-[30%] h-[23vh] mb-12' {...getRootProps()}>
                <input {...getInputProps()} />
                {
                  isDragActive
                    ?
                    <div className='flex items-center justify-center h-full'>
                      <span>Drop the files here ...</span>
                    </div>
                    :
                    <div className='flex flex-col items-center justify-center h-full'>
                      <CloudUploadIcon className='text-[#27378C] mb-6' style={{ fontSize: '35px' }} />
                      <p className='text-lg'>
                        <span className='text-[#27378C] underline'>Browse</span>
                        &nbsp;or drop files here
                      </p>
                      <p className='text-gray-500 '>Supports PDF; upto 10MB</p>
                    </div>
                }
              </div>
  
              <Button label="Add Book" variant={2} type='submit' />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddBook