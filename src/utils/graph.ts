import Node from './node'

class Graph {
    nodes: Map<string, Node> = new Map()

    addVertex(value: string): Node {
        let node = this.nodes.get(value);

        if (node) return node;

        const vertex = new Node(value);
        this.nodes.set(value, vertex);
        return vertex
    }

    removeVertex(value: string) {
        const current = this.nodes.get(value); // <1>
        if (current) {
            Array.from(this.nodes.values()).forEach((node) => node.removeAdjacent(current)); // <2>
        }
        return this.nodes.delete(value); // <3>
    }

    addEdge(source: string, destination: string): [Node, Node] {
        const sourceNode = this.addVertex(source); // <1>
        const destinationNode = this.addVertex(destination); // <1>

        sourceNode.addAdjacent(destinationNode); // <2>
        destinationNode.addAdjacent(sourceNode);

        return [sourceNode, destinationNode];
    }

    removeEdge(source: string, destination: string): [Node, Node] | null {
        const sourceNode = this.nodes.get(source);
        const destinationNode = this.nodes.get(destination);

        if (sourceNode && destinationNode) {
            sourceNode.removeAdjacent(destinationNode);
            destinationNode.removeAdjacent(sourceNode);
            return [sourceNode, destinationNode];
        }

        return null

    }


    findAllPaths(source: string, destination: string, path: Map<Node, boolean> = new Map()): Node[][] {
        const sourceNode = this.nodes.get(source);
        const destinationNode = this.nodes.get(destination);
        const newPath = new Map(path);

        if (!destinationNode || !sourceNode) return [];

        newPath.set(sourceNode, true);

        if (source === destination) {
            return [Array.from(newPath.keys())];
        }

        const paths: Node[][] = []
        sourceNode.getAdjacents().forEach((node) => {
            if (!newPath.has(node)) {
                const nextPaths = this.findAllPaths(node.value, destination, newPath);
                nextPaths.forEach((nextPath) => paths.push(nextPath));
            }
        });
        return paths;
    }
}


export default Graph