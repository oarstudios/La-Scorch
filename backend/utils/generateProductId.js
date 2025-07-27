// Function to generate a random 6-digit product ID
const generateProductId = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};