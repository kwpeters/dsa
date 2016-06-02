/// <reference path="../../typings/index.d.ts" />


import {IConvertToArray} from "./interfaces";
import {advance} from "./algorithm";


export class DLNode<ValueType> {
    public prev: DLNode<ValueType>;
    public next: DLNode<ValueType>;
    public value: ValueType;
}


/**
 * A doubly-linked list.
 *
 * This linked list is implemented as a circular linked list with one node being
 * the "end" node.
 */
export class List<ValueType> implements IConvertToArray<ValueType> {

    private _end: DLNode<ValueType>;


    public static fromArray<ValueType>(arr: ValueType[]): List<ValueType> {
        const newList: List<ValueType> = new List<ValueType>();
        arr.forEach(curVal => newList.push(curVal));
        return newList;
    }

    
    /**
     * Creates a new List object.
     */
    constructor() {
        this._end = new DLNode<ValueType>();
        this._end.prev = this._end;
        this._end.next = this._end;
        this._end.value = undefined;
    }


    /**
     * Gets the length of this List.  This operation takes O(n) time.  If you
     * only want to know if this List is empty, see isEmpty().
     * @returns {number} The number of elements in this List
     */
    public get length(): number {
        let len: number = 0;
        let curNode: DLNode<ValueType> = this._end;
        
        do {
            curNode = curNode.next;
            ++len;
        } while (curNode !== this._end);
        
        return len - 1;
    }


    /**
     * Determines (in constant time - O(1)) whether this list is empty.
     * @returns {boolean} true if this list is empty.  false otherwise.
     */
    public get isEmpty(): boolean {
        // This list is empty if the first node in the list (this._end.next)
        // points to the end.
        return this._end.next === this._end;
    }


    /**
     * Returns an Iterator that points to the first element in this List.
     * @returns {Iterator<ValueType>} An Iterator pointing to the first element
     * in this List.
     */
    public begin(): Iterator<ValueType> {
        return new Iterator(this._end.next, this._end);
    }


    /**
     * Returns an Iterator that points to an element one past the end of this
     * List.
     * @returns {Iterator<ValueType>} An Iterator pointing to an element one
     * past the end of this list.
     */
    public end(): Iterator<ValueType> {
        return new Iterator(this._end, this._end);
    }


    /**
     * Adds a new value onto the end of this List.
     * @param value - The value to be appended
     * @returns {List} - This list (to allow chaining)
     */
    public push(value: ValueType): List<ValueType> {
        const newNode: DLNode<ValueType> = new DLNode<ValueType>();
        const prevNode: DLNode<ValueType> = this._end.prev;

        // Setup the new node.
        newNode.value = value;
        newNode.next = this._end;
        newNode.prev = prevNode;
        
        // Splice the new node into the list.
        prevNode.next = newNode;
        this._end.prev = newNode;

        // Return this to allow chaining.
        return this;
    }


    /**
     * Removes the element on the end of this List and returns its value.
     * @returns {ValueType} The value associated with the removed element
     */
    public pop(): ValueType {
        const val: ValueType = this._end.prev.value;

        // Remove the node from the list.
        this.removeNode(this._end.prev);

        return val;
    }


    /**
     * Removes the specified element from this List.
     * @param it - Iterator pointing to the element to be removed.
     * @returns {Iterator<ValueType>} An iterator pointing to the element
     * following the removed element
     */
    public remove(it: Iterator<ValueType>): Iterator<ValueType> {
        const nextNode: DLNode<ValueType> = this.removeNode(it._getDLNode());
        return new Iterator(nextNode, this._end);
    }


    /**
     * Gets the value at the specified index.
     * @param index - The index of the value to retrieve
     * @returns {ValueType} The value at the specified index
     */
    public getAt(index: number): ValueType {
        if (index < 0) {
            throw new Error("Index out of range.");
        }
        
        const it: Iterator<ValueType> = this.begin();
        if (it.equals(this.end())) {
            throw new Error("Index out of range.");
        }
        
        for (let curIndex: number = 0; curIndex < index; ++curIndex) {
            it.next();
            if (it.equals(this.end())) {
                throw new Error("Index out of range.");
            }
        }

        return it.value;
    }


