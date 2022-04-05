// eslint-disable-next-line no-unused-vars
import {ManyHybridSelection} from "@/middleware/GrafSelection";

class Graph {
	constructor(sim, style=null) {
		this.label = "New Graf";
		this.sim_wrapper = sim;
		// Maps from IDs to nodes or edges
		this.id_node_map = new Map();
		this.id_edge_map = new Map();
		// Unique Identifier for nodes and edges
		// Reset if all nodes are removed
		this.curr_node_id = 0;
		this.curr_edge_id = 0;
		// Default node and edge Styles
		this.style = style;
		// Empty selection
		this.selection = new ManyHybridSelection();
	}

	// Adds a node both to the graph model and the simulation
	addNode(label=this.curr_node_id, style=null) {
		let sim_id = this.curr_node_id;
		let node = new Node(sim_id, label, sim_id, style);

		this.sim_wrapper.addSimNode(sim_id);
		this.id_node_map.set(sim_id, node);
		this.curr_node_id += 1;
	}

	// Removes node corresponding to node_id from the graph model and the simulation
	removeNode(node_id) {
		let node = this.id_node_map.get(node_id);
		let sim_id = parseInt(`${node_id}`);

		for (let edge of node.getEdges()) {
			this.removeEdge(edge.getId());
		}

		this.id_node_map.delete(node_id);
		this.sim_wrapper.removeSimNode(sim_id);

		if (this.id_node_map.size === 0) {
			this.curr_node_id = 0;
			this.curr_edge_id = 0;
		}
	}

	// Wrapper to check if an edge can be added to the given selection, calls helper if it can
	addEdge() {
		if(this.selection == null || this.selection.getNodeCount() !== 2) throw "Select 2 nodes";

		let ids = this.selection.getSelectedNodeIds();
		let s_id = ids[0];
		let t_id = ids[1];
		this.addEdgeHelper(s_id, t_id);
		this.selection.clearSelection();
	}

	// Adds an edge from node s to node t, both in the graph model and the simulation
	addEdgeHelper(s_id, t_id, dir = false, weight = 1, style = null) {
		let s_node = this.id_node_map.get(parseInt(s_id));
		let t_node = this.id_node_map.get(parseInt(t_id));
		if (s_node == null || t_node == null) throw `Cannot create edge between ${s_node} and ${t_node}`;

		let edge = new Edge(this.curr_edge_id, s_node, t_node, dir, weight, style);

		this.id_edge_map.set(this.curr_edge_id, edge);
		this.sim_wrapper.addSimLink(this.curr_edge_id, parseInt(s_id), parseInt(t_id));
		this.curr_edge_id += 1;
	}

	// Removes edge corresponding to edge_id from graph model and simulationsim_wrapper
	removeEdge(edge_id) {
		let edge = this.id_edge_map.get(edge_id);

		edge.disconnect();

		this.sim_wrapper.removeSimLink(edge_id);
		this.id_edge_map.delete(edge_id);

		if (this.id_edge_map.size === 0) {
			this.curr_edge_id = 0;
		}
	}

	// Given a newly selected/unselected element, updates the selection correspondingly
	updateSelection(type, id, was_selected) {
		if(type === "Node" && was_selected) {
			this.selection.removeNode(id);
		}
		else if(type === "Node" && !was_selected) {
			this.selection.addNode(id);
		}
		else if(type === "Edge" && was_selected) {
			this.selection.removeEdge(id);
		}
		else if(type === "Edge" && !was_selected) {
			this.selection.addEdge(id);
		}
	}

	// Handles a select event for nodes
	selectNode(node_id) {
		// was_selected is whether the node or edge is selected *before* it was clicked
		let was_selected = this.selection != null && this.selection.getSelectedNodeIds().includes(node_id);
		this.updateSelection("Node", node_id, was_selected);

		// is_selected = !was_selected
		return !was_selected;
	}

	// Handles a select event for edges
	selectEdge(edge_id) {
		// was_selected is whether the node or edge is selected *before* it was clicked
		let was_selected = this.selection != null && this.selection.getSelectedEdgeIds().includes(edge_id);
		this.updateSelection("Edge", edge_id, was_selected);

		// is_selected = !was_selected
		return !was_selected;
	}

	// Wrapper to check if the selection is valid for expansion, calls corresponding helper if it is
	expand() {
		if(this.selection.getNodeCount() === 1) {
			let id = this.selection.getSelectedNodeIds()[0];
			this.expandNode(id);
			this.selection.clearSelection();
		}
		else if(this.selection.getEdgeCount() === 1) {
			let id = this.selection.getSelectedEdgeIds()[0];
			this.expandEdge(id);
			this.selection.clearSelection();
		}
		else {
			throw "WARNING: attempted to expand given an invalid selection, attempt ignored";
		}
	}

	// Expands an edge into two edges and a node
	expandEdge(id) {
		let edge = this.id_edge_map.get(id);
		let source_node = edge.getSource();
		let target_node = edge.getTarget();
		let new_node_id = this.curr_node_id;
		this.removeEdge(id);
		this.addNode();
		this.addEdgeHelper(source_node.getId(), new_node_id);
		this.addEdgeHelper(new_node_id, target_node.getId());
	}

