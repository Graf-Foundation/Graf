class Graph {
    constructor(sim) {
        this.label = "New Graf";
        this.nodes = new Set();
        this.edges = new Set();
        this.sim_graph = sim;
        this.sim_node_map = new Map();
        this.sim_edge_map = new Map();
    }
    addNode(label, style=null) {
        let sim_node = { id: label, x: 0, y: 0 };
        let node = new Node(label, sim_node, style);
        this.nodes.add(node)
        this.sim_graph.nodes.push(sim_node)
        this.sim_node_map.set(sim_node, node);
    }
    removeNode(sim_node) {
        let node = this.sim_node_map.get(sim_node);
        const sim_index = this.sim_graph.nodes.indexOf(sim_node);
        this.sim_graph.nodes.splice(sim_index, 1);
        for (let edge of node.edges) {
            let sim_link = edge.sim_link;
            this.removeEdge(sim_link);
        }
        this.sim_node_map.delete(sim_node);
        this.nodes.delete(node);
    }
    addEdge(sim_s, sim_t, dir = false, weight = 1, style = null) {
        let s_index = this.sim_graph.nodes.indexOf(sim_s);
        let s_node = this.sim_node_map.get(sim_s);
        let t_index = this.sim_graph.nodes.indexOf(sim_t);
        let t_node = this.sim_node_map.get(sim_t);
        let link_id = this.sim_graph.links.size;

        let sim_link = { id: link_id, s_index, t_index };
        let edge = new Edge(s_node, t_node, sim_link, dir, weight, style);
        this.edges.add(edge)
        this.sim_graph.links.push(sim_link);
        this.sim_edge_map.set(sim_link, edge);
    }
    removeEdge(sim_link) {
        let edge = this.sim_edge_map.get(sim_link);
        const sim_index = this.sim_graph.links.indexOf(sim_link);
        this.sim_graph.links.splice(sim_index, 1);
        edge.disconnect();
        this.sim_edge_map.delete(sim_link);
        this.edges.delete(edge);
    }

    //TODO JPWEIR: methods for contracting/expand** both nodes/edges to the graph

    //TODO NDESMARAIS: selection abstraction

    //TODO NDESMARAIS: style abstraction
}

class Node {
    constructor(label, sim, style=null) {
        this.setStyle(style)
        this.nodeLabel = label;
        this.edges = new Set();
        this.sim_node = sim;
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
    getStyle() {
        return this.style;
    }
    setStyle(s) {
        this.style = s;
    }
    /* DEPRECATED
    delete() {
        // disconnect all edges
        for (let edge of this.edges) {
            edge.disconnect();
        }
    }*/
}

class Edge {
    constructor(s, t, sim, dir = false, weight = 1, style = null) {
        // direction is assumed to be from first input to second input Node
        this.setSource(s);
        this.setTarget(t);
        this.sim_link = sim;
        // dir is true when directed, false otherwise
        this.dir = dir;
        this.setWeight(weight);
        this.setStyle(style);
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
    getStyle() {
        return this.style;
    }
    setStyle(s) {
        this.style = s;
    }
    toString() {
        return "(" + String(this.source.label) + "," + String(this.target.label) + ")";
    }
    disconnect() {
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
