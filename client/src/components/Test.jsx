import { useEffect } from "react";
import { useState } from "react";

const Test = () => {
  let bookTemplate = [
    {
      title: "The Poison King",
      rating: 5,
      cover:
        "http://books.google.com/books/content?id=dKnFZa4LNjQC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    },
    {
      title: "King Arthur",
      rating: 4,
      cover:
        "http://books.google.com/books/content?id=7F7CBAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    },
    {
      title: "The Mermaid, the Witch, and the Sea",
      rating: 1,
      cover:
        "http://books.google.com/books/content?id=O_m5DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    },
    {
      title: "Jack and the Beanstalk",
      rating: 3,
      cover:
        "http://books.google.com/books/content?id=y_sBhDO8glIC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    },
  ];

  const [books, setBooks] = useState(bookTemplate);
  const handleSort = (e) => {
    let sortedBooks = books.map((a) => {
      return { ...a };
    });
    sortedBooks.sort((a, b) => {
      switch (+e.target.value) {
        case 1:
          return a.title.toUpperCase() > b.title.toUpperCase() ? 1 : -1;
        case 2:
          return a.title.toUpperCase() < b.title.toUpperCase() ? 1 : -1;
        case 3:
          return a.rating - b.rating;
        case 4:
          return b.rating - a.rating;
        default:
          break;
      }
    });
    setBooks(sortedBooks);
  };
  const updateUser = () => {
    let user = {
      username: "Nikola",
      email: "nikola@gmail.com",
      avatar: "img-link-1",
      desc: "this is my first description",
      id: "sda123sne21",
    };

    const payload = {
      avatar: "img-link-2",
      desc: "this is my second description",
      nationality: "croatia",
    };

    user = { ...user, ...payload };
    console.log(user);
  };
  useEffect(() => {}, []);
  return (
    <div className="test-container">
      <label htmlFor="sort-value">Choose a sort method:</label>
      <select name="sort-value" onChange={handleSort}>
        <option value={1}>Asc.</option>
        <option value={2}>Desc.</option>
        <option value={3}>Rating Asc.</option>
        <option value={4}>Rating Desc.</option>
      </select>
      {books.map((book) => (
        <div className="book-field" key={book.cover}>
          <img src={book.cover} alt="" className="book-cover" />
          <h2 className="book-rating">{book.rating}</h2>
        </div>
      ))}

      <button onClick={updateUser}>Merge users</button>
    </div>
  );
};

export default Test;
