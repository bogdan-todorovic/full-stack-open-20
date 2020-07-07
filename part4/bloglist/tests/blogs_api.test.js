const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");

const api = supertest(app);

const initialBlogs = [
  {
    title: "test 1",
    author: "tester 1",
    url: "/test1"
  },
  {
    title: "test 2",
    author: "tester 2",
    url: "/test2"
  }
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

test("blog posts as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", "application/json; charset=utf-8");
});

test("is id property defined", async () => {
  const response = await api.get("/api/blogs");
  response.body.forEach(blog => {
    expect(blog.id).toBeDefined();
  });
});

test("blog post creation", async () => {
  const newBlog = {
    title: "post test",
    author: "post tester",
    url: "/posttest"
  };
  const postResponse = await api.post("/api/blogs").send(newBlog);
  const getResponse = await api.get("/api/blogs");

  expect(getResponse.body).toHaveLength(initialBlogs.length + 1);
  expect(getResponse.body).toContainEqual(postResponse.body);
});

test("likes property missing", async () => {
  const newBlog = {
    title: "like test",
    author: "like tester",
    url: "/liketest"
  };
  const response = await api.post("/api/blogs").send(newBlog);
  expect(response.body.likes).toBe(0);
});

test("title/url property missing", async () => {
  const newBlog = {
    author: "missing body"
  };
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(400);
});

afterAll(() => {
  mongoose.connection.close();
});
