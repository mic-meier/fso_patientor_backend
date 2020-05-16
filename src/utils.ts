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

const parseStringAttribute = (param: any, description: string): string => {
  if (!param || !isString(param)) {
    throw new Error(`Incorrect or missing ${description}: ${param}`);
  }
  return param;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }
  return gender;
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
  if (rating === undefined || !isNumber(rating)) {
    console.log("oing");
    throw new Error(`Incorrect or missing HealthCheckRating: ${rating}`);
  }
  return rating;
};

export const toNewPatientObject = (newPatientObject: any): PatientWithoutId => {
  const newPatient: PatientWithoutId = {
    name: parseStringAttribute(newPatientObject.name, "name"),
    dateOfBirth: parseDate(newPatientObject.dateOfBirth),
    ssn: parseStringAttribute(newPatientObject.ssn, "SSN"),
    gender: parseGender(newPatientObject.gender),
    occupation: parseStringAttribute(newPatientObject.occupation, "occupation"),
    entries: [],
  };
  return newPatient;
};

export const toNewEntryObject = (newEntryObject: any): Entry => {
  const baseEntry: BaseEntry = {
    id: uuid(),
    description: parseStringAttribute(
      newEntryObject.description,
      "description"
    ),
    date: parseDate(newEntryObject.date),
    specialist: parseStringAttribute(newEntryObject.specialist, "specialist"),
    diagnosisCodes:
      parseDiagnosisCodes(newEntryObject.diagnosisCodes) || undefined,
  };

  const type = parseStringAttribute(newEntryObject.type, "type");

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
        criteria: parseStringAttribute(
          newEntryObject.discharge.criteria,
          "criteria"
        ),
      },
    };
    return entry;
  } else {
    const entry: OccupationalHealthCareEntry = {
      ...baseEntry,
      type: "OccupationalHealthcare",
      employerName: parseStringAttribute(
        newEntryObject.employerName,
        "employerName"
      ),
      sickLeave: {
        startDate: parseDate(newEntryObject.sickLeave.startDate),
        endDate: parseDate(newEntryObject.sickLeave.endDate),
      },
    };
    return entry;
  }
};
