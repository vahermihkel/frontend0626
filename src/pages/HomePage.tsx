import { useEffect, useState } from 'react'

function HomePage() {
  const [products, setProducts] = useState<any[]>([]);
	const [page, setPage] = useState(0);
	const [size, setSize] = useState(2);
	const [sort, setSort] = useState("id,asc");
	const [totalPages, setTotalPages] = useState(0);
	const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:8080/products?page=${page}&size=${size}&sort=${sort}`)
      .then(res => res.json())
      .then(json => {
				setProducts(json.content);
				setTotalPages(json.totalPages);
				setTotalElements(json.totalElements);
			})
  }, [page, size, sort]);

	function changeSize(newSize: number) {
		setSize(newSize);
		setPage(0);
	}

  return (
    <div>
				<select onChange={(e) => changeSize(Number(e.target.value))}>
					<option>1</option>
					<option>2</option>
					<option>3</option>
					<option>4</option>
				</select>

				<br />

				<button onClick={() => setSort("name,asc")}>Sorteeri A-Z</button>
				<button onClick={() => setSort("name,desc")}>Sorteeri Z-A</button>
				<button onClick={() => setSort("price,asc")}>Sorteeri hind kasvavalt</button>
				<button onClick={() => setSort("price,desc")}>Sorteeri hind kahanevalt</button>
				<button onClick={() => setSort("id,asc")}>Sorteeri vanemad enne</button>
				<button onClick={() => setSort("id,desc")}>Sorteeri uuemad enne</button>

				<div>
						Näitan tooteid: 
						{(page+1)*size-size+1} -
						{(page+1)*size > totalElements ? totalElements : (page+1)*size} / 
						{totalElements}
				</div>
        {products.map(product =>
					<div>
						<div>{product.name}</div>
						<div>{product.price}</div>
					</div>
        )}
				<button disabled={page <= 0} onClick={() => setPage(page - 1)}>Eelmine</button>
				<span>{page + 1} / {totalPages}</span>
				<button disabled={page+1 >= totalPages } onClick={() => setPage(page + 1)}>Järgmine</button>
    </div>
  )
}

export default HomePage