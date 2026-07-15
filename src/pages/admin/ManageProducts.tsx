import { useEffect, useState } from 'react'

function ManageProducts() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch(import.meta.env.VITE_BACKEND_URL + "/products/all")
      .then(res => res.json())
      .then(json => setProducts(json))
  }, []);

// TODO: table

	function deleteProduct(id: number) {
		fetch(import.meta.env.VITE_BACKEND_URL + "/products/" + id, {method: "DELETE"})
      .then(res => res.json())
      .then(json => setProducts(json))
	}


  return (
    <table>
			{products.map(product =>
				<div>
					<div>{product.id}</div>
					<div>{product.name}</div>
					<div>{product.price}</div>
					<div>{product.active ? "Aktiivne" : "Mitteaktiivne"}</div>
					<div>{product.image}</div>
					<div>{product.stock}</div>
					<div>{product.category ? product.category.name : "Kategooria puudub"}</div>
					<button onClick={() => deleteProduct(product.id)}>Kustuta</button>
					<button>TODO: Muuda</button>
				</div>
			)}
    </table>
  )
}

export default ManageProducts