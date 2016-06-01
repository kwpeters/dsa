/// <reference path="../../typings/index.d.ts" />


export class DLNode<ValueType> {
    public prev: DLNode<ValueType>;
    public next: DLNode<ValueType>;
    public value: ValueType;
}


export class List<ValueType> {

    private _end: DLNode<ValueType>;

    constructor() {
        this._end = new DLNode<ValueType>();
        this._end.prev = this._end;
        this._end.next = this._end;
        this._end.value = undefined;
    }


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
     * Determines (in constant time) whether this list is empty.
     * @returns {boolean} true if this list is empty.  false otherwise.
     */
    public get isEmpty(): boolean {
        // This list is empty if the first node in the list (this._end.next)
        // points to the end.
        return this._end.next === this._end;
    }


    public begin(): Iterator<ValueType> {
        return new Iterator(this._end.next, this._end);
    }


    public end(): Iterator<ValueType> {
        return new Iterator(this._end, this._end);
    }


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


    public pop(): ValueType {
        const val: ValueType = this._end.prev.value;

        // Remove the node from the list.
        this.removeNode(this._end.prev);

        return val;
    }


    public remove(it: Iterator<ValueType>): Iterator<ValueType> {
        const nextNode: DLNode<ValueType> = this.removeNode(it._getDLNode());
        return new Iterator(nextNode, this._end);
    }


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
     * Inserts a new element into this list.
     * @param pos - The new element will be inserted in front of this element
     * @param value - The value of the new element
     * @returns {Iterator<ValueType>} An Iterator pointing to the newly inserted
     * element
     */
    public insert(pos: Iterator<ValueType>, value: ValueType): Iterator<ValueType> {
        const newNode: DLNode<ValueType> = new DLNode<ValueType>();

        const nextNode: DLNode<ValueType> = pos._getDLNode();
        const prevNode: DLNode<ValueType> = nextNode.prev;

        // Setup the new node.
        newNode.value = value;
        newNode.prev = prevNode;
        newNode.next = nextNode;

        // Splice the new node into the list.
        prevNode.next = newNode;
        nextNode.prev = newNode;
        
        return new Iterator<ValueType>(newNode, this._end);
    }


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


    public next(): MoveIteratorRetType {
        const retVal: MoveIteratorRetType = {};

        const isDone: boolean = this._isAtEnd();
        retVal.done = isDone;

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


    private _isAtEnd(): boolean {
        return this._curNode === this._endNode;
    }
}

