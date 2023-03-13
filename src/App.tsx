import React, { useState } from "react";
import { QuestionTraverser } from "./tree/QuestionTraverser";
import { firstname } from "./tree/QuestionTree";

function App() {
  const [data, setData] = useState<{ [key: string]: string }>({});
  const [isComplete, setIsComplete] = useState(false);

  return (
    <div className=" max-w-screen-md mx-auto px-4 flex flex-col  gap-4">
      {isComplete ? (
        <div className={"pt-16"}>
          <p>Woohoo!</p>
          <p>Questionaire complete</p>

          <div className={"bg-slate-100 rounded-xl p-4 my-4 font-mono"}>
            {JSON.stringify(data)}
          </div>
          <p
            className={"text-blue-500 cursor-pointer hover:underline"}
            onClick={() => setIsComplete(false)}
          >
            Again?
          </p>
          <p
            className={"text-blue-500 cursor-pointer hover:underline"}
            onClick={() => {
              setData({});
              setIsComplete(false);
            }}
          >
            Again but reset?
          </p>
        </div>
      ) : (
        <QuestionTraverser
          data={data}
          setData={setData}
          firstNode={firstname}
          isComplete={isComplete}
          setIsComplete={setIsComplete}
        />
      )}
    </div>
  );
}

export default App;
