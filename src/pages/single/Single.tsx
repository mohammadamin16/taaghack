import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useTaaghche } from "../../hooks/useTaaghche";
import { Book } from "../../components/book/Book";
import { useScreenshot } from "use-react-screenshot";

// Feature detection
const webShareSupported = "canShare" in navigator;
// Update the button action text.
const textContent = webShareSupported ? "Share" : "Download";

const shareOrDownload = async (blob, fileName, title, text) => {
  // Using the Web Share API.
  console.log(blob);
  if (webShareSupported) {
    const data = {
      files: [
        new File([blob], fileName, {
          type: blob.type,
        }),
      ],
      title,
      text,
    };
    if (navigator.canShare(data)) {
      try {
        await navigator.share(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err.name, err.message);
        }
      }
    }
    // Fallback implementation.
    const a = document.createElement("a");
    a.download = fileName;
    a.style.display = "none";
    a.href = URL.createObjectURL(blob);
    a.addEventListener("click", () => {
      setTimeout(() => {
        URL.revokeObjectURL(a.href);
        a.remove();
      }, 1000);
    });
    document.body.append(a);
    a.click();
  }
};

export const Single = () => {
  const { bookId } = useParams();
  const { data, loading } = useTaaghche();
  const [image, takeScreenshot] = useScreenshot();
  useEffect(() => {
    fetch(image).then((res) =>
      res.blob().then((blob) => {
        shareOrDownload(blob, "fileName.png", "someTitle", "someText");
      })
    );
  }, [image]);

  const selectedBook =
    data && data.bookList.books.find((b) => b.id === Number(bookId));
  const divRef = useRef<HTMLDivElement>(null);
  return (
    <div>
      {selectedBook && (
        <div>
          <Book book={selectedBook} />
          <div ref={divRef} style={{ color: "red" }}>
            <p>{selectedBook.publisher}</p>
            <p>{selectedBook.PhysicalPrice}</p>
            <p>{selectedBook.numberOfPages}</p>
            <p>{selectedBook.destination}</p>
          </div>
          {/* There was no descriptionis :) */}
        </div>
      )}

      <button
        onClick={() => {
          takeScreenshot(divRef.current);
        }}
      >
        {textContent}
      </button>
    </div>
  );
};
