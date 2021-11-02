// eslint-disable-next-line no-unused-vars
import * as SelectionModel from "@/middleware/GrafSelection";

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

		this.selection = null;
	}

	addNode(label=this.curr_node_id, style=null) {
		let sim_id = `${this.curr_node_id}`;
		let node = new Node(this.curr_node_id, label, sim_id, style);

		this.sim_wrapper.addSimNode(sim_id);
		this.id_node_map.set(this.curr_node_id, node);
		this.curr_node_id += 1;
	}

	removeNode(node_id) {
		let node = this.id_node_map.get(node_id);
		let sim_id = `${node_id}`;

		for (let edge of node.edges) {
			this.removeEdge(edge.getId());
		}

		this.id_node_map.delete(node_id);
		this.sim_wrapper.removeSimNode(sim_id);

		if (this.id_node_map.size === 0) {
			this.curr_node_id = 0;
			this.curr_edge_id = 0;
		}
	}

	addEdge() {
		if (this.selection != null
			&& this.selection.getSelectionAmount() == 2
			&& this.selection.getSelectionType() == "Node") {
			let s_id = this.selection.getSelectedNodeIds()[0];
			let t_id = this.selection.getSelectedNodeIds()[1];
			this.addEdgeHelper(s_id, t_id);
		}
		else {
			console.log("WARNING: attempted to add an edge given an invalid selection, attempt ignored");
		}
		this.selection = null;
	}

	addEdgeHelper(s_id, t_id, dir = false, weight = 1, style = null) {
		let s_node = this.id_node_map.get(parseInt(s_id));
		let t_node = this.id_node_map.get(parseInt(t_id));
		if (s_node == null || t_node == null) {
			console.log("ERROR: source or target node not found when trying to add an edge");
			console.log("id_node_map contents: ");
			console.log(this.id_node_map);
			console.log("IDs: ");
			console.log(s_id);
			console.log(t_id);
		}
		let edge = new Edge(this.curr_edge_id, s_node, t_node, dir, weight, style);

		this.id_edge_map.set(this.curr_edge_id, edge);
		this.sim_wrapper.addSimLink(this.curr_edge_id, parseInt(s_id), parseInt(t_id));
		this.curr_edge_id += 1;
	}

	removeEdge(edge_id) {
		let edge = this.id_edge_map.get(edge_id);

		edge.disconnect();

		this.sim_wrapper.removeEdge(edge_id);
		this.id_edge_map.delete(edge_id);
	}

	createSelection(type, amount) {
		let new_selection = null;
		let is_node = type == "Node";
		let is_edge = type == "Edge";
		let is_many = amount > 2;
		let is_two = amount == 2;
		let is_one = amount == 1;
		if (is_node && is_many) {
			new_selection = new SelectionModel.ManyNodeSelection();
			console.log("Created ManyNodeSelection");
		}
		else if (is_node && is_two) {
			new_selection = new SelectionModel.TwoNodeSelection();
			console.log("Created TwoNodeSelection");
		}
		else if (is_node && is_one) {
			new_selection = new SelectionModel.OneNodeSelection();
			console.log("Created OneNodeSelection");
		}
		else if (is_edge && (is_many || is_two)) {
			new_selection = new SelectionModel.ManyEdgeSelection();
			console.log("Created ManyEdgeSelection");
		}
		else if (is_edge && is_one) {
			new_selection = new SelectionModel.OneEdgeSelection();
			console.log("Created OneEdgeSelection");
		}
		else if (is_many || is_two) {
			new_selection = new SelectionModel.ManyHybridSelection();
			console.log("Created ManyHybridSelection");
		}
		else if (is_one) {
			new_selection = new SelectionModel.SingleHybridSelection();
			console.log("Created SingleHybridSelection");
		}
		return new_selection;
	}

	updateSelection(type, id, was_selected) {
		// was_selected is whether the node or edge is selected *before* it was clicked
		let new_type = type;
		let new_amount = 1;
		// Default values, i.e. adding one element to an empty selection

		let selection_type = null;
		let amount = 0;
		let length = 0;
		let is_empty = this.selection == null;
		let is_node = type == "Node";

		if (!is_empty) {
			selection_type = this.selection.getSelectionType();
			amount = this.selection.getSelectionAmount();
			length = this.selection.getSelectionLength();
		}
		let types_match = type == selection_type;

		if (!is_empty && !was_selected) {
			new_amount = Math.min(length + 1, 3);
			// If adding to the selection, cap the new amount at 3 (many)
		}
		else if (!is_empty) {
			new_amount = Math.min(3, length - 1);
		}
		
		if (!is_empty && !types_match && !was_selected) {
			new_type = "Hybrid";
		}

		// When unselecting changes the selection type
		else if (!is_empty && !types_match && was_selected && is_node && this.selection.getNodeCount() == 1) {
			// Case of removing last node
			new_type = "Edge";
		}
		else if (!is_empty && !types_match && was_selected && !is_node && this.selection.getEdgeCount() == 1) {
			// Case of removing last edge
			new_type = "Node";
		}
		else if (!is_empty && !types_match && was_selected && selection_type != "Hybrid") {
			// Shouldn't happen, hypothetically
			console.log("ERROR: Tried to remove an invalid type from selection.");
		}

		if (!is_empty && new_amount == 2 && (new_type == "Hybrid" || new_type == "Edge")) {
			new_amount = 3;
			// Ensure the new amount is correct for Hybrid/Edge selections
		}
		if (!is_empty && new_type == selection_type && new_amount == amount) {
			// Selection type remains the same
			new_type = null;
			new_amount = null;
			// Set new changes to null so we skip the next two if statements
		}
		
		// If the selection type changes
		let needs_update = new_type != null && new_amount != null;

		if (new_amount == 0) {
			// Nullify selection if new_amount is zero
			this.selection = null;
			is_empty = true;
			needs_update = false;
		}

		let new_selection = null;
		if (needs_update) {
			// Choose new selection type if changed
			new_selection = this.createSelection(new_type, new_amount);
		}
		if (!is_empty && needs_update) {
			new_selection.setNodes(this.selection.getSelectedNodeIds());
			new_selection.setEdges(this.selection.getSelectedEdgeIds());
		}
		if (needs_update) {
			this.selection = new_selection;
			is_empty = false;
		}

		// Update selection by adding or removing elements to appropriate arrays
		if (!is_empty && type == "Node" && !was_selected) {
			this.selection.addNode(id);
		}
		else if (!is_empty && type == "Edge" && !was_selected) {
			this.selection.addEdge(id);
		}
		else if (!is_empty && type == "Node" && was_selected) {
			this.selection.removeNode(id);
		}
		else if (!is_empty && type == "Edge" && was_selected) {
			this.selection.removeEdge(id);
		}
	}

	selectNode(node_id) {
		// was_selected is whether the node or edge is selected *before* it was clicked
		let was_selected = this.selection != null && this.selection.getSelectedNodeIds().includes(node_id);
		this.updateSelection("Node", node_id, was_selected);

		// is_selected = !was_selected
		return !was_selected;
	}

	selectEdge(edge_id) {
		// was_selected is whether the node or edge is selected *before* it was clicked
		let was_selected = this.selection != null && this.selection.getSelectedEdgeIds().includes(edge_id);
		this.updateSelection("Edge", edge_id, was_selected);

		// is_selected = !was_selected
		return !was_selected;
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
		let adj_set = new Set();
		for (let edge of this.edges) {
			adj_set.add( (edge.source === this) ?  edge.target : edge.source );
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
		this.source = source;
		this.setSource(source);
		this.target = target;
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
		this.source.edges.delete(this);
		this.source = node;
		this.source.edges.add(this);
	}
	setTarget(node) {
		this.target.edges.delete(this);
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
