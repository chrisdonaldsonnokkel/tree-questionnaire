import { number, string } from "yup";
import { NodeType } from "./type";

export const firstname: NodeType = {
  name: "firstname",
  label: "What is your first name?",
  questionType: "TEXT",
  next: (data: any) => age,
  validation: string().required("Please enter your first name."),
};

const age: NodeType = {
  name: "age",
  label: "What is your age? (over 18 for path 2)",
  questionType: "NUMBER",
  validation: number()
    .required("Please enter your age.")
    .min(16, "Must be over 16")
    .max(99, "Must be below 99"),
  next: (data: any) => {
    if (Number(data.age) > 18) {
      return ageConfirm;
    } else {
      return undefined;
    }
  },
};

const ageConfirm: NodeType = {
  name: "ageConfirm",
  label: "Please type yes if that is really your age?",
  questionType: "TEXT",
  validation: string().required("Please enter yes.").is(["yes"]),
  next: (data: any) => {
    return gender;
  },
};

const gender: NodeType = {
  name: "gender",
  label: "What is your gender?",
  questionType: "RADIO",
  validation: string().required("Please choose an option"),
  options: [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Prefer not to say", value: "na" },
  ],
  next: (data: any) => undefined,
};