	// Expands a node into two nodes connected by an edge
	// These two new nodes are adjacent to all nodes the original node was adjacent to
	expandNode(id) {
		let node = this.id_node_map.get(id);

		// nodes that will be the targets of new edges
		let outgoing_set = node.getAdjacentOutgoing();
		// nodes that will be the sources of new edges
		let incoming_set = node.getAdjacentIncoming(); 

		let new_node_id = this.curr_node_id;
		this.addNode();

		for (let adj_node of outgoing_set) {
			this.addEdgeHelper(new_node_id, adj_node.id);
		}

		for (let adj_node of incoming_set) {
			this.addEdgeHelper(adj_node.id, new_node_id);
		}

		this.addEdgeHelper(new_node_id, id);
	}

	// Wrapper to check if selection is valid for contraction, calls corresponding helper function
	contract() {
		if (this.selection.getNodeCount() === 1) {
			let id = this.selection.getSelectedNodeIds()[0];
			this.contractNode(id);
			this.selection.clearSelection();
		}
		else if (this.selection.getEdgeCount() === 1) {
			let id = this.selection.getSelectedEdgeIds()[0];
			this.contractEdge(id);
			this.selection.clearSelection();
		}
		else {
			throw "WARNING: attempted to contract given an invalid selection, attempt ignored";
		}
	}

	// Contracts an edge, merging its two neighboring nodes
	contractEdge(id) {
		let edge = this.id_edge_map.get(id);
		let s_node = edge.getSource();
		let t_node = edge.getTarget();

		let new_node_id = this.curr_node_id;
		this.addNode();

		// This set contains all nodes v connected to s or t such that s or t is the source node connected to v
		let target_adj = new Set();
		t_node.getAdjacentOutgoing().forEach(target_adj.add, target_adj);
		s_node.getAdjacentOutgoing().forEach(target_adj.add, target_adj);

		// This set contains all nodes v connected to s or t such that s or t is the target node connected to v
		let source_adj = new Set();
		t_node.getAdjacentIncoming().forEach(source_adj.add, source_adj);
		s_node.getAdjacentIncoming().forEach(source_adj.add, source_adj);

		for (let target_node of target_adj) {
			this.addEdgeHelper(new_node_id, target_node.id);
		}

		for (let source_node of source_adj) {
			this.addEdgeHelper(source_node.id, new_node_id);
		}

		this.removeNode(s_node.getId());
		this.removeNode(t_node.getId());
	}

	// Contracts a node, connecting its adjacent nodes to each other directly
	contractNode(id) {
		let node = this.id_node_map.get(id);
		let adj_set = node.getAdjacent();

		let new_node_id = this.curr_node_id;
		this.addNode();

		this.removeNode(id);

		// nodes that will be the targets of new edges
		let outgoing_set = new Set();
		// nodes that will be the sources of new edges
		let incoming_set = new Set(); 

		for (let adj_node of adj_set) {
			// add adjacent nodes to the aforementioned sets
			adj_node.getAdjacentOutgoing().forEach(outgoing_set.add, outgoing_set);
			adj_node.getAdjacentIncoming().forEach(incoming_set.add, incoming_set);
		}

		for (let outer_adj_node of outgoing_set) {
			this.addEdgeHelper(new_node_id, outer_adj_node.id);
		}

		for (let outer_adj_node of incoming_set) {
			this.addEdgeHelper(outer_adj_node.id, new_node_id);
		}

		for (let adj_node of adj_set) {
			this.removeNode(adj_node.id);
		}
	}
	


	//TODO JPWEIR: methods for contracting/expand** both nodes/edges to the graph

	//TODO NDESMARAIS: selection abstraction

	//TODO NDESMARAIS: style abstraction
}

class Node {
	constructor(id, label = "", style=null) {
		this.style = style;
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
		return this.node_label;
	}

	getEdges() {
		return this.edges;
	}

	getAdjacent() {
		// Returns a list of adjacent nodes
		let adj_set = new Set();
		for (let edge of this.edges) {
			adj_set.add( (edge.getSource() === this) ?  edge.getTarget() : edge.getSource() );
		}
		return adj_set;
	}

	getAdjacentOutgoing() {
		// For digraphs, returns all adjacent nodes that are the target of an edge from this node
		let adj_set = new Set();
		for (let edge of this.edges) {
			if (edge.getSource() === this) {
				adj_set.add(edge.getTarget());
			}
		}
		return adj_set;
	}

	getAdjacentIncoming() {
		// For digraphs, returns all adjacent nodes that are the source of an edge to this node
		let adj_set = new Set();
		for (let edge of this.edges) {
			if (edge.getTarget() === this) {
				adj_set.add(edge.getSource());
			}
		}
		return adj_set;
	}

	setLabel(label) {
		this.node_label = label;
	}

	getStyle() {
		return this.style;
	}

	setStyle(style) {
		this.style = style;
	}
}

class Edge {
	constructor(id, source, target, dir = false, weight = 1, style = null) {
		this.id = id;
		// direction is assumed to be from first input to second input Node
		this.setSource(source);
		this.setTarget(target);
		// dir is true when directed, false otherwise
		this.dir = dir;
		this.weight = weight;
		this.style = style;
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
	setSource(node) {
		if (this.source) {
			this.source.edges.delete(this);
		}
		this.source = node;
		this.source.edges.add(this);
	}
	setTarget(node) {
		if (this.target) {
			this.target.edges.delete(this);
		}
		this.target = node;
		this.target.edges.add(this);
	}
	setWeight(value) {
		this.weight = value;
	}
	incident(node) {
		return this.source === node || this.target === node;
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
	setStyle(style) {
		this.style = style;
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
};
