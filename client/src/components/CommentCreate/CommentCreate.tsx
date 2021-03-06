import React, { useState } from "react";
import styles from "../CommentCreate/CommentCreate.module.scss";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { createComment } from "../../features/comment/commentSlice";
import { createCommentSuccess } from "../../features/post/postSlice";
import Message from "../Message/Message";
import { useNavigate } from "react-router-dom";

interface CommentCreateProps {
  postId: string;
}

const CommentCreate = ({ postId }: CommentCreateProps) => {
  const [text, setText] = useState("");
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { message } = useAppSelector((state) => state.comment);
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user && text && postId) {
      dispatch(createComment({ text, postId, token: user.token }));
      dispatch(createCommentSuccess(postId));
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      {message === "Something went wrong creating a comment" && (
        <Message message={message} error={true} />
      )}
      <div className={styles.comment}>
        <form onSubmit={onSubmit}>
          <div className={styles.formGroup}>
            <textarea
              id="text"
              name="text"
              value={text}
              placeholder="Comment Something..."
              onChange={(e) => setText(e.target.value)}
              required
            />
          </div>

          <div>
            <button type="submit" className={styles.btn}>
              Create Comment
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CommentCreate;
