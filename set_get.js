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

console.log(person.fullName); // "John Doe" 

person.fullName = "Jane Smith"; 
console.log(person.firstName); // "Jane" 
console.log(person.lastName); // "Smith"
