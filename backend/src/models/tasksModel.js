const connection = require("./connection");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

//curl http://localhost:3000/tasks
const getAll = async () => {
  const [tasks] = await connection.execute("SELECT * FROM task");

  return tasks;
};
//curl -X POST  http://localhost:3000/tasks -H "Content-Type: application/json" --data '{"title": "test", "description": "only a test"}'
const addTask = async (task) => {
  const { title, description } = task;
  let currentDate = new Date(),
    month = months[currentDate.getMonth()],
    day = currentDate.getDate(),
    year = currentDate.getFullYear();

  let date = `${month} ${day}, ${year}`;

  const query =
    "INSERT INTO task(title, description, created_at) VALUES (?, ?, ?)";
  const [addedTask] = await connection.execute(query, [
    title,
    description,
    date,
  ]);

  return { insertId: addedTask, createAt: date };
};
// curl -X DELETE http://localhost:3000/tasks/28
const deleteTask = async (id) => {
  const removedTask = await connection.execute(
    "DELETE FROM task WHERE id = ?",
    [id]
  );
  return removedTask;
};
// curl -X PUT http://localhost:3000/tasks/28 -H "Content-Type: application/json" --data '{"title": "data", "description": ""}'
const updateTask = async (id, task) => {
  const query = "UPDATE task SET title = ?, description = ? WHERE id = ?";
  const { title, description } = task;
  const updatedTask = await connection.execute(query, [title, description, id]);
  return updatedTask;
};

module.exports = {
  getAll,
  addTask,
  deleteTask,
  updateTask,
};
