import { NavLink, Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="topbar">
      <Link className="brand" to="/">
        <span className="brand-mark">S</span>
        <span>
          Student<span className="brand-muted">/</span>Portal
        </span>
      </Link>
      <nav aria-label="Primary navigation">
        <NavLink end to="/">
          Overview
        </NavLink>
        <NavLink to="/students">Students</NavLink>
        <NavLink className="nav-add" to="/add-student">
          + Add student
        </NavLink>
      </nav>
    </header>
  );
}
