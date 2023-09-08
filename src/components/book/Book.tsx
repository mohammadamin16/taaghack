import React from "react";
import { ApiBook } from "../../core/types";
import styles from "./styles.module.css";
import { Star } from "../star/Star";

interface Props {
  book: ApiBook;
}

export const Book: React.FC<Props> = (props) => {
  return (
    <div className={styles.book}>
      <img className={styles.cover} src={props.book.coverUri} />
      <p>{props.book.title}</p>
      <p>
        {props.book.authors.map((a) => `${a.firstName} ${a.lastName}`).join("")}
      </p>
      <p>{props.book.price}</p>
      <div>
        {[1, 2, 3, 4, 5].map((number) => (
          <Star is_full={number < props.book.rating} />
        ))}
      </div>
    </div>
  );
};
