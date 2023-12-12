const findTheOldest = function(obj) {
    const maxAge =  obj.reduce((max, item) => (item.yearOfDeath ? item.yearOfDeath : new Date().getFullYear()) - item.yearOfBirth > max ? (item.yearOfDeath ? item.yearOfDeath : new Date().getFullYear()) - item.yearOfBirth : max, 0)
    return obj.find(item => (item.yearOfDeath ? item.yearOfDeath : new Date().getFullYear()) - item.yearOfBirth == maxAge)
};

// Do not edit below this line
module.exports = findTheOldest;
