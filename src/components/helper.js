export const rand = (upperLimit, prev = -1) => {
  const newRand = Math.floor(Math.random() * upperLimit)
  return newRand === prev ? (newRand + 1) % upperLimit : newRand
}

export const spaceAroundOp = (formula) => {
  return formula.replace(/[+\-×/]/g, ' $& ')
}
