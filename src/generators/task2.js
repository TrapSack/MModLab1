import { task1_generator } from "./task1";

export const task2_generator = (probs, n) =>
  probs.map((item) => task1_generator(item, n));
