import axios from "axios";

const url = `https://book-reader-backend.vercel.app/api/v1`
// const url = `http://localhost:8000/api/v1`;

export const getAllBooks = async () => {
  const result = await axios.get(`${url}/books`);
  return result.data;
};

export const getBookById = async (id: number) => {
  const result = await axios.get(`${url}/book/${id}`);
  return result.data;
};
export const ratingBook = async (id: number, rating: number) => {
  let payload: any = { rating };
  const result = await axios.post(`${url}/rateBook/${id}`, payload);
  return result.data;
};
export const addBook = async (payload: any) => {
  const result = await axios.post(`${url}/addBook`, payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return result.data;
};
export const deleteBook = async (id: number) => {
  const result = await axios.delete(`${url}/deleteBook/${id}`);
  return result.data;
};
