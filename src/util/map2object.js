export default function map2Object(map) {
  // console.log(Object.prototype.toString.call(map).slice(8, -1))
  // if (Object.prototype.toString.call(map).slice(8, -1) !== 'Map') {
  //   throw new Error('must input map')
  // }
  const newData = {}
  const keys = map.keys()
  keys.forEach((key) => {
    newData[key] = map.get(key)
  })
  return newData
}
