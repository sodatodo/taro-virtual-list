/**
 * 判断两个数组相等
 * @param {any[]} newInputs
 * @param {any[]} lastInputs
 * @returns {boolean}
 */
const areInputsEqual = (newInputs, lastInputs) => {
  if (newInputs instanceof Array && lastInputs instanceof Array) {
    if (newInputs.length !== lastInputs.length) {
      return false
    }
    for (let index = 0; index < newInputs.length; index++) {
      if (newInputs[index] !== lastInputs[index]) {
        return false
      }
    }
    return true
  } else {
    return false
  }
}

/**
 * 记录一个上下文的寄存器
 * @param resultFn
 * @param isEqual
 * @returns
 */
const memoizeOne = (resultFn: any, isEqual?: any) => {
  if (isEqual === void 0) isEqual = areInputsEqual

  let lastThis
  let lastArgs: any[] = []
  let lastResult
  let calledOnce = false

  // function memoized() {
  //     const newArgs: any[] = [];
  //     for (let index = 0; index < arguments.length; index++) {
  //         newArgs[index] = arguments[index];
  //     }
  //     if (calledOnce && lastThis === this && isEqual(newArgs, lastArgs)) {
  //         return lastResult;
  //     }
  //     lastResult = resultFn.apply(this, newArgs);
  //     calledOnce = true;
  //     lastThis = this;
  //     lastArgs = newArgs;
  //     return lastResult
  // }
  const memoized = (...args) => {
    const newArgs: any[] = []
    for (let index = 0; index < args.length; index++) {
      newArgs[index] = args[index]
    }
    if (calledOnce && lastThis === this && isEqual(newArgs, lastArgs)) {
      return lastResult
    }
    lastResult = resultFn.apply(this, newArgs)
    calledOnce = true
    lastThis = this
    lastArgs = newArgs
    return lastResult
  }

  return memoized
}

export { memoizeOne }
