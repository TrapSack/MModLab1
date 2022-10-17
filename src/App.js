import { useState } from "react";
import { task1_generator } from "./generators/task1";
import { task2_generator } from "./generators/task2";
import { task3_generator, task3_practical_generator } from "./generators/task3";
import { task4_generator } from "./generators/task4";
import "./App.css";

const N = 10 ** 6;

function App() {
  return (
    <div className="App">
      <Task1 />
      <Task2 />
      <Task3 />
      <Task4 />
    </div>
  );
}

const Task1 = () => {
  const [prob, setProb] = useState("");
  const [result, setResult] = useState("");

  const handleSetProb = (value) => {
    setProb(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const probNumber = Number(prob);
    if (probNumber < 0 || prob > 1) return;

    const probs = {
      true: 0,
      false: 0,
      toString: () => `True: ${this.true}, False: ${this.false}`,
    };
    for (let i = 0; i < N; i++) {
      const is_true = task1_generator(probNumber);
      probs[is_true] += 1;
    }

    for (let k in probs) {
      probs[k] /= N;
    }

    setResult(probs);
  };

  return (
    <div>
      <h3>Task 1</h3>
      <form onSubmit={handleSubmit}>
        <div>Input number</div>
        <input value={prob} onChange={(e) => handleSetProb(e.target.value)} />
        <button type="submit">Generate Task 1 </button>
        {(prob < 0 || prob > 1) && <div>Probability should be from 0 to 1</div>}
      </form>
      {result && (
        <>
          <div>True: {result.true}</div>
          <div>False: {result.false}</div>
        </>
      )}
    </div>
  );
};

const Task2 = () => {
  const [prob, setProb] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSetProb = (value) => {
    setProb(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prob) return;

    const probNumber = prob.split(" ").map((item) => Number(item));

    if (probNumber.some((item) => isNaN(item) || item > 1 || item < 0)) {
      setError("Incorrect input");
      setResult(null);
      return;
    }

    setError("");

    setResult(task2_generator(probNumber));
  };

  return (
    <div>
      <h3>Task 2</h3>
      <form onSubmit={handleSubmit}>
        <div>Input list of probabilities (e.g. 0.2 0.3 0.4)</div>
        <input value={prob} onChange={(e) => handleSetProb(e.target.value)} />
        <button type="submit">Generate Task 2 </button>
        {error && <div> {error}</div>}
      </form>
      {!!result?.length &&
        result.map((item, idx) => (
          <div key={idx}>
            {idx + 1}: {item.toString()}
          </div>
        ))}
    </div>
  );
};

const Task3 = () => {
  const [prob, setProb] = useState({
    pa: "",
    pba: "",
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSetProb = ({ value, name }) => {
    if (isNaN(Number(value))) return;
    setProb((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let is_true = true;

    Object.entries(prob).forEach(([key, val]) => {
      const valNum = Number(val);
      if (!valNum || valNum > 1 || valNum < 0) is_true = false;
    });

    if (!is_true) setError("Incorrect input");

    if (is_true) {
      setError("");
      const theoretical_probs = task3_generator(
        Number(prob.pa),
        Number(prob.pba)
      );
      const practical_probs = {};

      for (let _ = 0; _ < N; _++) {
        const number = task3_practical_generator(
          Number(prob.pa),
          Number(prob.pba)
        );
        let key = 0;

        switch (number) {
          case 0:
            key = "pab";
            break;
          case 1:
            key = "pnab";
            break;
          case 3:
            key = "panb";
            break;
          default:
            key = "pnanb";
            break;
        }
        if (practical_probs[key] !== undefined) {
          practical_probs[key] += 1;
        } else {
          practical_probs[key] = 0;
        }
      }

      for (let k in practical_probs) practical_probs[k] /= N;

      setResult(`P(AB)= ${theoretical_probs["pab"]} (theoretical); ${practical_probs["pab"]} (practical)\n
      P(~AB)=${theoretical_probs["pnab"]} (theoretical); ${practical_probs["pnab"]} (practical)\n
      P(A~B)=${theoretical_probs["panb"]} (theoretical); ${practical_probs["pnanb"]} (practical)\n
      P(~A~B)=${theoretical_probs["pnanb"]} (theoretical); ${practical_probs["panb"]} (practical)\n`);
    }

    // setError("");
  };

  return (
    <div>
      <h3>Task 3</h3>
      <form onSubmit={handleSubmit}>
        <div>Input P(A)</div>
        <input
          value={prob.pa}
          onChange={(e) => handleSetProb(e.target)}
          name="pa"
        />
        <div>Input P(B|A)</div>
        <input
          value={prob.pba}
          onChange={(e) => handleSetProb(e.target)}
          name="pba"
        />
        <div>
          <button type="submit">Generate Task 3</button>
        </div>
        {error && <div> {error}</div>}
      </form>
      {result}
    </div>
  );
};

const Task4 = () => {
  const [prob, setProb] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSetProb = (value) => {
    setProb(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prob) return;

    const probNumber = prob.split(" ").map((item) => Number(item));

    if (probNumber.some((item) => isNaN(item) || item > 1 || item < 0)) {
      setError("Incorrect input");
      setResult(null);
      return;
    }

    const probSum = probNumber.reduce((acc, item) => acc + item, 0);

    if (probSum !== 1) {
      setError("Sum of probs must be 1");
      return;
    }

    let practical_probs = probNumber.map((item) => 0);

    for (let _ = 0; _ < N; _++) {
      practical_probs[task4_generator(probNumber)] += 1;
    }

    practical_probs = practical_probs.map((item) => item / N);

    setError("");

    setResult(`Practical: ${practical_probs}\n
    Theoretical: ${probNumber}\n`);
  };

  return (
    <div>
      <h3>Task 4</h3>
      <form onSubmit={handleSubmit}>
        <div>Input list of probabilities (e.g. 0.2 0.3 0.4)</div>
        <input value={prob} onChange={(e) => handleSetProb(e.target.value)} />
        <button type="submit">Generate Task 4 </button>
        {error && <div> {error}</div>}
      </form>
      {!error && result}
    </div>
  );
};

export default App;
