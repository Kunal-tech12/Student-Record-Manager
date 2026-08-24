import axios from "axios";

const API_URL = "http://localhost:5000/students";

// GET all students
export const getStudents = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// GET one student
export const getStudentById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

// CREATE student
export const createStudent = async (student) => {
    const response = await axios.post(API_URL, student);
    return response.data;
};

// UPDATE student
export const updateStudent = async (id, student) => {
    const response = await axios.put(`${API_URL}/${id}`, student);
    return response.data;
};

// DELETE student
export const deleteStudent = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};