export default function getProcessOptions(props) {
  const result = {}

  if (typeof props === 'undefined') {
    return result
  }

  const keys = ['quality', 'blur', 'opacity', 'fade', 'posterize']
  keys.forEach((key) => {
    const temp = props[key]
    if (temp) {
      result[key] = temp
    }
  })
  return result
}
