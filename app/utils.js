/**
 * @param {Number} max
 * @param {Number} index
 * @return {String} color
 */
const getColor = (max, index) => {
    return `hsla(${Math.floor(360 / max) * index}, 100%, 50%,0.4)`;
};

/**
 * @return {String}
 */
const getRandomColor = () => {
    return `hsla(${Math.floor(360 / Math.random())}, 100%, 50%,0.4)`;
};

export {
    getColor,
    getRandomColor
}
