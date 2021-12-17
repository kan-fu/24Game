const calc = (nums, target) => {
  if (nums.length !== 4) {
    return 'Need four numbers'
  }
  const len = 4

  const masks = [
    [1, 0, 0, 1, 1, 0, 0, 1], // (a+b)+(c+d)
    [1, 0, 1, 0, 0, 2, 0, 0], // (a+(b+c))+d
    [2, 0, 0, 1, 0, 1, 0, 0], // ((a+b)+c)+d
    [0, 0, 2, 0, 0, 1, 0, 1], // a+((b+c)+d)
    [0, 0, 1, 0, 1, 0, 0, 2], // a+(b+(c+d))
  ]

  for (let perm of permutations(nums)) {
    for (let mask of masks) {
      let operands = [...perm]
      // Add parentheses to the operands
      for (let i = 0; i < len; i++) {
        operands[i] = `${'('.repeat(mask[i * 2])}${operands[i]}${')'.repeat(
          mask[i * 2 + 1]
        )}`
      }
      const operatorsList = product('+-*/', len - 1)
      for (let operators of operatorsList) {
        const formula =
          operands[0] +
          operators[0] +
          operands[1] +
          operators[1] +
          operands[2] +
          operators[2] +
          operands[3]
        // eslint-disable-next-line
        if (Math.abs(eval(formula) - target) < 1e-8) {
          return formula
        }
      }
    }
  }
  return 'No solution!'
}

const product = (args, repeat) => {
  const pools = Array(repeat).fill(args)
  let result = [[]]
  pools.forEach((pool) => {
    let result_tmp = []
    for (let x of result) {
      for (let y of pool) {
        result_tmp.push(x.concat(y))
      }
    }
    result = [...result_tmp]
  })
  return result
}

const permutations = (arr) => {
  if (arr.length === 2) {
    return arr[1] !== arr[0] ? [arr, [arr[1], arr[0]]] : [arr]
  }

  if (arr.length === 1) {
    return arr
  }

  const permutationsArray = []

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]

    if (arr.indexOf(item) !== i) continue

    const remainingChars = [...arr.slice(0, i), ...arr.slice(i + 1, arr.length)]

    for (let permutation of permutations(remainingChars)) {
      permutationsArray.push([item, ...permutation])
    }
  }
  return permutationsArray
}
export default calc
