import { useState } from "react";
import { Link } from "react-router-dom";

function StudentCard({ student }) {
  return (
    <div className="student-card">
      <Link className="student-card-main" to={`/students/${student.id}`}>
        <div className="avatar">
          {student.name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .slice(0, 2)}
        </div>
        <div className="student-card-copy">
          <span className="student-id">
            ID / {String(student.id).padStart(3, "0")}
          </span>
          <h2>{student.name}</h2>
          <p>{student.email}</p>
          <span className="program-tag">
            {student.company?.name || "General studies"} · {student.yearLevel}
          </span>
        </div>
        <span className="card-arrow">↗</span>
      </Link>
      <Link className="edit-button" to={`/students/${student.id}/edit`}>
        Edit
      </Link>
    </div>
  );
}

export default function Students({ students, loading, error, canView }) {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("lastName");
  const [courseFilter, setCourseFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");
  const courses = [
    ...new Set(students.map((student) => student.company?.name).filter(Boolean)),
  ];
  const yearLevels = [
    ...new Set(students.map((student) => student.yearLevel).filter(Boolean)),
  ];
  const filteredStudents = students
    .filter((student) => {
      const searchableText = `${student.studentId || student.id} ${student.name} ${student.email} ${student.company?.name}`.toLowerCase();
      return (
        searchableText.includes(query.trim().toLowerCase()) &&
        (courseFilter === "all" || student.company?.name === courseFilter) &&
        (yearFilter === "all" || student.yearLevel === yearFilter)
      );
    })
    .sort((firstStudent, secondStudent) => {
      if (sortBy === "id") {
        return String(firstStudent.studentId || firstStudent.id).localeCompare(
          String(secondStudent.studentId || secondStudent.id),
          undefined,
          { numeric: true },
        );
      }
      const firstLastName = firstStudent.name.trim().split(" ").pop();
      const secondLastName = secondStudent.name.trim().split(" ").pop();
      return firstLastName.localeCompare(secondLastName);
    });
  return (
    <div className="page directory-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">The directory</p>
          <h1>Students</h1>
          <p>Search the people who make this campus work.</p>
        </div>
        {canView && (
          <Link className="button button-dark" to="/add-student">
            + Add student
          </Link>
        )}
      </div>
      {!canView && (
        <div className="empty-directory">
          <Link
            className="button button-outline empty-see-button"
            to="/students"
          >
            See students <span>↗</span>
          </Link>
          <span className="empty-icon">＋</span>
          <h2>Your directory is empty</h2>
          <p>Add your first student to start viewing the directory.</p>
          <Link className="button button-dark" to="/add-student">
            Add first student <span>→</span>
          </Link>
        </div>
      )}
      {canView && (
        <>
          <label className="search-box">
            <span>⌕</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by student ID, Name, or Program..."
              aria-label="Search students"
            />
          </label>
          <div className="student-filters">
            <label>
              <span>Sort by</span>
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
              >
                <option value="lastName">Last name (A–Z)</option>
                <option value="id">Student ID</option>
              </select>
            </label>
            <label>
              <span>Course</span>
              <select
                value={courseFilter}
                onChange={(event) => setCourseFilter(event.target.value)}
              >
                <option value="all">All courses</option>
                {courses.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>Year level</span>
              <select
                value={yearFilter}
                onChange={(event) => setYearFilter(event.target.value)}
              >
                <option value="all">All year levels</option>
                {yearLevels.map((yearLevel) => (
                  <option key={yearLevel} value={yearLevel}>
                    {yearLevel}
                  </option>
                ))}
              </select>
            </label>
          </div>
          {loading && <p className="state-message">Loading the directory...</p>}
          {error && <p className="state-message error">{error}</p>}
          {!loading && !error && (
            <div className="student-grid">
              {filteredStudents.map((student) => (
                <StudentCard key={student.id} student={student} />
              ))}
            </div>
          )}
          {!loading && !error && filteredStudents.length === 0 && (
            <p className="state-message">No students match “{query}”.</p>
          )}
        </>
      )}
    </div>
  );
}
