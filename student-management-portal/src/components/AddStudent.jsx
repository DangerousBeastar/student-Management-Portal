import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function FormField({ label, ...props }) {
  return (
    <label className="form-field">
      <span>{label}</span>
      <input {...props} />
    </label>
  );
}

export default function AddStudent({
  onAdd,
  onUpdate,
  hasAddedStudent,
  students = [],
}) {
  const navigate = useNavigate();
  const { id: editId } = useParams();
  const studentToEdit = students.find(
    (student) => String(student.id) === editId,
  );
  const isEditing = Boolean(studentToEdit);
  const [form, setForm] = useState({
    studentId: studentToEdit?.studentId || studentToEdit?.id || "",
    name: studentToEdit?.name || "",
    email: studentToEdit?.email || "",
    phone: studentToEdit?.phone || "",
    program: studentToEdit?.company?.name || "",
    yearLevel: studentToEdit?.yearLevel || "",
    image: studentToEdit?.image || "",
  });
  const handleChange = (event) =>
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  const handleSubmit = (event) => {
    event.preventDefault();
    const studentId = form.studentId.trim();
    const name = form.name.trim();
    const email = form.email.trim();
    if (!studentId || !name || !email) return;
    const updatedStudent = {
      id: studentToEdit?.id || studentId,
      studentId,
      name,
      email,
      phone: form.phone.trim(),
      company: { name: form.program.trim() || "New student" },
      yearLevel: form.yearLevel,
      image: form.image,
      address: { city: "Campus" },
    };
    if (isEditing) {
      onUpdate(updatedStudent);
    } else {
      onAdd(updatedStudent);
    }
    navigate("/students");
  };
  return (
    <div className="page form-page">
      <div className="form-intro">
        <p className="eyebrow">
          Directory / {isEditing ? "Edit record" : "New record"}
        </p>
        <h1>
          {isEditing ? "Edit a" : "Add a"}
          <br />
          <em>student.</em>
        </h1>
        <p>Give your newest community member a place in the directory.</p>
      </div>
      <form onSubmit={handleSubmit} className="student-form">
        <FormField
          label="Student ID"
          name="studentId"
          value={form.studentId}
          onChange={handleChange}
          placeholder="e.g. STU-001"
          required
        />
        <FormField
          label="Full name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="e.g. Maya Thompson"
          required
        />
        <FormField
          label="Email address"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="maya@university.edu"
          required
        />
        <FormField
          label="Phone number"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="+1 555 000 0000"
        />
        <FormField
          label="Program or department"
          name="program"
          value={form.program}
          onChange={handleChange}
          placeholder="e.g. Product Design"
        />
        <label className="form-field">
          <span>Year level</span>
          <select
            name="yearLevel"
            value={form.yearLevel}
            onChange={handleChange}
            required
          >
            <option value="">Select year level</option>
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
            <option value="4th Year">4th Year</option>
            <option value="Graduate">Graduate</option>
          </select>
        </label>
        <label className="form-field">
          <span>Profile picture</span>
          <input
            name="image"
            type="file"
            accept="image/*"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = () =>
                setForm((current) => ({ ...current, image: reader.result }));
              reader.readAsDataURL(file);
            }}
          />
          {form.image && (
            <img className="image-preview" src={form.image} alt="Preview" />
          )}
        </label>
        <button className="button button-dark" type="submit">
          {isEditing ? "Save changes" : "Create student record"} <span>→</span>
        </button>
        {hasAddedStudent && (
          <Link className="button button-outline" to="/students">
            View added students <span>↗</span>
          </Link>
        )}
      </form>
    </div>
  );
}
