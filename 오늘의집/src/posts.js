const getPostTemplate = (post) => {return `
<a href="./detail.html?id=${post.id}">
<div class="posting-wrapper">
  <div class="posting-image-container">
    <img
      src="${post.image}"
      alt="게시글 이미지"
    />
  </div>
  <h2 class="">${post.title}</h2>
  <div class="profile-wrapper">
    <div class="profile-image-container">
      <img
        class="profile-image"
        src="${post.authorImage}"
        alt="profile-image"
      />
    </div>
    <span class="profile-nickname">${post.author}</span>
  </div>
</div>
`}
const $postingContainer = document.querySelector('.posting-container');

const fetchPosts = async () => {
  const response = await fetch('http://localhost:1234/posts', {
    headers: {
      "Content-Type": "application/json"
    }
  })
  const data = await response.json();
  return data
}

const getPostsTemplate = (posts) => {
  return posts.map((post) => getPostTemplate(post)).join("");
}

fetchPosts().then(posts => {
  $postingContainer.innerHTML = getPostsTemplate(posts);
}).catch(error => console.error(error));
