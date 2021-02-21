const chunk = (arr, size) => {
  const test = [1,2,3,4,5,6,7,8,9,10]
  const chunkedItems = test.reduce((resultArray, el, index) => {
  const chunkIndex = Math.floor(index/size)
  if (!resultArray[chunkIndex]) {
    resultArray[chunkIndex] = []
  }
  resultArray[chunkIndex].push(el)
  }, [])
  return resultArray
}

console.log(chunk([1,2,3,4,5,6,7,8,9,10],2))