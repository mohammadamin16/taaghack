import React from "react";
import { useParams } from "react-router-dom";
import { useTaaghche } from "../../hooks/useTaaghche";
import { Book } from "../../components/book/Book";

export const Single = () => {
  const { bookId } = useParams();
  const { data, loading } = useTaaghche();

  const selectedBook =
    data && data.bookList.books.find((b) => b.id === Number(bookId));

  return (
    <div>
      {selectedBook && (
        <div>
          <Book book={selectedBook} />

          <p>{selectedBook.publisher}</p>
          <p>{selectedBook.PhysicalPrice}</p>
          <p>{selectedBook.numberOfPages}</p>
          <p>{selectedBook.destination}</p>
          {/* There was no descriptionis :) */}
          
        </div>
      )}
    </div>
  );
};
