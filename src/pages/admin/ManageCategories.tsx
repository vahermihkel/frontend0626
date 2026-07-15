import { useEffect, useState } from 'react'

function ManageCategories() {
  const [categories, setCategories] = useState<any[]>([]);
	const [newCategory, setNewCategory] = useState<any>({name: ""});

  useEffect(() => {
    fetch(import.meta.env.VITE_BACKEND_URL + "/categories")
      .then(res => res.json())
      .then(json => setCategories(json))
  }, []);

// TODO: table

	function deleteCategory(id: number) {
		fetch(import.meta.env.VITE_BACKEND_URL + "/categories/" + id, {method: "DELETE"})
      .then(res => res.json())
      .then(json => setCategories(json))
	}

	function addCategory() {
		fetch(import.meta.env.VITE_BACKEND_URL + "/categories", {
			method: "POST",
			body: JSON.stringify(newCategory), 
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + sessionStorage.getItem("token")
			}
		})
      .then(res => res.json())
      .then(json => setCategories([...categories, json]))
	}

  return (
    <div>
			<label>Kategooria nimi</label> <br />
			<input onChange={(e) => setNewCategory({name: e.target.value})} type="text" /> <br />
			<button onClick={() => addCategory()}>Lisa</button>

			{categories.map(product =>
				<div>
					<div>{product.id}</div>
					<div>{product.name}</div>
					<button onClick={() => deleteCategory(product.id)}>Kustuta</button>
				</div>
			)}
    </div>
  )
}

export default ManageCategories