// Import the built-in 'util' module
const util = require('util');

// Function to convert text to uppercase
const convertToUpperCase = (text) => {
return text.toUpperCase();
};

// Initial output string
const outputString = "Hello world!";

// Convert the output string to uppercase using the function
const upperCaseString = convertToUpperCase(outputString);

// Print the result
console.log(upperCaseString);