/// <reference path="../../typings/index.d.ts" />

import * as test from "tape";
import {List, Iterator, MoveIteratorRetType} from "./list";

test("List", {}, function (t: test.Test): void {
    
    
    t.test("static",
        function (t: test.Test): void {
            
            
            t.test("fromArray() can be used to populate a list",
                function (t: test.Test): void {
                    
                    const list: List<number> = List.fromArray([1, 2, 3]);
                    
                    t.equal(list.getAt(0), 1);
                    t.equal(list.getAt(1), 2);
                    t.equal(list.getAt(2), 3);
                    t.end();
                }
            );
            
            
        }
    );
    

    t.test("can be constructed", function (t: test.Test): void {
        const list: List<number> = new List<number>();
        t.ok(list);
        t.end();
    });

    t.test("initially length should be 0",
        function (t: test.Test): void {
            const list: List<number> = new List<number>();
            t.equal(list.length, 0);
            t.end();
        }
    );


    t.test("isEmpty() should return true for an empty list",
        function (t: test.Test): void {
            const list: List<number> = new List<number>();
            t.equal(list.length, 0);
            t.equal(list.isEmpty, true);
            t.end();
        }
    );


    t.test("isEmpty() should return false for a non-empty list",
        function (t: test.Test): void {
            const list: List<number> = new List<number>();
            list.push(1);
            t.equal(list.length, 1);
            t.equal(list.isEmpty, false);
            t.end();
        }
    );


    t.test("begin(), end() and value() can be used to iterate values in a List",
        function (t: test.Test): void {
            const list: List<number> = new List<number>();
            list.push(1);
            list.push(2);
            list.push(3);
            
            let expected: number = 1;
            
            for (let it: Iterator<number> = list.begin(); !it.equals(list.end()); it.next()) {
                t.equal(it.value, expected);
                ++expected;
            }
            
            t.end();
        }
    );

    t.test("push() should add an item to the end of list",
        function (t: test.Test): void {
            const list: List<number> = new List<number>();
            list.push(1);
            t.equal(list.length, 1);
            
            // Should allow chaining.
            list.push(2).push(3);
            t.equal(list.length, 3);
            
            t.end();
        }
    );


    t.test("pop() should remove an item from the end of the list",
        function (t: test.Test): void {
            const list: List<number> = new List<number>();
            list.push(1).push(2).push(3);
            t.equal(list.length, 3);

            t.equal(list.pop(), 3);
            t.equal(list.pop(), 2);
            t.equal(list.pop(), 1);

            t.end();
        }
    );


    t.test("remove() should remove the specified node",
        function (t: test.Test): void {
            const list: List<number> = new List<number>();
            list.push(1).push(2).push(3);

            let itRemove: Iterator<number> = list.begin();
            itRemove.next();
            list.remove(itRemove);

            t.equal(list.length, 2);
            t.equal(list.pop(), 3);
            t.equal(list.pop(), 1);

            t.end();
        }
    );


    t.test("getAt() should return the value at the specified index",
        function (t: test.Test): void {
            const list: List<number> = new List<number>();
            list.push(1).push(2).push(3);

            t.equal(list.getAt(0), 1);
            t.equal(list.getAt(1), 2);
            t.equal(list.getAt(2), 3);
            t.end();
        }
    );


    t.test("getAt() should throw if the index specified is too low",
        function (t: test.Test): void {
            t.plan(1);

            const list: List<number> = new List<number>();
            list.push(1).push(2).push(3);

            t.throws(() => {
               list.getAt(-1);
            });
        }
    );


    t.test("getAt() should throw if the index specified is too high",
        function (t: test.Test): void {
            t.plan(1);

            const list: List<number> = new List<number>();
            list.push(1).push(2).push(3);

            t.throws(() => {
                list.getAt(3);
            });
        }
    );


    t.test("insert() should insert the specified value in front of the specified element",
        function (t: test.Test): void {
            const list: List<number> = new List<number>();
            list.push(2).push(4).push(6);
            let it: Iterator<number> = list.begin();
            it.next();
            const itResult: Iterator<number> = list.insert(it, 3);

            t.equal(list.length, 4);
            t.equal(list.getAt(0), 2);
            t.equal(list.getAt(1), 3);
            t.equal(list.getAt(2), 4);
            t.equal(list.getAt(3), 6);
            t.equal(itResult.value, 3);
            t.end();
        }
    );


    t.test("insert() can be used to insert multiple elements",
        function (t: test.Test): void {
            const list: List<number> = List.fromArray([5, 10, 15]);
            let it: Iterator<number> = list.begin();
            it.next();
            const itResult: Iterator<number> = list.insert(it, 6, 7);

            t.equal(list.length, 5);
            t.equal(list.getAt(0), 5);
            t.equal(list.getAt(1), 6);
            t.equal(list.getAt(2), 7);
            t.equal(list.getAt(3), 10);
            t.equal(list.getAt(4), 15);
            t.equal(itResult.value, 6);
            t.end();
        }
    );



    t.test("toArray() should return an array with the same contents",
        function (t: test.Test): void {
            
            const list: List<number> = List.fromArray([1, 2, 3]);
            const arr: number[] = list.toArray();
            
            t.equal(arr[0], 1);
            t.equal(arr[1], 2);
            t.equal(arr[2], 3);
            
            t.end();
        }
    );
    

    t.test("ForwardIterator",
        function (t: test.Test): void {

            t.test("can traverse a 0-length list",
                function (t: test.Test): void {
                    const list: List<number> = new List<number>();
                    const it: Iterator<number> = list.begin();
                    t.assert(it.next().done);
                    t.end();
                }
            );
            
            
            t.test("Is equal() to another iterator that is pointing at the same node",
                function (t: test.Test): void {
                    const list: List<number> = new List<number>();
                    list.push(1);
                    t.equal(list.length, 1);

                    const it1: Iterator<number> = list.begin();
                    const it2: Iterator<number> = list.begin();

                    t.assert(it1.equals(it2));
                    t.end();
                }
            );


            t.test("is not euqal() to another iterator pointing at a different node",
                function (t: test.Test): void {
                    const list: List<number> = new List<number>();
                    list.push(1);
                    t.equal(list.length, 1);

                    const it1: Iterator<number> = list.begin();
                    const it2: Iterator<number> = list.end();

                    t.assert(!it1.equals(it2));
                    t.end();
                }
            );
            
            
            t.test("can clone() to get an equivlent, independent Iterator",
                function (t: test.Test): void {
                    const list: List<number> = List.fromArray([1, 2, 3]);
                    const itA: Iterator<number> = list.begin();
                    const itB: Iterator<number> = itA.clone();
                    
                    t.assert(itA.equals(itB));
                    t.equal(itA.value, itB.value);
                    
                    itB.next();

                    t.assert(!itA.equals(itB));
                    t.notEqual(itA.value, itB.value);
                    
                    t.end();
                }
            );


            t.test("can traverse a 1-element list",
                function (t: test.Test): void {
                    const list: List<number> = new List<number>();
                    list.push(1);
                    t.equal(list.length, 1);
                    
                    const it: Iterator<number> = list.begin();
                    
                    let res: MoveIteratorRetType = it.next();
                    t.equal(res.done, false);
                    t.equal(res.value, 1);

                    res = it.next();
                    t.equal(res.done, true);
                    
                    t.end();
                }
            );


            t.test("can traverse a 3-element list",
                function (t: test.Test): void {
                    const list: List<number> = new List<number>();
                    list.push(1);
                    list.push(2);
                    list.push(3);
                    t.equal(list.length, 3);

                    const it: Iterator<number> = list.begin();

                    let res: MoveIteratorRetType = it.next();
                    t.equal(res.done, false);
                    t.equal(res.value, 1);

                    res = it.next();
                    t.equal(res.done, false);
                    t.equal(res.value, 2);

                    res = it.next();
                    t.equal(res.done, false);
                    t.equal(res.value, 3);

                    res = it.next();
                    t.equal(res.done, true);

                    t.end();
                }
            );


        }
    );

});
