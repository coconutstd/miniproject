import React, { useEffect, useState } from "react"
import NewsItem from "./NewsItems"

const NewsList = ({ category }) => {
  const [articles, setArticles] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const query = category === "all" ? "" : `&category=${category}`
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=6bcfae70fa5e4054a4893cde5f34df8f`
        )
        const data = await response.json()
        setArticles(data.articles)
      } catch (e) {
        console.log(e)
      }
      setLoading(false)
    }
    fetchData()
  }, [category])

  if (loading) {
    return <div>대기 중...</div>
  }

  if (!articles) {
    return null
  }

  return (
    <div className=" box-border pb-12 w-[768px] my-0 mx-auto mt-8 md:w-full md:pl-4 md:pr-4">
      {articles.map((article) => (
        <NewsItem key={article.url} article={article}></NewsItem>
      ))}
    </div>
  )
}

export default NewsList
