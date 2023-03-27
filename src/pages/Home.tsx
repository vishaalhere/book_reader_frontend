import React from 'react'
import Book from '../components/Book'
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom'
import AddBook from '../components/AddBook';
import { useBooks } from '../context/useBooks';

const Home = () => {
  const { books } = useBooks();
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const classes = {
    container: 'flex items-center justify-center w-full',
    content: 'w-[90%] mt-16',
    heading: ' mb-2',
    headingImg: 'inline mb-4 mr-2 w-8',
    headingText: 'text-4xl font-bold ml-4 text-[#27378C]',
    booksContainer: 'flex flex-wrap'
  }
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.heading}>
          <img className={classes.headingImg} src="/images/books-icon.png" alt="" />
          <span className={classes.headingText}>My Books</span>
        </div>
        <div className={classes.booksContainer}>
          {books?.map((ele, i) => {
            return (<Book book={ele} />)
          })}
          <AddBook />
        </div>
      </div>
    </div>
  )
}

export default Home