/// <reference path="../../typings/index.d.ts" />

import * as test from "tape";
import {List, Iterator} from "./list";
import {advance, find, distance, partition} from "./algorithm";


test("advance()", {}, function (t: test.Test): void {

    t.test("will properly advance 0 times",
        function (t:test.Test):void {
            const list:List<number> = List.fromArray([1, 2, 3, 4, 5, 6, 7, 8]);
            const it: Iterator<number> = list.begin();
            advance(it, 0);
            
            t.assert(it.equals(list.begin()));
            t.equal(it.value, 1);
            
            t.end();
        }
    );


    t.test("will properly advance the specified number of times",
        function (t:test.Test):void {
            const list:List<number> = List.fromArray([1, 2, 3, 4, 5, 6, 7, 8]);
            const it: Iterator<number> = list.begin();
            advance(it, 4);
            
            const itExpected: Iterator<number> = list.begin();
            itExpected.next();
            itExpected.next();
            itExpected.next();
            itExpected.next();

            t.assert(it.equals(itExpected));
            t.equal(it.value, 5);

            t.end();
        }
    );


    t.test("will properly advance and hit the end() element",
        function (t:test.Test):void {
            const list:List<number> = List.fromArray([1, 2, 3, 4, 5, 6, 7, 8]);
            const it: Iterator<number> = list.begin();
            advance(it, 10);
            t.assert(it.equals(list.end()));
            t.end();
        }
    );


    t.test("will properly advance when given a negative offset",
        function (t:test.Test):void {
            const list:List<number> = List.fromArray([1, 2, 3, 4, 5, 6, 7, 8]);
            const it: Iterator<number> = list.begin();
            advance(it, 5);
            t.equal(it.value, 6);
            advance(it, -4);
            t.equal(it.value, 2);
            advance(it, -4);
            t.equal(it.value, 1);
            t.end();
        }
    );
    
});


test("distance()", {}, function (t: test.Test): void {

    t.test("will return 0 when passed equivalent iterators",
        function (t:test.Test):void {
            const list:List<number> = List.fromArray([1, 2, 3, 4, 5, 6, 7, 8]);
            const itA: Iterator<number> = list.begin();
            const itB: Iterator<number> = list.begin();
            
            t.equal(distance(itA, itB), 0);
            t.equal(distance(itB, itA), 0);
            
            t.end();
        }
    );


    t.test("can correctly calculate the distance",
        function (t:test.Test):void {
            const list:List<number> = List.fromArray([1, 2, 3, 4, 5, 6, 7, 8]);
            const itA: Iterator<number> = list.begin();
            const itB: Iterator<number> = list.begin();
            advance(itB, 5);

            t.equal(distance(itA, itB), 5);
            
            t.end();
        }
    );

});


test("find()", {}, function (t: test.Test): void {

    t.test("can find an element in a List",
        function (t:test.Test):void {
            const list:List<number> = List.fromArray([1, 2, 3, 4, 5, 6, 7, 8]);

            const itFound: Iterator<number> = find(list.begin(), list.end(), 4);
            t.equals(itFound.value, 4);

            const itExpected: Iterator<number> = list.begin();
            advance(itExpected, 3);
            t.assert(itFound.equals(itExpected));

            t.end();
        }
    );

});


test("partition()", {}, function (t: test.Test): void {

    t.test("can partition a range with an even number of elements",
        function (t: test.Test): void {
            const list: List<number> = List.fromArray([8, 3, 6, 1, 5, 4, 9, 2, 7]);
            // First elment is not included in range to partition.
            const itSecondRange: Iterator<number> = partition(list.begin().offset(1), list.end(), curElem => curElem <= 5);

            t.equal(list.getAt(0), 8);
            t.equal(list.getAt(1), 3);
            t.equal(list.getAt(2), 2);
            t.equal(list.getAt(3), 1);
            t.equal(list.getAt(4), 5);
            t.equal(list.getAt(5), 4);
            t.equal(list.getAt(6), 9);
            t.equal(list.getAt(7), 6);
            t.equal(list.getAt(8), 7);
            t.true(itSecondRange.equals(list.begin().offset(6)));

            t.end();
        }
    );


    t.test("can partition a range with an odd number of elements",
        function (t: test.Test): void {
            const list: List<number> = List.fromArray([8, 3, 10, 6, 1, 5, 4, 9, 2, 7]);
            // First elment is not included in range to partition.
            const itSecondRange: Iterator<number> = partition(list.begin().offset(1), list.end(), curElem => curElem <= 5);

            t.equal(list.getAt(0), 8);
            t.equal(list.getAt(1), 3);
            t.equal(list.getAt(2), 2);
            t.equal(list.getAt(3), 4);
            t.equal(list.getAt(4), 1);
            t.equal(list.getAt(5), 5);
            t.equal(list.getAt(6), 6);
            t.equal(list.getAt(7), 9);
            t.equal(list.getAt(8), 10);
            t.equal(list.getAt(9), 7);
            t.true(itSecondRange.equals(list.begin().offset(6)));

            t.end();
        }
    );

});
