import { Book } from "../../components/book/Book";
import styles from "./home.module.css";
import { useTaaghche } from "../../hooks/useTaaghche";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useInView } from "react-hook-inview";

enum SortOptions {
  MostExpensive = "بیشترین قیمت",
  LeastExpensive = "کمترین قیمت",
  MostPopular = "بیشترین امتیاز",
  LessPopular = "کمترین امتیاز",
}
export const Home = () => {
  const { data, loading, loadNewBooks } = useTaaghche();
  const [selectedPublisher, setSelectedPublisher] = useState("");
  const [sorter, setSorter] = useState<SortOptions>(SortOptions.MostPopular);

  const publishers = useMemo<string[]>(() => {
    if (!data) return [];
    return data.bookList.books.map((b) => b.publisher);
  }, [data]);

  const handleSortOptionChange = (event: SelectChangeEvent) => {
    setSorter((event.target.value as unknown) as SortOptions);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedPublisher(event.target.value);
  };
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView && !loading && data?.hasMore) {
      loadNewBooks(data?.nextOffset);
    }
  }, [inView, data, loading]);
  return (
    <div className={styles.home}>
      <div className={styles.filter_row}>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">قیمت</InputLabel>
          <Select
            value={sorter}
            onChange={handleSortOptionChange}
            label="Filter"
          >
            <MenuItem value={SortOptions.MostPopular}>بیشترین امتیاز</MenuItem>
            <MenuItem value={SortOptions.LeastExpensive}>کمترین قیمت</MenuItem>
            <MenuItem value={SortOptions.MostExpensive}>بیشترین قیمت</MenuItem>
            <MenuItem value={SortOptions.LessPopular}>کمترین امتیاز</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">
            Publisher
          </InputLabel>
          <Select value={selectedPublisher} onChange={handleChange} label="Age">
            <MenuItem value="">No Filter!</MenuItem>
            {publishers.map((p) => (
              <MenuItem key={p} value={p}>
                {p}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className={styles.book_list}>
        {data?.bookList.books
          .sort((b1, b2) => {
            switch (sorter) {
              case SortOptions.LeastExpensive:
                return b1.price - b2.price < 0 ? -1 : 1;
              case SortOptions.LessPopular:
                return b1.rating - b2.rating < 0 ? -1 : 1;
              case SortOptions.MostExpensive:
                return b1.price - b2.price < 0 ? 1 : -1;
              case SortOptions.MostPopular:
                return b1.rating - b2.rating < 0 ? 1 : -1;
            }
          })
          .filter((b) => {
            if (selectedPublisher) {
              return b.publisher === selectedPublisher;
            } else {
              return true;
            }
          })
          .map((b) => (
            <Book showMoreButton book={b} key={b.id} />
          ))}
        {data?.hasMore && <div ref={ref}>Loading...</div>}
      </div>
    </div>
  );
};
