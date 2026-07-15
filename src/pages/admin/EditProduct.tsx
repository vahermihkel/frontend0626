import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

type Category = {
  id: number;
  name: string;
}

type Product = {
  id?: number;
  name: string;
  price: number;
  active: boolean;
  stock: number;
  image: string;
  category: Category | null;
}

function EditProduct() {
  const {id} = useParams(); // urli muutuja
  const [categories, setCategories] = useState<Category[]>([]);
  const [product, setProduct] = useState<Product>({
    name: "",
    price: 0,
    active: true,
    stock: 0,
    image: "",
    category: null,
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(import.meta.env.VITE_BACKEND_URL + "/categories")
      .then(res => res.json())
      .then(json => setCategories(json))

    fetch(import.meta.env.VITE_BACKEND_URL + "/products/" + id)
      .then(res => res.json())
      .then(json => setProduct(json))
  }, [id]);

  function changeProduct(field: keyof Product, value: string | number | boolean | Category | null) {
    setProduct({...product, [field]: value});
  }

  function changeCategory(categoryId: string) {
    const category = categories.find(category => category.id === Number(categoryId));
    changeProduct("category", category ?? null);
  }

  function editProduct() {
    fetch(import.meta.env.VITE_BACKEND_URL + "/products", {
      method: "PUT",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Toote muutmine ebaonnestus");
        }
        return res.json();
      })
      .then(json => {
        setProduct(json);
        setMessage("Toode muudetud");
      })
      .catch(() => setMessage("Toote muutmine ebaonnestus"));
  }

  return (
    <div>
      <h2>Muuda toodet</h2>

      <label>Toote nimi</label> <br />
      <input
        value={product.name}
        onChange={(e) => changeProduct("name", e.target.value)}
        type="text"
      /> <br />

      <label>Hind</label> <br />
      <input
        value={product.price}
        onChange={(e) => changeProduct("price", Number(e.target.value))}
        type="number"
        min="0"
        step="0.01"
      /> <br />

      <label>Laoseis</label> <br />
      <input
        value={product.stock}
        onChange={(e) => changeProduct("stock", Number(e.target.value))}
        type="number"
        min="0"
      /> <br />

      <label>Kategooria</label> <br />
      <select
        value={product.category?.id ?? ""}
        onChange={(e) => changeCategory(e.target.value)}
      >
        <option value="">Vali kategooria</option>
        {categories.map(category =>
          <option key={category.id} value={category.id}>{category.name}</option>
        )}
      </select> <br />

      <label>
        <input
          checked={product.active}
          onChange={(e) => changeProduct("active", e.target.checked)}
          type="checkbox"
        />
        Aktiivne
      </label> <br />

      <button onClick={() => editProduct()}>Muuda</button>
      <div>{message}</div>
    </div>
  )
}

export default EditProduct