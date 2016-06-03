/// <reference path="../../typings/index.d.ts" />

import {Iterator} from "./list";


/**
 * Advances an Iterator the specified number of times.
 * @param it - The Iterator to advance
 * @param offset - The number of times the iterator should be advanced.
 */
export function advance<ValueType>(it: Iterator<ValueType>, offset: number): void {
    "use strict";

    const fn: () => void = offset < 0 ? it.prev.bind(it) : it.next.bind(it);
    const numIterations: number = Math.abs(offset);        
        
    for (let i: number = 0; i < numIterations; ++i) {
        fn();
    }
}


/**
 * Calculates the distance between two (ordered) iterators.
 * @param itA - The lower Iterator
 * @param itB - The upper Iterator
 * @returns {number} The distance from itA to itB
 */
export function distance<ValueType>(itA: Iterator<ValueType>, itB: Iterator<ValueType>): number {
    "use strict";

    let distance: number = 0;
    let itCur: Iterator<ValueType> = itA.offset(0);

    while (!itCur.equals(itB)) {
        itCur.next();
        ++distance;
    }

    return distance;
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


/**
 * Partitions the range [itFirst, itLast) so that all values in the range for
 * which the unary predicate pred returns true will precede all the values for
 * with it returns false.  This is not a stable partition.
 * @param itFirst - The first element in the range to be partitioned (inclusive)
 * @param itLast - The end of the range to be partitioned (exclusive)
 * @param pred - The unary predicate that will be invoked on each element
 * @returns {Iterator<ValueType>} An Iterator pointing to the beginning of the
 * range of false yielding elements.
 */
export function partition<ValueType>(
    itFirst: Iterator<ValueType>,
    itLast:  Iterator<ValueType>,
    pred:    (val: ValueType) => boolean
): Iterator<ValueType> {
    "use strict";

    // If the range specified has 0 size, just return.
    if (itFirst.equals(itLast)) {
        return itFirst;
    }
    
    let itLeft: Iterator<ValueType> = itFirst.offset(0);
    let itRight: Iterator<ValueType> = itLast.offset(-1);
    
    while (!itLeft.equals(itRight)) {
        
        // Advance left towards the right as long as the predicate is returning true.
        while (!itLeft.equals(itRight) && pred(itLeft.value)) { itLeft.next(); }

        // Advance right towards the left as long as the predicate is returning false.
        while (!itRight.equals(itLeft) && !pred(itRight.value)) { itRight.prev(); }
        
        if (!itLeft.equals(itRight)) {
            swap(itLeft, itRight);
        }
    }

    // At this point itLeft and itRight are pointing at the same element.  We
    // need to figure out which range that element belongs to.
    if (pred(itLeft.value)) {
        // The second range (of false yielding values) will begin one to the right.
        return itLeft.offset(1);
    } else {
        // The second range (of false yielding values) begins here.
        return itRight;
    }
    
    function swap(itA: Iterator<ValueType>, itB: Iterator<ValueType>): void {
        const tmpVal: ValueType = itA.value;
        itA.value = itB.value;
        itB.value = tmpVal;
    }
}


/**
 * Does an in-place sort of the elements in the range [itFirst, itLast).  The
 * Quicksort algorithm has O(n * log(n)) complexity.
 * @param itFirst - The first element in the range to be sorted (included)
 * @param itLast - The last element of the range to be sorted (excluded)
 */
export function quicksort<ValueType>(
    itFirst: Iterator<ValueType>,
    itLast:  Iterator<ValueType>
): void {
    "use strict";

    // todo: Implement.
    //
    // Pseudocode
    // ----------
    // Check for the base cases and return early if possible.
    // Get an iterator to a random element (the pivot) in [itFirst, itLast).
    // Remove the selected pivot element, updating itFirst and itLast if necessary
    // partition() from itFirst to itLast based on curVal <= pivot
    // Insert the pivot element at the beginning of the second range (returned from partition()).
    // quicksort() the range in front of the pivot.
    // quicksort() the range following the pivot.
}
