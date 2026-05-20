import connectDB from "./DB/connection.js";

const bootstrap = async (express, app) => {
  app.use(express.json());

  await connectDB();

  app.get("/", (_, res) => {
    res.send("Hello World");
  });

  app.use((_req, res, _next) => {
    res.status(404).json({ message: "Route not found" });
  });
  
  app.use((err, _req, res, _next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({ message: err.message });
  });
};

export default bootstrap;
