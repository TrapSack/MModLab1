export const getRandomInt = (max) => Math.random() * max;

export const generate_probability = (n = 10 ** 6) => getRandomInt(n) / n;
