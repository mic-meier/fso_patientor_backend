import { v4 as uuid } from "uuid";
import patients from "../../data/patientsData";

import { PatientWithoutSSN, Patient, PatientWithoutId } from "../types";

const getPatients = (): PatientWithoutSSN[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patientObject: PatientWithoutId): Patient => {
  const newPatient = {
    id: uuid(),
    ...patientObject,
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  addPatient,
};
