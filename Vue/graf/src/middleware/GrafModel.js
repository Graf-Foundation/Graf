class Graph {
    constructor(sim, style=null) {
        this.label = "New Graf";
        this.nodes = new Set();
        this.edges = new Set();
        this.sim_graph = sim;
        // Maps from IDs to nodes or edges
        this.id_node_map = new Map();
        this.id_edge_map = new Map();
        this.curr_node_id = 0
        this.curr_edge_id = 0
        this.style = style

    }
    addNode(label=this.curr_node_id, style=null) {
        let sim_node = { id: this.curr_node_id, x: 0, y: 0 };
        let node = new Node(label, sim_node, style);
        this.nodes.add(node)
        this.sim_graph.nodes.push(sim_node)
        this.id_node_map.set(this.curr_node_id, node);
        this.curr_node_id += 1
    }
    removeNode(node_id) {
        let node = this.id_node_map.get(node_id);
        const sim_index = this.sim_graph.nodes.indexOf(node.sim_node);
        this.sim_graph.nodes.splice(sim_index, 1);
        for (let edge of node.edges) {
            this.removeEdge(edge.sim_link[id]);
        }
        this.id_node_map.delete(node_id);
        this.nodes.delete(node);
    }
    addEdge(s_id, t_id, dir = false, weight = 1, style = null) {
        let s_node = this.id_node_map.get(s_id);
        let s_index = this.sim_graph.nodes.indexOf(s_node.sim_node);
        let t_node = this.id_node_map.get(t_id);
        let t_index = this.sim_graph.nodes.indexOf(t_node.sim_node);

        let sim_link = { id: this.curr_edge_id, s_index, t_index };
        let edge = new Edge(s_node, t_node, sim_link, dir, weight, style);
        this.edges.add(edge)
        this.sim_graph.links.push(sim_link);
        this.id_edge_map.set(this.curr_edge_id, edge);
        this.curr_edge_id += 1
    }
    removeEdge(edge_id) {
        let edge = this.id_edge_map.get(edge_id);
        const sim_index = this.sim_graph.links.indexOf(edge.sim_link);
        this.sim_graph.links.splice(sim_index, 1);
        edge.disconnect();
        this.id_edge_map.delete(edge_id);
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
