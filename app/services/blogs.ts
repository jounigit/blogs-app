const blogs = [
  { 
    id: 1, 
    title: "next.js utilizes React Server Components", 
    author: "John Doe", 
    url: "https://nextjs.org/docs", 
    likes: 5 
},
  { 
    id: 2, 
    title: "next.js is built on top of React", 
    author: "Jane Doe", 
    url: "https://reactjs.org/docs/getting-started.html", 
    likes: 3 
},
  {
    id: 3,
    title: "next.js supports both static and dynamic rendering",
    author: "Bob John's boy Smith",
    url: "https://nextjs.org/docs/basic-features/static-site-generation",
    likes: 2
  },
]

let nextId = 4

export const getBlogs = () => {
  return blogs
}

export const getBlogById = (id: number) => {
  return blogs.find(blog => blog.id === id)
}

export const addBlog = (title: string, author: string, url: string) => {
  const newBlog = {
    id: nextId++,
    title,
    author,
    url,
    likes: 0
  }
  blogs.push(newBlog)
}

export const likeBlog = (id: number) => {
  const blog = getBlogById(id)
  if (blog) {
    blog.likes += 1
  }
}