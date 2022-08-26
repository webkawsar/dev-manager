function getPersonInfo(one, two, three) {
    console.log(one);
    console.log(two);
    console.log(three);
  }
  
  const person = "Rasel";
  const age = 21;
  
  getPersonInfo `${person} is ${age} years old`;


  function checkAge(data) {
    if (data === { age: 18 }) {
      console.log("You are an adult!");
    } else if (data == { age: 18 }) {
      console.log("You are still an adult.");
    } else {
      console.log(`Hmm.. You don't have an age I guess`);
    }
  }
  
  checkAge({ age: 18 });


  function getAge(...args) {
    console.log(typeof args);
  }
  
  getAge(21);




//   function getAge() {
//     "use strict";
//     age = 21;
//     console.log(age);
//   }
  
//   getAge();






  const sum = eval("10*10+5");





//   22. How long is cool_secret accessible?
//   sessionStorage.setItem("cool_secret", 123);



// const 1 = 'one'
// can use _, $






const obj = { 1: "a", 2: "b", 3: "c" };
const set = new Set([1, 2, 3, 4, 5]);

obj.hasOwnProperty("1");
obj.hasOwnProperty(1);
set.has("1");
set.has(1);



const obj2 = { a: "one", b: "two", a: "three" };
console.log(obj2);







const a = {};
const b = { key: "b" };
const c = { key: "c" };

a[b] = 123;
a[c] = 456;

console.log(a[b]);





function sayHi() {
    return (() => 0)();
  }
  
  console.log(typeof sayHi());




  0;
  new Number(0);
  ("");
  (" ");
  new Boolean(false);
  undefined;



console.log(!!new Boolean(false));


const numbers = [1, 2, 3];
numbers[10] = 11;
console.log(numbers);



(() => {
    let x, y;
    try {
      throw new Error();
    } catch (x) {
      (x = 1), (y = 2);
      console.log(x);
    }
    console.log(x);
    console.log(y);
  })();



//   42. What does the `setInterval` method return in the browser?

// setInterval(() => console.log("Hi"), 1000);





// 43. What does this return?
console.log([..."Rasel"]);




// 44. What's the output?
function* generator(i) {
    yield i;
    yield i * 2;
  }
  
  const gen = generator(10);
  
  console.log(gen.next().value);
  console.log(gen.next().value);









