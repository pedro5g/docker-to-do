const app = require("./app");
const env = require("./env/index");

const PORT = env.PORT;
app.listen(PORT, () => {
  console.log(`http server is running at port ${PORT} 🔥`);
});
