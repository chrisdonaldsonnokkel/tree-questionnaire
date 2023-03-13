import { Schema } from "yup";

export type NodeType = {
  name: string;
  label: string;
  questionType: "TEXT" | "RADIO" | "NUMBER";
  next: (data: any) => NodeType | undefined;
  options?: { value: string; label: string }[];
  validation?: Schema;
};
