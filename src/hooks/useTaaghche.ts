import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ApiResponse } from "../core/types";
import { getBooks } from "../core/api";

export const useTaaghche = () => {
  const [data, setData] = useState<ApiResponse | undefined>();
  const [loading, setLoading] = useState(false);

  const offlineHandler = () => {
    toast.error("You went offline!");
  };
  const loadBooks = (offset?: string) => {
    setLoading(true);
    getBooks(offset)
      .then((res) => {
        console.log(res.data);
        if (data) {
          setData((prevData) => ({
            ...prevData,
            bookList: {
              ...prevData.bookList,
              books: [...prevData.bookList.books, ...res.data.bookList.books],
            },
            nextOffset: res.data.nextOffset,
          }));
        } else {
          setData(res.data);
        }

        setLoading(false);
      })
      .catch(() => {
        toast.error("Something went wrong!");
      });
  };

  useEffect(() => {
    if (!navigator.onLine) {
      toast.error("You Are Offline!");
    }
    loadBooks();
    window.addEventListener("offline", offlineHandler);
    return () => {
      window.removeEventListener("offline", offlineHandler);
    };
  }, []);
  return { loading, data, loadNewBooks: loadBooks };
};
