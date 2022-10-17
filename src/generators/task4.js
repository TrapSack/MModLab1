import { generate_probability } from "./generate_probability";

export const task4_generator = (probs, n = 10 ** 6) => {
  const number = generate_probability(n);
  let sum = 0;
  for (let i in probs) {
    sum += probs[i];
    if (sum >= number) return i;
  }
  return probs.length - 1;
};
