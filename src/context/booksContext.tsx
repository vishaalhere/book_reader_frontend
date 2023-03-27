import { createContext, useEffect, useState } from "react";
// @ts-ignore 
import { booksData } from "../data.js";
import { getAllBooks } from "../service.js";

interface bookInterface {
  id: string,
  name: string,
  author: string,
  readTime: string,
  description: string,
  rating:number,
  cover: Blob,
  pdf: Blob,
}
interface booksInterface {
  books: [bookInterface]
}
const defaultProvider = {
  books: [],
  changed: false,
  setChanged: (value: boolean) => null,
  setBooks: (books: booksInterface) => null,
  currentBook: {
    id: "string",
    name: "string",
    author: "string",
    readTime: "string",
    description: "string",
    rating:0,
    cover: "string",
    pdf: "string",
  },
  setCurrentBook: (book: bookInterface) => null
};
const BooksContext = createContext(defaultProvider);


const BooksProvider = ({ children }: any) => {
  const [books, setBooks] = useState(defaultProvider.books);
  const [currentBook, setCurrentBook] = useState({});
  const [changed, setChanged] = useState(false);

  const getBooks = async () => {
    const response: any = await getAllBooks();
    if (response.success) {
      setBooks(response.books);
    } else {
      setBooks([])
    }
  };
  useEffect(() => {
    getBooks()
  }, [changed])

  const values = {
    books,
    setBooks,
    currentBook,
    setCurrentBook,
    setChanged,
    changed
  };

  return (
    // @ts-ignore 
    <BooksContext.Provider value={values}> {children} </BooksContext.Provider>
  );
};

export { BooksContext, BooksProvider };
