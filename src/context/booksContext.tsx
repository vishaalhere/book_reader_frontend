import { createContext, useEffect, useState } from "react";
import { getAllBooks } from "../service.js";

export interface bookInterface {
  id: number,
  name: string,
  author: string,
  readTime: string,
  description: string,
  rating:number,
  cover: any,
  pdf: any,
}
export interface booksInterface {
  books: [bookInterface]
}
const defaultProvider = {
  books: [],
  changed: false,
  setChanged: (value: boolean) => null,
  setBooks: (books: booksInterface) => null,
  currentBook: {
    id: 0,
    name: "string",
    author: "string",
    readTime: "string",
    description: "string",
    rating:0,
    cover: "any",
    pdf: "any",
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

  const values:any = {
    books,
    setBooks,
    currentBook,
    setCurrentBook,
    setChanged,
    changed
  };

  return (
    <BooksContext.Provider value={values}> {children} </BooksContext.Provider>
  );
};

export { BooksContext, BooksProvider };
