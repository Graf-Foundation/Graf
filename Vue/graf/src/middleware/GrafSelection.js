class Selection {
	constructor() {
		this.node_ids = [];
		this.edge_ids = [];
	}

	getSelectedIds() {
		return {
			"nodes" : this.node_ids,
			"edges" : this.edge_ids
		};
	}

	getSelectedNodeIds() {
		return this.node_ids;
	}

	getSelectedEdgeIds() {
		return this.edge_ids;
	}

	setNodes(node_id_list) {
		this.node_ids = node_id_list;
	}

	setEdges(edge_id_list) {
		this.edge_ids = edge_id_list;
	}

	removeNode(node_id) {
		let index = this.node_ids.findIndex(node_id);
		this.node_ids.splice(index, 1);
	}

	removeEdge(edge_id) {
		let index = this.node_ids.findIndex(edge_id);
		this.edge_ids.splice(index, 1);
	}

	clearSelection() {
		//This clears the arrays without breaking references
		this.node_ids.splice(0,this.node_ids.length);
		this.edge_ids.splice(0,this.edge_ids.length);
	}
}

class OneNodeSelection extends Selection {
	addNode(node_id) {
		this.clearSelection();
		this.node_ids.push(node_id);
	}

	addEdge(edge_id) {
		console.error(`Cannot add edge: ${edge_id} to one node selection`);
	}

	getSelectionType() {
		return "Node";
	}

	getSelectionAmount() {
		return 1;
	}
}

class TwoNodeSelection extends Selection {
	addNode(node_id) {
		if(this.node_ids.length === 2) {
			this.node_ids.splice(0,1);
		}
		this.node_ids.push(node_id);
	}

	addEdge(edge_id) {
		console.error(`Cannot add edge: ${edge_id} to two node selection`);
	}

	getSelectionType() {
		return "Node";
	}

	getSelectionAmount() {
		return 2;
	}
}

class ManyNodeSelection extends Selection {
	addNode(node_id) {
		this.node_ids.push(node_id);
	}

	addEdge(edge_id) {
		console.error(`Cannot add edge: ${edge_id} to many node selection`);
	}

	getSelectionType() {
		return "Node";
	}

	getSelectionAmount() {
		return 3; // Assume 3 means many
	}
}

class SingleHybridSelection extends Selection {
	addNode(node_id) {
		if(this.node_ids.length === 1 || this.node_ids.length === 1) {
			this.clearSelection();
		}

		this.node_ids.push(node_id);
	}

	addEdge(edge_id) {
		if(this.edge_ids.length === 1 || this.edge_ids.length === 1) {
			this.clearSelection();
		}

		this.edge_ids.push(edge_id);
	}

	getSelectionType() {
		return "Hybrid";
	}

	getSelectionAmount() {
		return 1;
	}
}

class ManyHybridSelection extends Selection {
	addNode(node_id) {
		this.node_ids.push(node_id);
	}

	addEdge(edge_id) {
		this.edge_ids.push(edge_id);
	}

	getSelectionType() {
		return "Hybrid";
	}

	getSelectionAmount() {
		return 3; // Assume 3 means many
	}
}

class OneEdgeSelection extends Selection {
	addNode(node_id) {
		console.error(`Cannot add node: ${node_id} to one edge selection`);
	}

	addEdge(edge_id) {
		this.clearSelection();
		this.edge_ids.push(edge_id);
	}

	getSelectionType() {
		return "Edge";
	}

	getSelectionAmount() {
		return 1;
	}
}

class ManyEdgeSelection extends Selection {
	addNode(node_id) {
		console.error(`Cannot add node: ${node_id} to many edge selection`);

	}

	addEdge(edge_id) {
		this.edge_ids.push(edge_id);
	}

	getSelectionType() {
		return "Edge";
	}

	getSelectionAmount() {
		return 3; // Assume 3 means many
	}
}


export {
	OneNodeSelection,
	TwoNodeSelection,
	ManyNodeSelection,
	SingleHybridSelection,
	ManyHybridSelection,
	OneEdgeSelection,
	ManyEdgeSelection
};
