const arr = [
  { id: 1, name: "John", age: 30, city: "New York" },
  { id: 2, name: "Alice", age: 25, city: "Los Angeles" },
  { id: 3, name: "Bob", age: 40, city: "Chicago" },
  { id: 4, name: "Emily", age: 35, city: "San Francisco" },
  { id: 5, name: "David", age: 28, city: "Seattle" }
];




const [ele1, ele2, ...rest] = arr
console.log(rest)