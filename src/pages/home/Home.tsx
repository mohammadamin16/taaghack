import React, { useEffect, useState } from "react";
import { getBooks } from "../../core/api";
import { ApiResponse } from "../../core/types";
import { Book } from "../../components/book/Book";
import styles from "./sytles.module.css";

export const Home = () => {
  const [data, setData] = useState<ApiResponse | undefined>();

  useEffect(() => {
    getBooks().then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  }, []);

  return (
    <div className={styles.home}>
      <div className={styles.book_list}>
        {data?.bookList.books.map((b) => (
          <Book book={b} key={b.id} />
        ))}
      </div>
    </div>
  );
};
