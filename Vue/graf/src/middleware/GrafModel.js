class Graph {
    constructor() {
        this.label = "New Graf";
        this.nodes = [];
        this.edges = [];
    }
    //TODO JPWEIR: methods for adding/removing both nodes/edges to the graph

    //TODO JPWEIR: methods for contracting/expand** both nodes/edges to the graph

    //TODO NDESMARAIS: selection abstraction

    //TODO NDESMARAIS: style abstraction
}

class Node {
    constructor(label, simulation, style=null) {
        this.style = style;
        this.nodeLabel = label;
        this.edges = new Set();
        this.sim   = simulation;
    }
    getLabel() {
        return this.label;
    }
    getEdges() {
        return this.edges;
    }
    getAdjacent() {
        let adj_set = new Set();
        for (let edge of this.edges) {
            adj_set.add( (edge.source == this) ?  edge.target : edge.source );
        }
        return adj_set;
    }
    setLabel(l) {
        this.nodeLabel = l;
    }
    setStyle(s) {
        this.style = s;
    }
    delete() {
        // disconnect all edges
        for (let edge of this.edges) {
            edge.delete();
        }
    }
}

class Edge {
    constructor(v1, v2, dir=false, style=null) {
        this.style = style;
        // dir is true when directed, false otherwise
        this.dir = dir;
        // direction is assumed to be from first input to second input Node
        this.setSource(v1);
        this.setTarget(v2);
        this.setWeight(1);
    }
    getSource() {
        return this.source;
    }
    getTarget() {
        return this.target;
    }
    getWeight() {
        return this.weight;
    }
    setSource(v) {
        this.source.edges.delete(this);
        this.source = v;
        this.source.edges.add(this);
    }
    setTarget(v) {
        this.target.edges.delete(this);
        this.target = v;
        this.target.edges.add(this);
    }
    setWeight(value) {
        this.weight = value;
    }
    incident(v) {
        return this.source === v || this.target === v;
    }
    toggleDir() {
        this.dir = !this.dir;
    }
    reverseDir() {
        let tmp = this.source;
        this.source = this.target;
        this.target = tmp;
    }
    setStyle(s) {
        this.style = s;
    }
    toString() {
        return "(" + String(this.source.label) + "," + String(this.target.label) + ")";
    }
    delete() {
        // disconnects edge from its vertices
        this.source.edges.delete(this);
        this.target.edges.delete(this);
    }
}

export {
    Graph,
    Node,
    Edge
}
