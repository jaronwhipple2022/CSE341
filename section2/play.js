var name = 'Max';
console.log(name);

var age = 25;
var hasHobbies = true;

function sumUser(uName, uAge, uHobbies) {
    return{
        'Name is ': uName +
        ', age is ' + uAge +
        ', and they have hobbies: ' + uHobbies
    };
}

console.log(sumUser(name, age, hasHobbies));

//"let" variable can be manipulated or "const" wont let a variable 

//arrow functions
const sumUser2 = (uName, uAge, uHobbies) => {
    return{
        'Name is ': uName +
        ', age is ' + uAge +
        ', and they have hobbies: ' + uHobbies
    };
}

const add = (a,b) => a + b;
const add1 = a => a + 1;

//objects
const person = {
    name: 'Max',
    age: 29,
    greet() {
        console.log('Hi, I am ' + this.name);
    }
};

//arrays
const hobbies = ['sports', 'hunting'];
for (let hobby of hobbies) {
    console.log(hobby);
}

// returns new array
hobbies.map();