import { useEffect, useState } from "react";
import {
    getStudents,
    createStudent,
    updateStudent,
    deleteStudent
} from "./api/studentApi";
import "./App.css";

function App() {
    const [students, setStudents] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        rollNo: "",
        course: "",
        marks: ""
    });

    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Fetch students
    const fetchStudents = async () => {
        try {
            const data = await getStudents();
            setStudents(data);
        } catch (error) {
            console.error(error);
            setError("Failed to load students");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    // Handle form input
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Add / Update student
    const handleSubmit = async (event) => {
      event.preventDefault();

      if (
        formData.marks === "" ||
        Number(formData.marks) < 0 ||
        Number(formData.marks) > 100
      ) {
        setSuccess("");
        setError("Marks must be between 0 and 100.");
        return;
      }

      try {
        const studentData = {
            name: formData.name,
            rollNo: formData.rollNo,
            course: formData.course,
            marks: Number(formData.marks)
        };

        if (editingId) {
            const updatedStudent = await updateStudent(
                editingId,
                studentData
            );

            setStudents(
                students.map((student) =>
                    student._id === editingId
                        ? updatedStudent
                        : student
                )
            );

            setEditingId(null);

            setSuccess("Student updated successfully!");
        } else {
            const newStudent = await createStudent(studentData);

            setStudents([newStudent, ...students]);

            setSuccess("Student added successfully!");
        }

        setFormData({
            name: "",
            rollNo: "",
            course: "",
            marks: ""
        });

        setError("");

      } catch (error) {
          console.error(error);

          setSuccess("");

          setError(
            editingId
                ? "Failed to update student"
                : "Failed to add student"
          );
      }
    };

    // Edit student
    const handleEdit = (student) => {        
        setSuccess("");
        setError("");

        setFormData({
            name: student.name,
            rollNo: student.rollNo,
            course: student.course,
            marks: student.marks
        });

        setEditingId(student._id);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    // Delete student
    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this student?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await deleteStudent(id);

            setStudents(
                students.filter((student) => student._id !== id)
            );

            setError("");
            setSuccess("Student deleted successfully!");

        } catch (error) {
            console.error(error);
            setError("Failed to delete student");
        }
    };

    // Cancel editing
    const handleCancelEdit = () => {
        setEditingId(null);

        setFormData({
            name: "",
            rollNo: "",
            course: "",
            marks: ""
        });

        setError("");
    };

    return (
        <div className="app">

            {/* Header */}
            <header className="header">
                <div>
                    <h1>Student Record Manager</h1>
                    <p>
                        Manage student information in one place.
                    </p>
                </div>

                <div className="student-count">
                    <span>Total Students</span>
                    <strong>{students.length}</strong>
                </div>
            </header>

            {/* Error Message */}
            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            {success && (
                <div className="success-message">
                    {success}
                </div>
            )}

            {/* Form Section */}
            <section className="card form-card">

                <div className="section-heading">
                    <div>
                        <h2>
                            {editingId
                                ? "Edit Student"
                                : "Add New Student"}
                        </h2>

                        <p>
                            {editingId
                                ? "Update the student's information."
                                : "Enter the student's information below."}
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>

                    <div className="form-grid">

                        <div className="form-group">
                            <label htmlFor="name">
                                Student Name
                            </label>

                            <input
                                id="name"
                                type="text"
                                name="name"
                                placeholder="Enter student name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="rollNo">
                                Roll Number
                            </label>

                            <input
                                id="rollNo"
                                type="text"
                                name="rollNo"
                                placeholder="Enter roll number"
                                value={formData.rollNo}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="course">
                                Course
                            </label>

                            <input
                                id="course"
                                type="text"
                                name="course"
                                placeholder="Enter course"
                                value={formData.course}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="marks">
                                Marks
                            </label>

                            <input
                                id="marks"
                                type="number"
                                name="marks"
                                placeholder="Enter marks"
                                min="0"
                                max="100"
                                value={formData.marks}
                                onChange={handleChange}
                                required
                            />
                        </div>

                    </div>

                    <div className="form-actions">

                        <button
                            type="submit"
                            className="primary-btn"
                        >
                            {editingId
                                ? "Update Student"
                                : "Add Student"}
                        </button>

                        {editingId && (
                            <button
                                type="button"
                                className="secondary-btn"
                                onClick={handleCancelEdit}
                            >
                                Cancel
                            </button>
                        )}

                    </div>

                </form>
            </section>

            {/* Student Records */}
            <section className="card records-card">

                <div className="section-heading">
                    <div>
                        <h2>Student Records</h2>
                        <p>
                            View and manage all registered students.
                        </p>
                    </div>
                </div>

                {loading && (
                    <div className="empty-state">
                        <p>Loading students...</p>
                    </div>
                )}

                {!loading && students.length === 0 && (
                    <div className="empty-state">
                        <h3>No students found</h3>
                        <p>
                            Add your first student using the form above.
                        </p>
                    </div>
                )}

                {!loading && students.length > 0 && (
                    <div className="table-wrapper">

                        <table>

                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Roll Number</th>
                                    <th>Course</th>
                                    <th>Marks</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>

                                {students.map((student, index) => (
                                    <tr key={student._id}>

                                        <td>
                                            {index + 1}
                                        </td>

                                        <td className="student-name">
                                            {student.name}
                                        </td>

                                        <td>
                                            {student.rollNo}
                                        </td>

                                        <td>
                                            {student.course}
                                        </td>

                                        <td>
                                            <span className="marks">
                                                {student.marks}
                                            </span>
                                        </td>

                                        <td>
                                            <div className="action-buttons">

                                                <button
                                                    className="edit-btn"
                                                    onClick={() =>
                                                        handleEdit(student)
                                                    }
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    className="delete-btn"
                                                    onClick={() =>
                                                        handleDelete(
                                                            student._id
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </button>

                                            </div>
                                        </td>

                                    </tr>
                                ))}

                            </tbody>

                        </table>

                    </div>
                )}

            </section>

            <footer>
                <p>
                    Student Record Manager • Local Full-Stack Application
                </p>
            </footer>

        </div>
    );
}

export default App;