const form = document.getElementById("studentForm");
const tableBody = document.getElementById("studentTable");
const search = document.getElementById("search");

let students = [];
let editIndex = -1;

function displayStudents(data = students) {
    tableBody.innerHTML = "";

    data.forEach((student, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${student.name}</td>
            <td>${student.rollNo}</td>
            <td>${student.department}</td>
            <td>${student.email}</td>
            <td>
                <button onclick="editStudent(${index})">Edit</button>
                <button onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const student = {
        name: document.getElementById("name").value,
        rollNo: document.getElementById("rollNo").value,
        department: document.getElementById("department").value,
        email: document.getElementById("email").value
    };

    if (editIndex === -1) {
        students.push(student);
    } else {
        students[editIndex] = student;
        editIndex = -1;
    }

    form.reset();
    displayStudents();
});

function editStudent(index) {
    const student = students[index];

    document.getElementById("name").value = student.name;
    document.getElementById("rollNo").value = student.rollNo;
    document.getElementById("department").value = student.department;
    document.getElementById("email").value = student.email;

    editIndex = index;
}

function deleteStudent(index) {
    students.splice(index, 1);
    displayStudents();
}

search.addEventListener("input", function() {
    const value = search.value.toLowerCase();

    const filtered = students.filter(student =>
        student.name.toLowerCase().includes(value) ||
        student.rollNo.toLowerCase().includes(value) ||
        student.department.toLowerCase().includes(value)
    );

    displayStudents(filtered);
});