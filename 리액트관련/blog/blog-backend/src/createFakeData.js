import Post from "./models/post"

export default function createFakeData() {
  const posts = [...Array(40).keys()].map((i) => ({
    title: `포스트 #${i}`,
    body: "lorem Dolore do pariatur anim reprehenderit anim mollit quis adipisicing deserunt id fugiat dolor adipisicing.",
    tags: ["가짜", "데이터"],
  }))

  Post.insertMany(posts, (err, docs) => {
    console.log(docs)
  })
}
