const person = { 
	firstName: "John", 
	lastName: "Doe", 
	get fullName() { 
		return `${this.firstName} ${this.lastName}`; 
	}, 
	set fullName(name) { 
		const parts = name.split(" "); 
		this.firstName = parts[0]; 
		this.lastName = parts[1]; 
	}, 
}; 

// console.log(person.fullName); // "John Doe" 

// person.fullName = "Jane Smith"; 
// console.log(person.firstName); // "Jane" 
// console.log(person.lastName); // "Smith"

const temperature = { 
	_celsius: 0, 
	get fahrenheit() { 
		return this._celsius * 1.8 + 32; 
	}, 
	set fahrenheit(value) { 
		this._celsius = (value - 32) / 1.8; 
	}, 
}; 

console.log(temperature.fahrenheit); // 32 
temperature.fahrenheit = 78; 
console.log(temperature._celsius); // 20

