const connection = require("./connection");
const queries = [
  "CREATE DATABASE IF NOT EXISTS todolist;",
  `CREATE TABLE IF NOT EXISTS task (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(45) NOT NULL,
  description VARCHAR(45) NOT NULL,
  created_at VARCHAR(45) NOT NULL
);
`,
];

async function main() {
  await new Promise((resolve, reject) => {
    try {
      queries.forEach(async (query) => {
        await connection.execute(query);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
}

main()
  .then(() => console.log("Database is on 🔥"))
  .catch((e) => console.error(e));
