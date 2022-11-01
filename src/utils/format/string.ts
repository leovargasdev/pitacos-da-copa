export const getSlugFromText = (value: string): string => {
  if (!value) {
    return ''
  }

  let newValue = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  newValue = newValue.replace(/ +(?= )/g, '')
  newValue = newValue = new URLSearchParams(newValue).toString()
  newValue = newValue.replace(/\+/g, '-').replace(/[^\w-]+/g, '')

  return newValue.toLocaleLowerCase()
}
