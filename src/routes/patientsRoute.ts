import express from "express";
import patientsService from "../services/patientsService";
import toNewPatientObject from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientsService.getPatients());
});

router.get("/:id", (req, res) => {
  const patient = patientsService.findPatientById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post("/", (req, res) => {
  try {
    const newPatientObject = toNewPatientObject(req.body);

    const addedPatient = patientsService.addPatient(newPatientObject);
    res.json(addedPatient);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;
