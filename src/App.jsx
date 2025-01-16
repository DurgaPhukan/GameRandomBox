import { useEffect, useState } from "react";

function App() {
  const [tabData, setTabData] = useState([]);
  const [input, setInput] = useState(1);
  const [time, setTime] = useState(0);

  const [gameState, setGameState] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (gameState === true) {
      const timer = setTimeout(() => {
        setPos({
          x: Math.floor(Math.random() * 10),
          y: Math.floor(Math.random() * 10),
        });
      }, input * 1000);
      return () => clearInterval(timer);
    }
  }, [pos, gameState, input]);

  useEffect(() => {
    if (gameState === true) {
      const time1 = setInterval(() => {
        setTime((prev) => prev + 1);
        console.log("Time increasing", time);
      }, 1000);
      return () => clearInterval(time1);
    }
  }, [gameState]);

  const [arrval, setArrval] = useState([
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  useEffect(() => {
    if (gameState === true) {
      const arrNew = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ];
      arrNew[pos.x][pos.y] = 1;
      setArrval(arrNew);
    }
  }, [pos]);

  const handleColoredDiv = (hdiv) => {
    console.log("here");
    if (hdiv === 1) {
      console.log("Clicked on colored div!");
      setTabData((prev) => [
        ...prev,
        { clickNo: tabData.length + 1, reactTime: time },
      ]);
    }
  };

  return (
    <div className="flex s flex-col items-center bg-blue-200 border-blue-600-2 p-10 w-full">
      <h1 className="text-3xl font-bold  text-purple-800 text-center p-4 bg-purple-100 rounded-lg mb-4">
        Game
      </h1>
      <div className="w-full flex justify-center">
        <div className="bg-slate-400 w-full flex justify-center">
          <div className="flex justify-between py-4 w-3/4">
            <div className="p-4">
              <button
                onClick={() => setGameState(true)}
                className="bg-green-200 text-center font-bold text-lg border-2 rounded-lg w-36 h-12 px-4 py-1"
              >
                Start
              </button>
            </div>
            <div className="p-4">
              <button
                disabled={!gameState}
                onClick={() => setGameState(false)}
                className="bg-purple-200 text-center font-bold text-lg border-2 rounded-lg w-36 h-12 px-4 py-1 "
              >
                Pause
              </button>
            </div>
            <div className="p-4">
              <button
                disabled={!gameState}
                onClick={() => {
                  setGameState(false);
                  setTime(0);
                  setTabData([]);
                }}
                className=" bg-red-200 text-center font-bold text-lg border-2 rounded-lg w-36 h-12 px-4 py-1"
              >
                Reset
              </button>
            </div>
            <div className="p-4 flex gap-4 items-center">
              <label htmlFor="textip" className="font-bold">
                Enter Interval :
              </label>
              <input
                id="textip"
                value={input}
                disabled={gameState}
                className="border-2 px-4 py-1 w-20 rounded-md"
                onChange={(e) => setInput(Number(e.target.value))}
                type="text"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-slate-200 w-full flex flex-col items-center gap-4 p-4">
        <div className="w-3/4 flex flex-col bg-green-200 gap-4 ">
          {arrval.map((div) => (
            <div className="w-full flex justify-between gap-4 ">
              {div.map((hdiv) => (
                <div
                  className={`w-10 h-10 gap-4 ${
                    hdiv === 1 ? "bg-purple-300" : ""
                  }`}
                  onClick={() => handleColoredDiv(hdiv)}
                ></div>
              ))}
            </div>
          ))}
        </div>
        <div className="w-3/4 h-96 bg-blue-200">
          <table className="w-full  flex flex-col">
            <th className="w-full">
              <tr className="w-full flex justify-between bg-purple-300">
                <td className="text-center  w-1/2">Mouse Click Number</td>
                <td className="text-center  w-1/2">Reaction Time</td>
              </tr>
            </th>
            <tbody className="w-full">
              {tabData.map((row, index) => (
                <tr id={index} className="w-full flex justify-between ">
                  <td className="text-center  w-1/2">{row.clickNo}</td>
                  <td className="text-center  w-1/2">{row.reactTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
