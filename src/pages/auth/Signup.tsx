import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Signup() {
  const navigate = useNavigate();
  const [person, setPerson] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    personCode: "",
    city: "",
    country: "",
    county: "",
    street: "",
    streetNumber: "",
    postalIndex: "",
    role: 0
  });
  const [message, setMessage] = useState("");

  function signup() {
    fetch(import.meta.env.VITE_BACKEND_URL + "/signup", {
      method: "POST",
      body: JSON.stringify(person),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(json => {
            throw new Error(json.message);
          });
        }
        return res.json();
      })
      .then(() => {
        setMessage("Konto loodud");
        navigate("/login");
      })
      .catch(error => setMessage(error.message));
  }

  return (
    <div>
      <h2>Registreeru</h2>

      <label>Eesnimi</label> <br />
      <input
        value={person.firstName}
        onChange={(e) => setPerson({...person, firstName: e.target.value})}
        type="text"
      /> <br />

      <label>Perekonnanimi</label> <br />
      <input
        value={person.lastName}
        onChange={(e) => setPerson({...person, lastName: e.target.value})}
        type="text"
      /> <br />

      <label>Email</label> <br />
      <input
        value={person.email}
        onChange={(e) => setPerson({...person, email: e.target.value})}
        type="email"
      /> <br />

      <label>Parool</label> <br />
      <input
        value={person.password}
        onChange={(e) => setPerson({...person, password: e.target.value})}
        type="password"
      /> <br />

      <label>Isikukood</label> <br />
      <input
        value={person.personCode}
        onChange={(e) => setPerson({...person, personCode: e.target.value})}
        type="text"
      /> <br />

      <label>Linn</label> <br />
      <input
        value={person.city}
        onChange={(e) => setPerson({...person, city: e.target.value})}
        type="text"
      /> <br />

      <label>Riik</label> <br />
      <input
        value={person.country}
        onChange={(e) => setPerson({...person, country: e.target.value})}
        type="text"
      /> <br />

      <label>Maakond</label> <br />
      <input
        value={person.county}
        onChange={(e) => setPerson({...person, county: e.target.value})}
        type="text"
      /> <br />

      <label>Tänav</label> <br />
      <input
        value={person.street}
        onChange={(e) => setPerson({...person, street: e.target.value})}
        type="text"
      /> <br />

      <label>Maja number</label> <br />
      <input
        value={person.streetNumber}
        onChange={(e) => setPerson({...person, streetNumber: e.target.value})}
        type="text"
      /> <br />

      <label>Postiindeks</label> <br />
      <input
        value={person.postalIndex}
        onChange={(e) => setPerson({...person, postalIndex: e.target.value})}
        type="text"
      /> <br />

      <label>Roll (for testing purposes)</label> <br />
      {/* <input
        value={person.role}
        onChange={(e) => setPerson({...person, firstName: e.target.value})}
        type="text"
      /> <br /> */}
      <select onChange={(e) => setPerson({...person, role: Number(e.target.value)})}>
        <option value="0">Customer</option>
        <option value="1">Admin</option>
        <option value="2">Superadmin</option>
      </select>

      <button onClick={() => signup()}>Registreeru</button>
      <div>{message}</div>
    </div>
  )
}

export default Signup