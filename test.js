const str = 'https://swapi.dev/api/people/1/'

const lastItem = str.split('/')
console.log(lastItem[lastItem.length - 2])
