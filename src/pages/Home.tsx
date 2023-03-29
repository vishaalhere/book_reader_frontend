import Book from '../components/Book';
import AddBook from '../components/AddBook';
import { useBooks } from '../context/useBooks';
import { bookInterface } from '../context/booksContext';

const Home = () => {
  const { books } = useBooks();
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
          {books?.map((ele:bookInterface, i) => {
            return (<Book key={ele.id} book={ele} />)
          })}
          <AddBook />
        </div>
      </div>
    </div>
  )
}

export default Home