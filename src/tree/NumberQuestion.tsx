import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";

type Props = {
  data: { [key: string]: string };
  setData: Dispatch<
    SetStateAction<{
      [key: string]: string;
    }>
  >;
  name: string;
  label: string;
};

export const NumberQuestion = ({ data, setData, name, label }: Props) => {
  const ref = useRef<null | HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  return (
    <div className={"flex flex-col "}>
      <label className={"font-bold pb-2"} htmlFor={name}>
        {label}
      </label>
      <input
        ref={ref}
        type={"number"}
        value={data[name]}
        name={name}
        onChange={(e) => setData({ ...data, [name]: e.target.value })}
      />
    </div>
  );
};
