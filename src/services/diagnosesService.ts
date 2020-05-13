import diagnoses from "../../data/diagnosesData";
import { Diagnosis } from "../types";

const getEntries = (): Diagnosis[] => {
  return diagnoses;
};

export default {
  getEntries,
};
