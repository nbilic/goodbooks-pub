import { useEffect, useState } from "react";
import axios from "axios";
import apiUrl from "../apiUrl";
import Comment from "./Comment";

const Comments = ({ userBook, newComments }) => {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/books/comments/${userBook}`);
        setComments(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getComments();
  }, []);
  useEffect(() => {
    newComments && setComments([newComments, ...comments]);
  }, [newComments]);
  return (
    <div>
      {comments?.map((comment) => (
        <Comment
          comment={comment}
          setComments={setComments}
          comments={comments}
        />
      ))}
    </div>
  );
};

export default Comments;
