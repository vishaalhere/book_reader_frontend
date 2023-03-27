import axios from "axios";

export const getAllBooks = async () => {
  const result = await axios.get(`http://localhost:8000/api/v1/books`);
  return result.data;
};

export const getBookById = async (id: number) => {
  const result = await axios.get(`http://localhost:8000/api/v1/book/${id}`);
  return result.data;
};
export const ratingBook = async (id: number, rating: number) => {
  let payload: any = { rating };
  const result = await axios.post(
    `http://localhost:8000/api/v1/rateBook/${id}`,
    payload
  );
  return result.data;
};
export const addBook = async (payload: any) => {
  const result = await axios.post(
    `http://localhost:8000/api/v1/addBook`,
    payload,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return result.data;
};
