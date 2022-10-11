import { Link } from 'react-router-dom'

// // styles
// import './Navbar.css'

export default function Navbar() {
  return (
    <nav>
        <h1>Moving Along</h1>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/singup">SignUp</Link></li>
            <li><Link to="/veiwledgers">View Ledgers</Link></li>
            <li><Link to="/manageusers">Manage Users</Link></li>
            <li><Link to="/addjournal">Add Journal</Link></li>
            <li><Link to="/">6</Link></li>
            <li><Link to="/">7</Link></li>
            <li><Link to="/">8</Link></li>
        </ul>
      </nav>
  )
}