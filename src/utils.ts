import { Gender, PatientWithoutId } from "./types";

/* eslint-disable @typescript-eslint/no-explicit-any */
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const isString = (text: any): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseDateOfBirth = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date}`);
  }
  return date;
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing name: ${name}`);
  }
  return name;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }
  return gender;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error(`Incorrect or missing occupation: ${occupation}`);
  }
  return occupation;
};

const parseSSN = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error(`Incorrect or missing SSN: ${ssn}`);
  }
  return ssn;
};

const toNewPatientObject = (newPatientObject: any): PatientWithoutId => {
  const newPatient: PatientWithoutId = {
    name: parseName(newPatientObject.name),
    dateOfBirth: parseDateOfBirth(newPatientObject.dateOfBirth),
    ssn: parseSSN(newPatientObject.ssn),
    gender: parseGender(newPatientObject.gender),
    occupation: parseOccupation(newPatientObject.occupation),
  };
  return newPatient;
};

export default toNewPatientObject;

/* name, dateOfBirth, ssn, gender, occupstion */
