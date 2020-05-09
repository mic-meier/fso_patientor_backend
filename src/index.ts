import express from "express";
import cors from "cors";
const app = express();
import diagnosesRouter from "./routes/diagnosesRoutes";
import patientsRouter from "./routes/patientsRoute";

const PORT = 3001;

app.use(express.json());
app.use(cors());

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged endpoint /ping");
  res.send("pong");
});

app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
