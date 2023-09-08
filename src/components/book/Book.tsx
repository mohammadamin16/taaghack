import React, { useCallback } from "react";
import { ApiBook } from "../../core/types";
import styles from "./book.module.css";
import { Star } from "../star/Star";
import { useNavigate } from "react-router-dom";

interface Props {
  book: ApiBook;
  showMoreButton?: boolean;
}

export const Book: React.FC<Props> = (props) => {
  const navigate = useNavigate();
  const clickHandler = useCallback(() => {
    navigate(`/book/${props.book.id}`);
  }, [props.book]);
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
          <Star key={number} is_full={number < props.book.rating} />
        ))}
      </div>
      {props.showMoreButton && (
        <button onClick={clickHandler}>جزییات بیشتر</button>
      )}
    </div>
  );
};
