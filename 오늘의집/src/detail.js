const $title = document.querySelector('.title')
const $content = document.querySelector('.post-content')
const $coverImage = document.querySelector('.cover-image')
const $profileImage = document.querySelector('.profile-image')
const $profileDetailNickname = document.querySelector('.profile-detail-nickname');


const pageId = new URLSearchParams(window.location.search).get("id");

const fetchPost = async () => {
  const response = await fetch(`http://localhost:1234/posts/${pageId}`, {
    headers: {
      'Content-Type' : 'application/json'
    },
  })
  const post = await response.json()
  return post
}

fetchPost().then((post) => {
  console.log(post)
  $title.innerText = post.title
  $content.innerText = post.content
  $coverImage.src = post.image
  $profileImage.src = post.authorImage
  $profileDetailNickname.innerText = post.author
}).catch(error => {
  console.error(error)
})