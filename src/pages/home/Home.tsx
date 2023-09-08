import { Book } from "../../components/book/Book";
import styles from "./home.module.css";
import { useTaaghche } from "../../hooks/useTaaghche";

export const Home = () => {
  const { data, loading } = useTaaghche();
  return (
    <div className={styles.home}>
      <div className={styles.book_list}>
        {loading && <p>Loading...</p>}
        {data?.bookList.books.map((b) => (
          <Book showMoreButton book={b} key={b.id} />
        ))}
      </div>
    </div>
  );
};
