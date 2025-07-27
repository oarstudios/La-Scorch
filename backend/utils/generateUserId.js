const generateUserId = () => {
    return 'USR' + Date.now().toString().slice(-6); // Ex: USR123456
};

module.exports = generateUserId;
