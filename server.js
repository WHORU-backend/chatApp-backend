const http = require("http");
const { createApp } = require("./app");
const PORT = process.env.PORT || 8000;

const app = createApp();
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`server start : http://localhost:${PORT}/`);
});