import React from "react"
import { NavLink, withRouter } from "react-router-dom"

const categories = [
  {
    name: "all",
    text: "전체보기",
  },
  {
    name: "business",
    text: "비즈니스",
  },
  {
    name: "entertainment",
    text: "엔터테인먼트",
  },
  {
    name: "health",
    text: "건강",
  },
  {
    name: "science",
    text: "과학",
  },
  {
    name: "sports",
    text: "스포츠",
  },
  {
    name: "technology",
    text: "기술",
  },
]

const Categories = ({ match }) => {
  console.log(match)
  return (
    <div className="categories-block flex p-4 w-[768px] my-0 mx-auto md:w-full overflow-x-auto">
      {categories.map((c) => (
        <NavLink
          key={c.name}
          exact={c.name === "all"}
          to={c.name === "all" ? "/" : `/${c.name}`}
          className={`category text-lg cursor-pointer whitespace-pre pb-1 hover:text-[#495057] ml-4 ${
            match.params.category === c.name
              ? "font-semibold border-b-2 border-solid border-[#22b8cf] text-[#22b8cf] hover:text-[#3bc9db]"
              : null
          }`}
        >
          {c.text}
        </NavLink>
      ))}
    </div>
  )
}

export default withRouter(Categories)
