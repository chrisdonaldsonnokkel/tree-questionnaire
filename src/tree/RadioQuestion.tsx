import React, { Dispatch, SetStateAction } from "react";

type Props = {
  data: { [key: string]: string };
  setData: Dispatch<
    SetStateAction<{
      [key: string]: string;
    }>
  >;
  name: string;
  label: string;
  options: {
    label: string;
    value: string;
  }[];
};

export const RadioQuestion = ({
  data,
  setData,
  name,
  label,
  options,
}: Props) => {
  return (
    <div
      className={"flex flex-col"}
      onChange={(e: any) => setData({ ...data, [name]: e.target.value })}
    >
      <label className={"font-bold pb-2"}>{label}</label>
      <div className={"flex gap-4"}>
        {options.map((option) => {
          return (
            <div
              key={option.value}
              className={
                "border rounded-full px-3 p-1 items-center  gap-4  flex justify "
              }
            >
              <label htmlFor={option.label}>{option.label}</label>
              <input type={"radio"} value={option.value} name={name} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
