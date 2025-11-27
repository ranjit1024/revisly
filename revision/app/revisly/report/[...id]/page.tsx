"use client";
import { GetDetailSession } from "@/lib/actions/getSessionInfo";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { JsonValue } from "@prisma/client/runtime/library";
import QuizSkeleton from "@/components/ui/quizSkeleton";

type ServerActionResponse =
  | { msg: string }
  | {
      fileContent: string | undefined;
      answers: JsonValue[];
    };
export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [yourAns, setYourAns] = useState<JsonValue[] | undefined>();
  const [Id, setId] = useState("");
  const path = usePathname();

  const loader = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const [client, setIsClient] = useState(false);
  const [questions, setQuestions] = useState<
    | [
        {
          id: "";
          question: "";
          options: String[];
          correctAnswer: Number;
        }
      ]
    | undefined
  >();

  useEffect(() => {
    setIsClient(true);
    const pathid = path.split("/")[3];
    setId(pathid);
  }, [path]);
  useEffect(() => {
    if (!Id) return;
    async function getQuestion() {
      setIsLoading(true);
      try {
        const userQuesion: ServerActionResponse = await GetDetailSession(Id);
        if ("msg" in userQuesion) {
          console.error("Error:", userQuesion.msg);
          return;
        }
        const { fileContent, answers } = userQuesion;
        setQuestions(JSON.parse(String(fileContent)));
        setYourAns(answers);
      } catch (err) {
        console.error(err, "Something went wrong in S3");
      } finally {
        setIsLoading(false);
      }
    }
    getQuestion();
  }, [Id]);
  console.log(questions);
  if (questions == undefined) {
    return <div>
       <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2 ">Quiz Result</h2>
       </div>
      <QuizSkeleton/>
      <QuizSkeleton/>
      <QuizSkeleton/>
      <QuizSkeleton/>
      </div>;
  }
  return (
    <div className="p-3 ">
       <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2"> Quiz Result</h2>
       </div>
      {questions?.map((value, index) => {
        const answer = value.options[Number(value.correctAnswer)];
        let selectedAns:String = ""
        if (yourAns) {
          selectedAns = value.options[Number(yourAns[index])];
        }

        return (
          <div className="" key={index}>
          
            <div className={` ${selectedAns === answer ? 'bg-green-50/20 shadow-lime-200 p-5  mb-3 rounded-2xl border-b-gray-100 border shadow-sm' : 'p-5 bg-red-50/20 mb-3 rounded-2xl  border-b-red-50 border shadow-sm shadow-red-200'}`}>
              <div className="text-end flex">
                <div>
                  
                  </div>
              </div>
              {/* Question Number Badge */}
              <div className="mb-4">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full font-medium text-sm -ml-.5">
                  {value.id}
                </span>
              </div>

              {/* Question Text */}
             <h1 className="text-lg font-medium text-gray-800 flex-1 mb-4 ">
                 {value.question}
              </h1>

                <div className="grid grid-cols-1 mt-8  md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h5 className="font-medium text-gray-700">Your Answer:</h5>
                <div className={`p-3 rounded-lg border-2 ${
                    selectedAns === answer
                    ? 'bg-green-50 border-green-300 text-green-800' 
                    : 'bg-red-50 border-red-300 text-red-800'
                }`}>
                  {selectedAns}
                </div>
              </div>
              
              <div className="space-y-2">
                <h5 className="font-medium text-gray-700">Correct Answer:</h5>
                <div className="p-3 rounded-lg border-2 bg-green-50 border-green-300 text-green-800">
                  {answer}
                </div>
              </div>
            </div>
              {/* Answer Options */}
              <div className="mt-8">
                 
              <h5 className="font-medium text-gray-700 mb-2">All Options:</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {value.options.map((option, index) => {
                  return (
                      <div
                    key={index}
                    className={`p-2 rounded-md text-sm border ${
                      option === answer
                        ? 'bg-green-100 border-green-300 text-green-800'
                        : option === selectedAns 
                        ? 'bg-red-100 border-red-300 text-red-800'
                        : 'bg-gray-100 border-gray-300 text-gray-700'
                    }`}
                  >
                    {option}
                  </div>
                  );
                })}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
