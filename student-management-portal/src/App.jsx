import { useEffect, useState } from "react";
import { HashRouter, Link, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Students from "./components/Students";
import AddStudent from "./components/AddStudent";
import StudentDetail from "./components/StudentDetail";
import "./App.css";


const ADDED_STUDENTS_KEY = "student-portal-added-students";

function NotFound() {
  return (
    <div className="state-message">
      <h1>Page not found</h1>
      <Link to="/">Return</Link>
    </div>
  );
}

function App() {
  const [addedStudents, setAddedStudents] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(ADDED_STUDENTS_KEY)) || [];
    } catch {
      return [];
    }
  });
  useEffect(() => {
    localStorage.setItem(ADDED_STUDENTS_KEY, JSON.stringify(addedStudents));
  }, [addedStudents]);

  const addStudent = (student) => {
    setAddedStudents((current) => [
      ...current,
      { ...student, isAdded: true },
    ]);
  };

  const updateStudent = (student) => {
    setAddedStudents((current) =>
      current.map((item) =>
        item.id === student.id ? { ...student, isAdded: true } : item,
      ),
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
              element={
                <Home
                  students={addedStudents}
                  loading={false}
                />
              }
            />
            <Route
              path="/students"
              element={
                <Students
                  students={addedStudents}
                  loading={false}
                  error=""
                  canView
                />
              }
            />
            <Route
              path="/students/:id"
              element={
                <StudentDetail
                  students={addedStudents}
                  loading={false}
                />
              }
            />
            <Route
              path="/add-student"
              element={
                <AddStudent
                  onAdd={addStudent}
                  hasAddedStudent={addedStudents.length > 0}
                />
              }
            />
            <Route
              path="/students/:id/edit"
              element={
                <AddStudent
                  students={addedStudents}
                  onUpdate={updateStudent}
                  hasAddedStudent={addedStudents.length > 0}
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
