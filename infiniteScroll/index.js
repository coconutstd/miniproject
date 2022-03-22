(()=> {
  const get = (target) => document.querySelector(target)
  const $posts = get('.posts')
  
  const showPosts = (posts) => {
    posts.forEach(post => {
      const $post = document.createElement('div')
      $post.classList.add('post')
      $post.innerHTML = `
          <div class="header">
            <div class="id">${post.id}.</div>
            <div class="title">${post.title}</div>
          </div>
          <div class="body">${post.body}</div>
      `
      $posts.appendChild($post)
    })
  }

  const loadPosts = async () => {
    try {
      const response = await fetchPosts()
      showPosts(response)
    } catch(error) {
      console.error(error)
    }
  }

  const fetchPosts = async () => {
    const API_URL = `https://jsonplaceholder.typicode.com/posts`
    const response = await fetch(API_URL)
    if (!response.ok) {
      throw Error('error')
    }
    return await response.json()
  }
  const onScroll = () => {

    
  }
  
  window.addEventListener('DOMContentLoaded', async () => {
    const posts = await loadPosts()
    
  })
})();