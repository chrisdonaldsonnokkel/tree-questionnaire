import React, {
  Dispatch,
  SetStateAction,
  useMemo,
  useRef,
  useState,
} from "react";
import { NumberQuestion } from "./NumberQuestion";
import { RadioQuestion } from "./RadioQuestion";
import { TextQuestion } from "./TextQuestion";
import { NodeType } from "./type";

type Props = {
  data: { [key: string]: string };
  setData: Dispatch<
    SetStateAction<{
      [key: string]: string;
    }>
  >;
  firstNode: NodeType;
  isComplete: boolean;
  setIsComplete: Dispatch<SetStateAction<boolean>>;
};

export const QuestionTraverser = ({
  data,
  setData,
  firstNode,
  isComplete,
  setIsComplete,
}: Props) => {
  const [currentNode, setCurrentNode] = useState<NodeType | undefined>(
    firstNode
  );

  const [error, setError] = useState<null | string>(null);

  const historyStack = useRef<NodeType[]>([]);

  const currentQuestion = useMemo(() => {
    let component = undefined;
    if (!currentNode) {
      return component;
    }

    switch (currentNode.questionType) {
      case "TEXT": {
        component = (
          <TextQuestion
            data={data}
            setData={setData}
            name={currentNode.name}
            label={currentNode.label}
          />
        );
        break;
      }
      case "NUMBER": {
        component = (
          <NumberQuestion
            data={data}
            setData={setData}
            name={currentNode.name}
            label={currentNode.label}
          />
        );
        break;
      }
      case "RADIO": {
        if (currentNode.options) {
          component = (
            <RadioQuestion
              data={data}
              setData={setData}
              name={currentNode.name}
              label={currentNode.label}
              options={currentNode.options}
            />
          );
        } else {
          throw new Error(`Options not set on question ${currentNode.name}`);
        }
        break;
      }

      default:
        break;
    }
    return component;
  }, [currentNode, data, setData]);

  const handleNext = async () => {
    setError(null);
    if (currentNode) {
      // if validation, run validation
      if (currentNode.validation) {
        try {
          await currentNode.validation.validate(data[currentNode.name]);
        } catch (e: any) {
          setError(e.message);
          return;
        }
      }

      if (currentNode.next(data) === undefined) {
        // No more questions
        setIsComplete(true);
      } else {
        // get next question
        historyStack.current = [...historyStack.current, currentNode];
        setCurrentNode(currentNode.next(data));
      }
    }
  };

  const handlePrev = () => {
    if (currentNode) {
      const prev = historyStack.current[historyStack.current.length - 1];
      historyStack.current = historyStack.current.slice(
        0,
        historyStack.current.length - 2
      );
      setCurrentNode(prev);
    }
  };

  return (
    <div className={"pt-32"}>
      {currentQuestion}
      <p className={"text-red-500 text-sm"}>{error}</p>
      <div className={"flex justify-between pt-8"}>
        <div>
          {historyStack.current.length > 0 && (
            <button
              onClick={handlePrev}
              className={
                "bg-blue-400 text-white font-bold px-3 py-2 rounded-xl cursor-pointer"
              }
            >
              Previous
            </button>
          )}
        </div>
        <div>
          <button
            onClick={handleNext}
            className={
              "bg-blue-400 text-white font-bold px-3 py-2 rounded-xl cursor-pointer"
            }
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
