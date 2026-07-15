import { useEffect, useState } from "react"

type Category = {
  id: number;
  name: string;
}

type NewProduct = {
  name: string;
  price: number;
  active: boolean;
  stock: number;
  image: string;
  category: Category | null;
}

function AddProduct() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newProduct, setNewProduct] = useState<NewProduct>({
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
  }, []);

  function changeProduct(field: keyof NewProduct, value: string | number | boolean | Category | null) {
    setNewProduct({...newProduct, [field]: value});
  }

  function changeCategory(categoryId: string) {
    const category = categories.find(category => category.id === Number(categoryId));
    changeProduct("category", category ?? null);
  }

  function addProduct() {
    fetch(import.meta.env.VITE_BACKEND_URL + "/products", {
      method: "POST",
      body: JSON.stringify(newProduct),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("token")
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Toote lisamine ebaonnestus");
        }
        return res.json();
      })
      .then(() => {
        setMessage("Toode lisatud");
        setNewProduct({
          name: "",
          price: 0,
          active: true,
          stock: 0,
          image: "",
          category: null,
        });
      })
      .catch(() => setMessage("Toote lisamine ebaonnestus"));
  }

  return (
    <div>
      <h2>Lisa toode</h2>

      <label>Toote nimi</label> <br />
      <input
        value={newProduct.name}
        onChange={(e) => changeProduct("name", e.target.value)}
        type="text"
      /> <br />

      <label>Hind</label> <br />
      <input
        value={newProduct.price}
        onChange={(e) => changeProduct("price", Number(e.target.value))}
        type="number"
        min="0"
        step="0.01"
      /> <br />

      <label>Laoseis</label> <br />
      <input
        value={newProduct.stock}
        onChange={(e) => changeProduct("stock", Number(e.target.value))}
        type="number"
        min="0"
      /> <br />

      <label>Kategooria</label> <br />
      <select
        value={newProduct.category?.id ?? ""}
        onChange={(e) => changeCategory(e.target.value)}
      >
        <option value="">Vali kategooria</option>
        {categories.map(category =>
          <option key={category.id} value={category.id}>{category.name}</option>
        )}
      </select> <br />

      <label>
        <input
          checked={newProduct.active}
          onChange={(e) => changeProduct("active", e.target.checked)}
          type="checkbox"
        />
        Aktiivne
      </label> <br />

      <button onClick={() => addProduct()}>Lisa toode</button>
      <div>{message}</div>
    </div>
  )
}

export default AddProduct