;(() => {
  const get = (target) => document.querySelector(target)
  const $posts = get(".posts")
  const $loader = get(".loader")
  const limit = 10
  let total = 10
  let currentPage = 1
  let end = 100

  const hideLoader = () => {
    $loader.classList.remove("show")
  }

  const showLoader = () => {
    $loader.classList.add("show")
  }

  const showPosts = (posts) => {
    posts.forEach((post) => {
      const $post = document.createElement("div")
      $post.classList.add("post")
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

  const loadPosts = async (currentPage, limit) => {
    showLoader()
    try {
      const response = await fetchPosts(currentPage, limit)
      showPosts(response)
    } catch (error) {
      console.error(error)
    } finally {
      hideLoader()
    }
  }

  const fetchPosts = async (currentPage, limit) => {
    const API_URL = `https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=${limit}`
    const response = await fetch(API_URL)
    if (!response.ok) {
      throw Error("error")
    }
    return await response.json()
  }

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement
    if (total === end) {
      window.removeEventListener("scroll", handleScroll)
      return
    }

    if (scrollTop + clientHeight >= scrollHeight - 5) {
      currentPage++
      total += 10
      loadPosts(currentPage, limit)
      return
    }
  }

  window.addEventListener("DOMContentLoaded", () => {
    loadPosts(currentPage, limit)
    window.addEventListener("scroll", handleScroll)
  })
})()
