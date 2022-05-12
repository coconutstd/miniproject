import React from "react"

const NewsItem = ({ article }) => {
  const { title, description, url, urlToImage } = article

  return (
    <div className="flex mt-3">
      {urlToImage && (
        <div className="thumbnail mr-4">
          <a href={url} target="_blank" rel="noopener noreferrer">
            <img
              className="block w-[160px] h-[100px] object-cover"
              src={urlToImage}
              alt="thumbnail"
            ></img>
          </a>
        </div>
      )}
      <div className="contents">
        <h2 className="m-0">
          <a
            className="text-black"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {title}
          </a>
        </h2>
        <p className="m-0 leading-normal mt-2 whitespace-normal">
          {description}
        </p>
      </div>
    </div>
  )
}

export default NewsItem
