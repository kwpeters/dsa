/// <reference path="../../typings/index.d.ts" />

import * as test from "tape";
import {List} from "./list";

test("List", {}, function (t: test.Test): void {

    t.test("can be constructed", function (t: test.Test): void {
        const list: List<number> = new List<number>();
        t.ok(list);
        t.end();
    });

});
