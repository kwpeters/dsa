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
            t.equal(list.getAt(0), 1);
            
            // Should allow chaining.
            list.push(2).push(3);
            t.equal(list.length, 3);
            t.equal(list.getAt(1), 2);
            t.equal(list.getAt(2), 3);

            t.end();
        }
    );


    t.test("pop() should remove an item from the end of the list",
        function (t: test.Test): void {
            const list: List<number> = new List<number>();
            list.push(1).push(2).push(3);
            t.equal(list.length, 3);

            t.equal(list.pop(), 3);
            t.equal(list.length, 2);
            t.equal(list.pop(), 2);
            t.equal(list.length, 1);
            t.equal(list.pop(), 1);
            t.equal(list.length, 0);

            t.end();
        }
    );


    t.test("remove()",
        function (t: test.Test): void {
           
            t.test("should be able to remove the specified element",
                function (t: test.Test): void {
                    const list: List<number> = new List<number>();
                    list.push(1).push(2).push(3);
    
                    let itRemove: Iterator<number> = list.begin().offset(1);
                    list.remove(itRemove);
    
                    t.equal(list.length, 2);
                    t.equal(list.getAt(0), 1);
                    t.equal(list.getAt(1), 3);
    
                    t.end();
                }
            );
    
    
            t.test("should be able to remove the last element",
                function (t: test.Test): void {
                    const list: List<number> = List.fromArray([1, 2, 3]);
                    let it: Iterator<number> = list.begin().offset(2);
                    list.remove(it);
            
                    it = list.begin();
                    t.equal(it.value, 1);
                    it.next();
                    t.equal(it.value, 2);
                    it.next();
                    t.assert(it.equals(list.end()));

                    t.end();
                }
            );

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
    
    
    t.test("quicksort()",
        function (t: test.Test): void {
    
            t.test("can sort a List of numbers",
                function (t: test.Test): void {
                    const list: List<number> = List.fromArray([8, 3, 6, 1, 5, 4, 9, 2, 7]);
                    list.quicksort();

                    t.equal(list.length, 9);

                    t.equal(list.getAt(0), 1);
                    t.equal(list.getAt(1), 2);
                    t.equal(list.getAt(2), 3);
                    t.equal(list.getAt(3), 4);
                    t.equal(list.getAt(4), 5);
                    t.equal(list.getAt(5), 6);
                    t.equal(list.getAt(6), 7);
                    t.equal(list.getAt(7), 8);
                    t.equal(list.getAt(8), 9);
    
                    t.end();
                }
            );


            t.test("can sort a very  large array",
                function (t: test.Test): void {

                    const list:List<number> = List.fromArray([
                        879, 14, 637, 224, 246, 252, 126, 809, 902, 874, 190, 539, 940, 564, 649, 598, 724, 359, 449, 790,
                        891, 742, 568, 139, 280, 899, 894, 934, 932, 155, 763, 54, 849, 165, 538, 153, 184, 418, 632, 403,
                        699, 467, 138, 169, 621, 716, 786, 33, 148, 42, 198, 792, 601, 323, 936, 795, 643, 693, 267, 710,
                        314, 21, 531, 578, 401, 277, 762, 227, 865, 30, 176, 700, 232, 947, 938, 977, 394, 554, 233, 258,
                        406, 214, 736, 613, 921, 968, 553, 745, 944, 638, 462, 508, 959, 90, 991, 411, 512, 907, 917, 773,
                        76, 659, 366, 354, 600, 610, 504, 995, 283, 900, 249, 47, 427, 464, 979, 566, 831, 132, 990, 196,
                        333, 65, 185, 437, 906, 48, 666, 540, 288, 535, 270, 466, 698, 430, 843, 552, 810, 651, 9, 526, 317,
                        563, 784, 751, 98, 111, 140, 424, 584, 672, 739, 579, 618, 299, 247, 94, 18, 929, 8, 888, 853, 281,
                        287, 262, 678, 62, 92, 388, 817, 70, 463, 107, 674, 878, 400, 687, 776, 273, 231, 95, 748, 967, 332,
                        948, 754, 421, 218, 439, 58, 181, 633, 825, 757, 117, 537, 311, 89, 778, 998, 653, 783, 26, 101, 671,
                        88, 756, 228, 472, 149, 173, 12, 39, 727, 415, 361, 864, 375, 667, 219, 110, 327, 203, 889, 834, 237,
                        431, 647, 304, 547, 517, 260, 794, 122, 55, 750, 358, 573, 882, 130, 482, 215, 629, 717, 391, 413, 269,
                        266, 705, 669, 828, 279, 382, 399, 808, 31, 305, 127, 6, 523, 432, 168, 474, 939, 255, 367, 829, 188,
                        513, 962, 263, 775, 423, 492, 105, 490, 15, 200, 414, 803, 733, 245, 454, 220, 154, 641, 91, 515, 897,
                        561, 120, 702, 395, 858, 582, 970, 913, 928, 74, 250, 576, 527, 873, 282, 988, 409, 170, 732, 498, 501,
                        408, 690, 265, 982, 407, 195, 116, 302, 108, 20, 326, 620, 992, 496, 933, 682, 25, 336, 387, 796, 419,
                        142, 106, 32, 83, 315, 235, 86, 313, 133, 72, 915, 608, 943, 100, 816, 158, 964, 259, 623, 118, 376,
                        494, 347, 420, 99, 839, 225, 343, 766, 123, 931, 925, 772, 179, 866, 793, 125, 731, 823, 532, 919, 373,
                        994, 509, 426, 374, 28, 318, 307, 87, 483, 66, 221, 350, 648, 594, 713, 984, 725, 572, 818, 741, 187,
                        230, 910, 660, 692, 740, 325, 150, 500, 226, 712, 357, 61, 459, 443, 744, 503, 657, 457, 37, 720, 276,
                        71, 767, 875, 440, 442, 845, 364, 256, 575, 96, 961, 164, 673, 868, 129, 777, 57, 486, 926, 876, 477,
                        201, 506, 549, 981, 296, 676, 352, 301, 877, 4, 963, 735, 344, 642, 774, 602, 143, 856, 893, 536, 274,
                        836, 300, 182, 570, 954, 253, 811, 688, 416, 599, 844, 38, 209, 920, 785, 689, 216, 548, 445, 175, 159,
                        410, 595, 417, 238, 565, 441, 668, 530, 760, 29, 533, 887, 980, 738, 389, 973, 208, 502, 370, 801, 257,
                        972, 581, 728, 80, 557, 590, 236, 719, 589, 670, 78, 520, 708, 593, 197, 309, 369, 5, 999, 997, 684,
                        346, 365, 596, 351, 768, 36, 898, 806, 634, 746, 194, 800, 815, 433, 911, 797, 631, 470, 630, 924, 646,
                        383, 654, 976, 243, 172, 896, 709, 379, 851, 329, 234, 487, 56, 914, 935, 136, 455, 10, 144, 162, 848,
                        985, 518, 152, 604, 386, 11, 473, 342, 562, 35, 497, 24, 82, 974, 612, 587, 261, 19, 787, 202, 859, 340,
                        609, 189, 484, 186, 157, 390, 798, 285, 85, 321, 749, 908, 543, 3, 488, 869, 983, 560, 119, 312, 44,
                        291, 385, 695, 890, 468, 769, 115, 730, 507, 715, 780, 223, 178, 625, 821, 372, 93, 43, 734, 555, 436,
                        134, 341, 854, 996, 435, 880, 916, 827, 855, 606, 813, 958, 871, 923, 328, 658, 718, 922, 956, 1, 23,
                        645, 885, 405, 861, 955, 77, 222, 655, 112, 680, 559, 53, 41, 781, 521, 701, 704, 68, 450, 779, 703,
                        953, 289, 541, 639, 833, 478, 59, 662, 275, 835, 622, 444, 298, 199, 174, 360, 819, 937, 729, 721, 799,
                        805, 49, 241, 212, 7, 377, 636, 830, 511, 460, 663, 337, 586, 303, 293, 156, 986, 135, 758, 545, 292,
                        822, 714, 27, 909, 860, 661, 451, 842, 605, 481, 607, 177, 163, 109, 206, 519, 398, 840, 697, 81, 870,
                        789, 619, 664, 384, 941, 528, 331, 428, 791, 397, 75, 892, 73, 737, 264, 650, 571, 461, 2, 807, 747,
                        686, 588, 534, 918, 124, 448, 330, 903, 268, 491, 204, 978, 13, 446, 585, 476, 345, 485, 371, 278, 685,
                        160, 802, 335, 852, 904, 51, 867, 524, 79, 480, 624, 838, 103, 429, 475, 422, 104, 210, 356, 489, 64,
                        753, 213, 850, 205, 239, 761, 306, 363, 627, 551, 628, 113, 583, 465, 546, 147, 447, 348, 544, 574, 128,
                        191, 626, 665, 993, 770, 577, 339, 151, 193, 499, 310, 207, 788, 611, 146, 353, 404, 580, 217, 945,
                        0, 145, 782, 635, 434, 949, 960, 380, 558, 334, 22, 46, 597, 183, 952, 615, 316, 542, 832, 820, 493, 131,
                        617, 180, 824, 881, 471, 40, 355, 971, 694, 438, 17, 883, 102, 290, 141, 872, 510, 755, 171, 516, 412,
                        294, 529, 569, 322, 97, 479, 469, 121, 857, 393, 846, 69, 166, 349, 726, 711, 912, 942, 50, 456, 683,
                        453, 45, 930, 652, 814, 381, 592, 905, 567, 324, 244, 402, 240, 514, 272, 862, 722, 248, 16, 63, 458,
                        556, 297, 84, 286, 679, 229, 284, 886, 987, 425, 308, 691, 591, 396, 706, 192, 550, 242, 616, 271, 965, 319,
                        681, 841, 60, 975, 765, 392, 656, 34, 614, 969, 895, 52, 522, 863, 884, 804, 966, 677, 989, 368, 114,
                        837, 525, 771, 957, 254, 137, 707, 362, 696, 723, 927, 826, 743, 752, 452, 211, 812, 644, 295, 320,
                        640, 764, 675, 951, 67, 161, 167, 946, 495, 338, 847, 759, 378, 603, 251, 505, 950, 901]);

                    list.quicksort();

                    t.equal(list.length, 1000);
                    
                    for (let i: number = 0; i < 1000; ++i) {
                        t.equal(list.getAt(i), i);
                    }

                    t.end();
                }
            );
    
        }
    );



    t.test("Iterator",
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


            t.test("offset(0) will create an equal but independent Iterator",
                function (t: test.Test): void {
                    const list: List<number> = List.fromArray([1, 2, 3]);
                    const itA: Iterator<number> = list.begin();
                    const itB: Iterator<number> = itA.offset(0);

                    // The clone is equivalent.
                    t.assert(itA.equals(itB));
                    t.equal(itA.value, itB.value);

                    // The clone is independent.
                    itB.next();
                    t.false(itA.equals(itB));
                    t.notEqual(itA.value, itB.value);
                    
                    t.end();
                }
            );


            t.test("offset() will create an appropriate Iterator when given positive offsets",
                function (t: test.Test): void {
                    const list: List<number> = List.fromArray([1, 2, 3, 4, 5]);

                    let it: Iterator<number> = list.begin().offset(1);
                    t.equal(it.value, 2);

                    it = list.begin().offset(4);
                    t.equal(it.value, 5);

                    it = list.begin().offset(5);
                    t.true(it.equals(list.end()));

                    it = list.begin().offset(7);
                    t.true(it.equals(list.end()));

                    t.end();
                }
            );


            t.test("offset() will create an appropriate Iterator when given negative offsets",
                function (t: test.Test): void {
                    const list: List<number> = List.fromArray([1, 2, 3, 4, 5]);

                    let it: Iterator<number> = list.end().offset(0);
                    t.true(it.equals(list.end()));

                    it = list.end().offset(-1);
                    t.equal(it.value, 5);

                    it = list.end().offset(-4);
                    t.equal(it.value, 2);

                    it = list.end().offset(-5);
                    t.equal(it.value, 1);

                    it = list.end().offset(-6);
                    t.equal(it.value, 1);

                    it = list.end().offset(-7);
                    t.equal(it.value, 1);
                    
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
            
            
            t.test("can move to previous element",
                function (t: test.Test): void {
                    const list: List<number> = List.fromArray([1, 2, 3, 4, 5]);
                    let it: Iterator<number> = list.begin();
                    
                    it.prev();
                    t.true(list.begin().equals(it), "Will to move in front of the beginning node.");
                    
                    it = list.end();
                    t.equal(it.value, undefined, "Value at end() is undefined.");
                    it.prev();
                    t.equal(it.value, 5);
                    it.prev();
                    t.equal(it.value, 4);
                    it.prev();
                    t.equal(it.value, 3);
                    it.prev();
                    t.equal(it.value, 2);
                    it.prev();
                    t.equal(it.value, 1);
                    it.prev();
                    t.equal(it.value, 1);

                    t.end();
                }
            );


        }
    );

});
