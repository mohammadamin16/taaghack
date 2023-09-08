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

export const Home = () => {
  const { data, loading } = useTaaghche();
  const [selectedPublisher, setSelectedPublisher] = useState("");

  const publishers = useMemo<string[]>(() => {
    if (!data) return [];
    return data.bookList.books.map((b) => b.publisher);
  }, [data]);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedPublisher(event.target.value);
  };

  useEffect(() => {
    console.log("selectedPublisher", selectedPublisher);
  }, [selectedPublisher]);

  return (
    <div className={styles.home}>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">
          Publisher
        </InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={selectedPublisher}
          onChange={handleChange}
          label="Age"
        >
          <MenuItem value="">No Filter!</MenuItem>
          {publishers.map((p) => (
            <MenuItem value={p}>{p}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <div className={styles.book_list}>
        {loading && <p>Loading...</p>}
        {data?.bookList.books
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
      </div>
    </div>
  );
};
