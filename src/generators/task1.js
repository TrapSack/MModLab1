import { generate_probability } from "./generate_probability";

export const task1_generator = (prob, n = 10 ** 6) =>
  generate_probability(n) < prob;
