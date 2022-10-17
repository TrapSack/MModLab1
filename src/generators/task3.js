import { getRandomInt } from "./generate_probability";

export const task3_generator = (pa, pba) => {
  const pna = 1 - pa;
  const pab = pa * pba;

  const pbna = 1 - pba;
  const pnab = pbna * pna;

  const pnba = (pa - pab - pnab) / (2 * pa - 1);

  const panb = pnba * pa;
  const pnanb = (1 - pnba) * (1 - pa);

  console.log("Check sum:", pab + panb + pnab + pnanb);

  return {
    pab,
    panb,
    pnab,
    pnanb,
  };
};

export const task3_practical_generator = (pa, pba, n = 10 ** 6) => {
  const pp = [];

  for (let i = 0; i < 2; i++) {
    pp.push(getRandomInt(n) / n);
  }
  if (pp[0] <= pa && pp[1] <= pba) return 0;
  if (pp[0] > pa && pp[1] <= 1 - pba) return 1;
  if (pp[0] <= pa && pp[1] > pba) return 2;
  if (pp[0] > pa && pp[1] > 1 - pba) return 3;

  return "No match number";
};
