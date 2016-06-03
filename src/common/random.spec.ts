/// <reference path="../../typings/index.d.ts" />

import * as test from "tape";
import {getRandom, getRandomFloat, getRandomInt, getRandomIntInclusive} from "./random";


test("getRandom()", {}, function (t: test.Test): void {


    t.test("should return a number in [0, 1)",
        function (t: test.Test): void {

            for (let i: number = 0; i < 100; ++i) {
                let random: number = getRandom();
                t.true((random >= 0) && (random < 1));
            }

            t.end();
        }
    );

});


test("getRandomFloat()", {}, function (t: test.Test): void {


    t.test("desc",
        function (t: test.Test): void {
            for (let i: number = 0; i < 100; ++i) {
                let random: number = getRandomFloat(2.5, 8.5);
                t.true((random >= 2.5) && (random < 8.5));
            }

            t.end();
        }
    );

});


test("getRandomInt()", {}, function (t: test.Test): void {


    t.test("desc",
        function (t: test.Test): void {

            for (let i: number = 0; i < 100; ++i) {
                let random: number = getRandomInt(1, 20);
                t.true((random >= 1) && (random < 20));
            }

            t.end();
        }
    );

});


test("getRandomIntInclusive()", {}, function (t: test.Test): void {


    t.test("desc",
        function (t: test.Test): void {

            for (let i: number = 0; i < 100; ++i) {
                let random: number = getRandomIntInclusive(1, 10);
                t.true((random >= 1) && (random <= 10));
            }

            t.end();
        }
    );

});
