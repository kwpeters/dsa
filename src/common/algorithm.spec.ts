/// <reference path="../../typings/index.d.ts" />

import * as test from "tape";
import {List, Iterator} from "./list";
import {advance, find} from "./algorithm";


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
