class Node {
    value: string;
    adjacents: Node[]

    constructor(value: string) {
        this.value = value;
        this.adjacents = []; // adjacency list
    }

    addAdjacent(node: Node) {
        this.adjacents.push(node);
    }

    removeAdjacent(node: Node) {
        const index = this.adjacents.indexOf(node);
        if (index > -1) {
            this.adjacents.splice(index, 1);
            return node;
        }
    }

    getAdjacents() {
        return this.adjacents;
    }

    isAdjacent(node: Node) {
        return this.adjacents.indexOf(node) > -1;
    }
}

export default Node