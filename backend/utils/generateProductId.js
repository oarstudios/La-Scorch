// Function to generate a product ID starting with "PD" and 6 random digits
const generateProductId = () => {
    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    return `PD${randomDigits}`;
};

console.log(generateProductId()); // Example output: PD348921
