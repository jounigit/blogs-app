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
    author: "Bob Smith",
    url: "https://nextjs.org/docs/basic-features/static-site-generation",
    likes: 2
  },
]

const Blogs = () => {
  return (
    <div className="m-4">
      {/* h2 bold, black and justify left */}
      <h2 className="text-2xl text-align: start">blogs</h2>
      <ul>
        {blogs.map(blog => (
          <li key={blog.id}>
            <h3>{blog.title}</h3>
            <p>By {blog.author}</p>
            <a href={blog.url} target="_blank" rel="noopener noreferrer">
              Read more
            </a>
            <p>Likes: {blog.likes}</p>
            <p>--------------------------</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default Blogs