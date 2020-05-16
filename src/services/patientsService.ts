import { v4 as uuid } from "uuid";
import patients from "../../data/patientsData";

import { Patient, PatientWithoutId, PublicPatient, Entry } from "../types";

const getPatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const findPatientById = (id: string): PublicPatient | undefined => {
  const patient = patients.find((patient) => patient.id === id);
  return patient;
};

const addPatient = (patientObject: PatientWithoutId): Patient => {
  const newPatient = {
    id: uuid(),
    ...patientObject,
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (id: string, entry: Entry): Patient | undefined => {
  const patient = patients.find((patient) => patient.id === id);

  patient?.entries.push(entry);

  return patient;
};

export default {
  getPatients,
  findPatientById,
  addPatient,
  addEntry,
};
