import { useEffect, useState } from "react"
import "./Homepage.css"
import { useNavigate, Link } from "react-router-dom"

export const Homepage = () => {
    const navigate = useNavigate()
    const [categories, setCategories] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/categories`)
                .then(res => res.json())
                .then((categoriesArray) => {
                    setCategories(categoriesArray)
                })
        },
        []
    )

    return (
        <main>
            <h1>Reserach Categories</h1>
            <div>
            {categories.map((category) => {
                return <Link to={`/${category.type}`} key={category.id} id={category.id}>{category.type}</Link>
            })}
            </div>
        </main>
    )
}