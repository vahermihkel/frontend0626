import { Link } from "react-router-dom"

function NavigationBar() {
  return (
    <div>
        <Link to="/">
          <button>Avalehele</button>
        </Link>

				<Link to="/cart">
          <button>Ostukorvi</button>
        </Link>

				<Link to="/admin">
          <button>Admin</button>
        </Link>

        <Link to="/login">
          <button>Logi sisse</button>
        </Link>

        <Link to="/signup">
          <button>Registreeru</button>
        </Link>

        <Link to="/my-orders">
          <button>Minu tellimused</button>
        </Link>

        <Link to="/Profiil">
          <button>Profiil</button>
        </Link>
    </div>
  )
}

export default NavigationBar