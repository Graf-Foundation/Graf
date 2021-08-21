// eslint-disable-next-line no-unused-vars

// TODO JPWEIR: Remove 1 letter variable names / "magic numbers"
// TODO JPWEIR

class Graph {
    constructor(sim, style=null) {
        this.label = "New Graf";
        this.sim_wrapper = sim;
        // Maps from IDs to nodes or edges
        this.id_node_map = new Map();
        this.id_edge_map = new Map();
        // Unique Identifier for nodes and edges
        // Reset if all nodes are removed
        this.curr_node_id = 0
        this.curr_edge_id = 0
        // Default node and edge Styles
        this.style = style
    }

    addNode(label=this.curr_node_id, style=null) {
        let sim_id = `${this.curr_node_id}`;
        let node = new Node(this.curr_node_id, label, sim_id, style);

        this.sim_wrapper.addSimNode(sim_id)
        this.id_node_map.set(this.curr_node_id, node);
        this.curr_node_id += 1
    }

    removeNode(node_id) {
        let node = this.id_node_map.get(node_id);
        let sim_id = `${node_id}`;

        for (let edge of node.edges) {
            this.removeEdge(edge.getId());
        }

        this.id_node_map.delete(node_id);
        this.sim_wrapper.removeSimNode(sim_id)
    }

    addEdge(s_id, t_id, dir = false, weight = 1, style = null) {
        let s_node = this.id_node_map.get(s_id);
        let t_node = this.id_node_map.get(t_id);
        let edge = new Edge(this.curr_edge_id, s_node, t_node, dir, weight, style);

        this.id_edge_map.set(this.curr_edge_id, edge);
        this.sim_wrapper.addSimLink(this.curr_edge_id, s_id, t_id)
        this.curr_edge_id += 1
    }

    removeEdge(edge_id) {
        let edge = this.id_edge_map.get(edge_id);

        edge.disconnect();

        this.sim_wrapper.removeEdge(edge_id);
        this.id_edge_map.delete(edge_id);
    }

    //TODO JPWEIR: methods for contracting/expand** both nodes/edges to the graph

    //TODO NDESMARAIS: selection abstraction

    //TODO NDESMARAIS: style abstraction
}

class Node {
    constructor(id, label = "", style=null) {
        this.setStyle(style)
        this.node_label = label;
        this.edges = new Set();
        this.id = id;
    }

    getId() {
        return this.id;
    }

    getSimId() {
        return `${this.id}`;
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
        this.node_label = l;
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
    constructor(id, s, t, dir = false, weight = 1, style = null) {
        this.id = id;
        // direction is assumed to be from first input to second input Node
        this.setSource(s);
        this.setTarget(t);
        // dir is true when directed, false otherwise
        this.dir = dir;
        this.setWeight(weight);
        this.setStyle(style);
    }

    getId() {
        return this.id;
    }

    getSimId() {
        return `${this.id}`;
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
