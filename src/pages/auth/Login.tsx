import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Login() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  function login() {
    fetch(import.meta.env.VITE_BACKEND_URL + "/login", {
      method: "POST",
      body: JSON.stringify(loginData),
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
        return res.text();
      })
      .then(token => {
        sessionStorage.setItem("token", token);
        setMessage("Sisselogimine õnnestus");
        navigate("/");
      })
      .catch(error => setMessage(error.message));
  }

  return (
    <div>
      <h2>Logi sisse</h2>

      <label>Email</label> <br />
      <input
        value={loginData.email}
        onChange={(e) => setLoginData({...loginData, email: e.target.value})}
        type="email"
      /> <br />

      <label>Parool</label> <br />
      <input
        value={loginData.password}
        onChange={(e) => setLoginData({...loginData, password: e.target.value})}
        type="password"
      /> <br />

      <button onClick={() => login()}>Logi sisse</button>
      <div>{message}</div>
    </div>
  )
}

export default Login