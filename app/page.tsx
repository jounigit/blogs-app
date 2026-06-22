
export default function Home() {
  console.log('hello next.js')
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div>
        <h1 className="">Blogs app</h1>
        An example app for{" "}
        <a href="https://courses.mooc.fi/org/uh-cs/courses/full-stack-open-nextjs">
          Full Stack Open Next.js
        </a>
      </div>
      <div>
        See{" "}
        <a href="https://github.com/fullstack-hy2020/nextjs-notes">
          https://github.com/fullstack-hy2020/nextjs-notes
        </a>{" "}
        for the source code
      </div>
    </div>
  );
}
