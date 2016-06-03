/// <reference path="../../typings/index.d.ts" />


/**
 * Returns a random (floating point) number between 0 (included) and 1 (excluded)
 * @returns {number} The generated random floating point number
 */
export function getRandom(): number {
    "use strict";
    return Math.random();
}


/**
 * Returns a random (floating point) number.
 * @param min - The minimum possible value (included)
 * @param max - The maximum value (excluded)
 * @returns {number} The generated random floating point number
 */
export function getRandomArbitrary(min: number, max: number): number {
    "use strict";
    return Math.random() * (max - min) + min;
}


/**
 * Returns a random integer between min (included) and max (excluded)
 * @param min - The minimum possible value (included)
 * @param max - The maximum possible value (excuded)
 * @returns {number} The generated random integer
 */
export function getRandomInt(min: number, max: number): number {
    "use strict";
    // Using Math.round() will give you a non-uniform distribution!
    return Math.floor(Math.random() * (max - min)) + min;
}


/**
 * Returns a random integer between min (included) and max (included)
 * @param min - The minimum possible value (included)
 * @param max - The maximum possible value (included)
 * @returns {any} The generated random integer
 */
export function getRandomIntInclusive(min: number, max: number): number {
    "use strict";
    // Using Math.round() will give you a non-uniform distribution!
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
