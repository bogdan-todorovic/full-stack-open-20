import React from "react";
import { useDispatch } from "react-redux";
import { create } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const createAnecdote = event => {
    event.preventDefault();
    dispatch(create(event.target.content.value));
  };

  return ( 
    <div>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div><input name="content" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;