    /**
     * Inserts new elements into this list.
     * @param pos - The new element will be inserted in front of this element
     * @param values - The values to insert
     * @returns {Iterator<ValueType>} An Iterator pointing to the first inserted
     * element
     */
    public insert(pos: Iterator<ValueType>, ...values: ValueType[]): Iterator<ValueType> {
        const nextNode: DLNode<ValueType> = pos._getDLNode();
        let prevNode: DLNode<ValueType> = nextNode.prev;
        let itRet: Iterator<ValueType> = new Iterator<ValueType>(nextNode, this._end);
        let newNode: DLNode<ValueType>;

        for (let curIndex: number = 0; curIndex < values.length; ++curIndex) {
            newNode = new DLNode<ValueType>();
            newNode.value = values[curIndex];
            newNode.prev = prevNode;
            prevNode.next = newNode;

            // We now have a new prvious node.
            prevNode = newNode;

            // If this is the first, item inserted, remember it so we can return
            // it.
            if (curIndex === 0) {
                itRet = new Iterator(newNode, this._end);
            }
        }

        prevNode.next = nextNode;
        nextNode.prev = prevNode;

        return itRet;
    }


    /**
     * Converts this List to an array with the same values.
     * @returns {ValueType[]} The converted array
     */
    public toArray(): ValueType[] {
        const arr: ValueType[] = [];
        const itEnd: Iterator<ValueType> = this.end();
        for (let it: Iterator<ValueType> = this.begin(); !it.equals(itEnd); it.next()) {
            arr.push(it.value);
        }
        return arr;
    }


    /**
     * Helper method that removes a node from this linked list.
     * @param removeNode - The node to be removed
     * @returns {DLNode<ValueType>} The node following the removed node
     */
    private removeNode(removeNode: DLNode<ValueType>): DLNode<ValueType> {
        const prevNode: DLNode<ValueType> = removeNode.prev;
        const nextNode: DLNode<ValueType> = removeNode.next;

        // Remove the element from the list.
        prevNode.next = nextNode;
        nextNode.prev = prevNode;

        return nextNode;
    }

}


/**
 * Describes the return type from an iterator's next() method.
 * See:  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#iterator
 */
export type MoveIteratorRetType = {done?: boolean, value?: any};


/**
 * Implements the iterator protocol for List.
 */
export class Iterator<ValueType> {
    private _curNode: DLNode<ValueType>;
    private _endNode: DLNode<ValueType>;


    /**
     * Creates a new Iterator
     * @param curNode - The node the Iterator should be pointing to
     * @param endNode - The end node of the linked list
     */
    constructor(curNode: DLNode<ValueType>, endNode: DLNode<ValueType>) {
        this._curNode = curNode;
        this._endNode = endNode;
    }


    public _getDLNode(): DLNode<ValueType> {
        return this._curNode;
    }


    public equals(otherIter: Iterator<ValueType>): boolean {
        return this._curNode === otherIter._curNode;
    }


    public prev(): void {
        const isAtBegin: boolean = this._isAtBegin();

        if (!isAtBegin) {
            this._curNode = this._curNode.prev;
        }
    }


    public next(): MoveIteratorRetType {
        const isDone: boolean = this._isAtEnd();
        const retVal: MoveIteratorRetType = {
            done: isDone
        };

        if (!isDone) {
            retVal.value = this._curNode.value;
            this._curNode = this._curNode.next;
        }

        return retVal;
    }


    public get value(): ValueType {
        if (this._isAtEnd()) {
            return undefined;
        } else {
            return this._curNode.value;
        }
    }

    public set value(val: ValueType) {
        if (this._isAtEnd()) {
            throw new Error("Cannot set value of end element.");
        } else {
            this._curNode.value = val;
        }
    }

    
    public offset(offset: number): Iterator<ValueType> {
        const it: Iterator<ValueType> = new Iterator<ValueType>(this._curNode, this._endNode);
        advance(it, offset);
        return it;

    }


    private _isAtBegin(): boolean {
        return this._endNode.next === this._curNode;
    }


    private _isAtEnd(): boolean {
        return this._curNode === this._endNode;
    }
}

