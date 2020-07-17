import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react"

import Blog from "./Blog";

test("blog component", () => {
  const blog = {
    title: "test component",
    author: "tester",
    url: "/test",
    likes: 0
  };
  const component = render(<Blog blog={blog} />);
  expect(component.container).toHaveTextContent("test component");
  expect(component.container).not.toHaveTextContent("tester");
  expect(component.container).not.toHaveTextContent("/test");
});

test("expand button", () => {
  const blog = {
    title: "test component",
    author: "tester",
    url: "/test",
    likes: 0
  };

  const component = render(<Blog blog={blog} />);
  const button = component.getByText("expand");
  fireEvent.click(button);
  expect(component.container).toHaveTextContent("tester");
  expect(component.container).toHaveTextContent("/test");
});

test("like button", () => {
  const blog = {
    title: "test component",
    author: "tester",
    url: "/test",
    likes: 0
  };

  const mockHandler = jest.fn();
  const component = render(<Blog blog={blog} handleLike={mockHandler} />);
  const button = component.getByText("expand");
  fireEvent.click(button);

  const like = component.getByText("like");
  fireEvent.click(like);
  fireEvent.click(like);

  expect(mockHandler.mock.calls.length).toBe(2);
});
