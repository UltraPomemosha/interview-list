export const css: CSSFunction = (obj, ...args) => {
  let res = ""
  for (const el of args) {
    res += `${obj[el] ?? ""} `
  }
  return res
}

type CSSFunction = (obj: StyleObj, ...args: string[]) => string

type StyleObj = {
  [key: string]: string
}

export const initCL: InitCL = (root, styleObj) => {
  const cl: CLFunction = (...args) => {
    const classes: string[] = []
    for (const el of args) classes.push(`${root}__${el}`)
    return classes.length ? css(styleObj, ...classes) : css(styleObj, root)
  }
  return cl
}

type InitCL = (root: string, styleObj: StyleObj) => CLFunction
type CLFunction = (...args: string[]) => string
