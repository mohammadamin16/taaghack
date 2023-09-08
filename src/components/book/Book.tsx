import React from "react";
import { ApiBook } from "../../core/types";
import styles from "./styles.module.css";

interface Props {
  book: ApiBook;
}

export const Book: React.FC<Props> = (props) => {
  return <div className={styles.book}>{props.book.title}</div>;
};
