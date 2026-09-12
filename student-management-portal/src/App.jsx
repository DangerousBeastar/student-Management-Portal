import { useEffect, useState } from "react";
import axios from "axios";
import { HashRouter, Link, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Students from "./components/Students";
import AddStudent from "./components/AddStudent";
import StudentDetail from "./components/StudentDetail";
import "./App.css";

const API_URL = "https://jsonplaceholder.typicode.com/users";

function NotFound() {
  return (
    <div className="state-message">
      <h1>Page not found</h1>
      <Link to="/">Return home</Link>
    </div>
  );
}

function App() {
  const [students, setStudents] = useState([]);
  const [addedStudents, setAddedStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hasAddedStudent, setHasAddedStudent] = useState(false);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => setStudents(response.data))
      .catch(() =>
        setError("We could not load the student directory. Please try again."),
      )
      .finally(() => setLoading(false));
  }, []);

  const addStudent = (student) => {
    setAddedStudents((current) => [...current, student]);
    setHasAddedStudent(true);
  };

  const updateStudent = (student) => {
    setAddedStudents((current) =>
      current.map((item) => (item.id === student.id ? student : item)),
    );
  };

  return (
    <HashRouter>
      <div className="app-shell">
        <Header />
        <main>
          <Routes>
            <Route
              path="/"
              element={<Home students={students} loading={loading} />}
            />
            <Route
              path="/students"
              element={
                <Students
                  students={addedStudents}
                  loading={loading}
                  error={error}
                  canView={hasAddedStudent}
                />
              }
            />
            <Route
              path="/students/:id"
              element={
                <StudentDetail students={addedStudents} loading={loading} />
              }
            />
            <Route
              path="/add-student"
              element={
                <AddStudent
                  onAdd={addStudent}
                  hasAddedStudent={hasAddedStudent}
                />
              }
            />
            <Route
              path="/students/:id/edit"
              element={
                <AddStudent
                  students={addedStudents}
                  onUpdate={updateStudent}
                  hasAddedStudent={hasAddedStudent}
                />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <footer>
          Student Portal <span>•</span> Built for better campus connections
        </footer>
      </div>
    </HashRouter>
  );
}

export default App;
