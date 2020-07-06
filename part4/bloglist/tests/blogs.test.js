const listHelper = require("../utils/list_helper");

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
];

describe("total likes", () => {
  test("empty list", () => {
    expect(listHelper.totalLikes([])).toBe(0);
  });

  test("one blog in the list", () => {
    const blog = [blogs[0]];
    expect(listHelper.totalLikes(blog)).toBe(blogs[0].likes);
  });

  test("list of blogs", () => {
    expect(listHelper.totalLikes(blogs)).toBe(36);
  });
});

describe("favorite blog", () => {
  test("one blog", () => {
    const blog = [blogs[0]];
    expect(listHelper.favoriteBlog(blog)).toEqual(blogs[0]);
  });
  test("blog with most likes", () => {
    const received = listHelper.favoriteBlog(blogs);
    const favorite = blogs[2];
    expect(favorite).toEqual(received);
  });
});

describe("author with most blogs", () => {
  test("most active blogger", () => {
    const biggestAuthor = {
      author: "Robert C. Martin",
      blogs: 3
    };
    expect(listHelper.mostBlogs(blogs)).toEqual(biggestAuthor);
  });
});

describe("author with most likes", () => {
  test("most liked author", () => {
    const mostLiked = {
      author: "Edsger W. Dijkstra",
      likes: 17
    };
    expect(listHelper.mostLikes(blogs)).toEqual(mostLiked);
  });
});
