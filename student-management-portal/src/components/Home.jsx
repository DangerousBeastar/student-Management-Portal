import { Link } from "react-router-dom";

function StatCard({ label, value, detail }) {
  return (
    <div className="stat-card">
      <p>{label}</p>
      <strong>{value}</strong>
      <span>{detail}</span>
    </div>
  );
}

export default function Home({ students = [], loading }) {
  return (
    <div className="page home-page">
      <section className="hero-copy">
        <p className="eyebrow">Campus intelligence / 2026</p>
        <h1>
          Know your
          <br />
          <em>community.</em>
        </h1>
        <p className="hero-text">
          A calm, considered space for keeping your student community visible,
          connected, and moving forward.
        </p>
        <Link className="button button-dark" to="/students">
          Explore students <span>→</span>
        </Link>
      </section>
      <section className="stats">
        <StatCard
          label="Active students"
          value={loading ? "..." : students.length}
          detail="Across all programs"
        />
        <StatCard label="Communities" value="04" detail="Currently supported" />
        <StatCard
          label="Response rate"
          value="92%"
          detail="This academic year"
        />
      </section>
    </div>
  );
}
