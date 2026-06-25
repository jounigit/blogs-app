import { notFound } from "next/navigation";
import { getUserWithBlogs } from "@/app/services/users";

const UserPage = async ({ params }: { params: { username: string } }) => {
  const { username } = await params
  const user = await getUserWithBlogs(username);

  if (!user) {
    notFound();
  }

  return (
    <div className="m-4">
      <h2 className="text-2xl text-align: start">{user.name}</h2>
      <p>Username: {user.username}</p>
        <h3 className="text-xl text-align: start mt-4">Blogs:</h3>
        <ul className="list-disc pl-5">
          {user.blogs.map(blog => (
            <li key={blog.id}>
              <a href={`/blogs/${blog.id}`} className="font-bold hover:underline">{blog.title}</a>
            </li>
          ))}
        </ul>
    </div>
  );
};

export default UserPage;