import diagnoses from "../../data/diagnosesData";
import { Diagnose } from "../types";

const getEntries = (): Diagnose[] => {
  return diagnoses;
};

export default {
  getEntries,
};
