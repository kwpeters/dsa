import {Iterator} from "./list";


/**
 * Advances an Iterator the specified number of times.
 * @param it - The Iterator to advance
 * @param numTimes - The number of times the iterator should be advanced.
 */
export function advance<ValueType>(it: Iterator<ValueType>, numTimes: number): void {
    "use strict";
    
    for (let i: number = 0; i < numTimes; ++i) {
        it.next();
    }
}


/**
 * Attempts to find the specified value in the range [itBegin, itEnd)
 * @param itBegin - The beginning of the range to search (inclusive)
 * @param itEnd - The end of the range to search (exclusive)
 * @param value - The value to search for
 * @returns {Iterator<ValueType>} - If successful, an Iterator pointing to the
 * first element in [itBegin, itEnd) whose value equals value.  If a matching
 * element was not found, itEnd is returned.
 */
export function find<ValueType>(
    itBegin: Iterator<ValueType>,
    itEnd: Iterator<ValueType>,
    value: ValueType
): Iterator<ValueType> {
    "use strict";
    
    let itCur: Iterator<ValueType> = itBegin;
    
    while (!itCur.equals(itEnd)) {
        if (itCur.value === value) {
            break;
        }
        itCur.next();
    }
    
    return itCur;    
}
