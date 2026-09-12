import { Link, useParams } from "react-router-dom";

function DetailItem({ label, value }) {
  return (
    <div className="detail-item">
      <span>{label}</span>
      <strong>{value || "Not provided"}</strong>
    </div>
  );
}

export default function StudentDetail({ students = [], loading }) {
  const { id } = useParams();
  const student = students.find((item) => String(item.id) === id);

  if (loading) return <div className="state-message">Loading profile...</div>;

  if (!student) {
    return (
      <div className="state-message">
        <h1>Student not found</h1>
        <Link to="/students">Return to directory</Link>
      </div>
    );
  }

  const initials = student.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="page details-page">
      <Link className="back-link" to="/students">
        ← Back to directory
      </Link>
      <div className="details-layout">
        <div className="detail-portrait">{initials}</div>
        <div>
          <p className="eyebrow">
            Student profile / {String(student.id).padStart(3, "0")}
          </p>
          <h1>{student.name}</h1>
          <p className="detail-lead">
            {student.company?.catchPhrase ||
              "Curious mind, active community member."}
          </p>
          <div className="detail-list">
            <DetailItem label="Email" value={student.email} />
            <DetailItem label="Phone" value={student.phone} />
            <DetailItem
              label="Location"
              value={[student.address?.city, student.address?.street]
                .filter(Boolean)
                .join(", ")}
            />
            <DetailItem
              label="Program"
              value={student.company?.name || "General studies"}
            />
            <DetailItem label="Year level" value={student.yearLevel} />
          </div>
        </div>
      </div>
    </div>
  );
}
