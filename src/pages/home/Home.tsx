import React, { useEffect, useState } from "react";
import { getBooks } from "../../core/api";
import { ApiResponse } from "../../core/types";
import { Book } from "../../components/book/Book";
import styles from "./sytles.module.css";
import { toast } from "react-toastify";

export const Home = () => {
  const [data, setData] = useState<ApiResponse | undefined>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!navigator.onLine) {
      toast.error("You Are Offline!");
      return;
    }
    window.addEventListener("offline", (e) => {
      toast.error("You went offline!");
    });
    setLoading(true);

    getBooks()
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Something went wrong!");
      });
  }, []);

  return (
    <div className={styles.home}>
      <div className={styles.book_list}>
        {loading && <p>Loading...</p>}
        {data?.bookList.books.map((b) => (
          <Book book={b} key={b.id} />
        ))}
      </div>
    </div>
  );
};
