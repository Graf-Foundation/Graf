class Graph {
    constructor() {
        this.label = "New Graf";
        this.vertices = new Set();
        this.edges = new Set();
    }
}

class Vertex {
    constructor(label, style) {
        this.style = (typeof style !== 'undefined') ?  style : DEFAULT_STYLE;
        this.label = label;
        this.edges = new Set();
    }
    get label() {
        return this.label;
    }
    get edges() {
        return this.edges;
    }
    get adjacent() {
        var adj_set = new Set()
        for (edge in edges) {
            adj_set.add( (edge.source == this) ?  edge.target : edge.source );
        }
        return adj_set
    }
    set_label(l) {
        this.label = l;
    }
    set_style() {
        //stub
    }
    delete() {
        // disconnect all edges
        for (edge in edges) {
            edge.delete()
        }
    }
    
}

class Edge {
    constructor(v1, v2, dir, style) {
        this.style = (typeof style !== 'undefined') ?  style : DEFAULT_STYLE;
        dir = (typeof dir !== 'undefined') ?  dir : false;
        // dir is true when directed, false otherwise
        this.dir = dir;
        // direction is assumed to be from first input to second input vertex
        this.set_source(v1)
        this.set_target(v2)
        this.set_weight(1)
    }
    get source() {
        return this.source;
    }
    get target() {
        return this.target;
    }
    get weight() {
        return this.weight;
    }
    set_source(v) {
        this.source.edges.delete(this)
        this.source = v
        this.source.edges.add(this)
    }
    set_target(v) {
        this.target.edges.delete(this)
        this.target = v
        this.target.edges.add(this)
    }
    set_weight(value) {
        this.weight = value;
    }
    incident(v) {
        return this.source === v || this.target === v;
    }
    toggle_dir() {
        this.dir = !this.dir;
    }
    reverse_dir() {
        tmp = this.source;
        this.source = this.target;
        this.target = tmp;
    }
    set_style() {
        //stub
    }
    to_string() {
        return "(" + String(this.source.label) + "," + String(this.target.label) + ")";
    }
    delete() {
        // disconnects edge from its vertices
        this.source.edges.delete(this)
        this.target.edges.delete(this)
    }
}
module.exports = Graph, Vertex, Edge;