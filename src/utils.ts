import {
  BaseEntry,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthCareEntry,
  Entry,
  Gender,
  PatientWithoutId,
  Diagnosis,
} from "./types";
import { v4 as uuid } from "uuid";
import diagnoses from "../data/diagnosesData";

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

const isNumber = (param: any): param is number => {
  return typeof param === "number" || param instanceof Number;
};

const parseDate = (date: any): string => {
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

const parseType = (type: any): string => {
  if (!type || !isString(type)) {
    throw new Error(`Incorrect or missing entry type: ${type}`);
  }
  return type;
};

const parseDescription = (description: any): string => {
  if (!description || !isString(description)) {
    throw new Error(`Incorrect or missing description: ${description}`);
  }
  return description;
};

const parseSpecialist = (specialist: any): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error(`Incorrect or missing specialist: ${specialist}`);
  }
  return specialist;
};

const parseCriteria = (criteria: any): string => {
  if (!criteria || !isString(criteria)) {
    throw new Error(`Incorrect or missing criteria: ${criteria}`);
  }
  return criteria;
};

const parseEmployerName = (employer: any): string => {
  if (!employer || !isString(employer)) {
    throw new Error(`Incorrect or missing employer: ${employer}`);
  }
  return employer;
};

const parseDiagnosisCodes = (diagnosisCodes: any): Array<Diagnosis["code"]> => {
  if (diagnosisCodes) {
    diagnosisCodes.forEach((code: any) => {
      if (
        !code ||
        !isString(code) ||
        !diagnoses.map((diagnosis) => diagnosis.code).includes(code)
      ) {
        throw new Error(`Incorrect diagnosis code: ${code}`);
      }
    });
  }
  return diagnosisCodes;
};

const parseHealthCheckRating = (rating: any): number => {
  console.log(isNumber(rating));
  if (rating === undefined || !isNumber(rating)) {
    console.log("oing");
    throw new Error(`Incorrect or missing HealthCheckRating: ${rating}`);
  }
  return rating;
};

export const toNewPatientObject = (newPatientObject: any): PatientWithoutId => {
  const newPatient: PatientWithoutId = {
    name: parseName(newPatientObject.name),
    dateOfBirth: parseDate(newPatientObject.dateOfBirth),
    ssn: parseSSN(newPatientObject.ssn),
    gender: parseGender(newPatientObject.gender),
    occupation: parseOccupation(newPatientObject.occupation),
    entries: [],
  };
  return newPatient;
};

export const toNewEntryObject = (newEntryObject: any): Entry => {
  const baseEntry: BaseEntry = {
    id: uuid(),
    description: parseDescription(newEntryObject.description),
    date: parseDate(newEntryObject.date),
    specialist: parseSpecialist(newEntryObject.specialist),
    diagnosisCodes:
      parseDiagnosisCodes(newEntryObject.diagnosisCodes) || undefined,
  };

  const type = parseType(newEntryObject.type);

  if (type === "HealthCheck") {
    const entry: HealthCheckEntry = {
      ...baseEntry,
      type: type,
      healthCheckRating: parseHealthCheckRating(
        newEntryObject.healthCheckRating
      ),
    };
    return entry;
  } else if (type === "Hospital") {
    const entry: HospitalEntry = {
      ...baseEntry,
      type: type,
      discharge: {
        date: parseDate(newEntryObject.discharge.date),
        criteria: parseCriteria(newEntryObject.discharge.criteria),
      },
    };
    return entry;
  } else {
    const entry: OccupationalHealthCareEntry = {
      ...baseEntry,
      type: "OccupationalHealthcare",
      employerName: parseEmployerName(newEntryObject.employerName),
      sickLeave: {
        startDate: parseDate(newEntryObject.sickLeave.startDate),
        endDate: parseDate(newEntryObject.sickLeave.endDate),
      },
    };
    return entry;
  }
};
