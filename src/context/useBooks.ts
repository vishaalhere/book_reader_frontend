
import { useContext } from 'react'
import { BooksContext } from './booksContext'

export const useBooks = () => useContext(BooksContext)