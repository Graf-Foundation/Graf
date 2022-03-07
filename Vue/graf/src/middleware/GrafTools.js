import {ManyHybridSelection, SingleHybridSelection, TwoNodeSelection} from "@/middleware/GrafSelection";

function setTool(toolCode, editor, model) {
	switch (toolCode) {
	case "":
		editor.tool = null;
		model.selection = new ManyHybridSelection();
		break;
	case "add-node":
		editor.tool = new AddNodeTool();
		model.selection = new ManyHybridSelection();
		break;
	case "add-edge":
		editor.tool = new AddEdgeTool();
		model.selection = new TwoNodeSelection();
		break;
	case "delete":
		editor.tool = new DeleteTool();
		model.selection = new ManyHybridSelection();
		break;
	case "expand":
		editor.tool = new ExpandTool();
		model.selection = new SingleHybridSelection();
		break;
	case "contract":
		editor.tool = new ContractTool();
		model.selection = new SingleHybridSelection();
		break;
	}
}

class AddNodeTool {
	handleKey(event, model) {
		if(event.key === "a") {
			model.addNode();
		}
	}

	toolTips() {
		return {
			A: "Add a new node"
		};
	}

	toolName() {
		return "Add Node Tool";
	}
}

class AddEdgeTool{
	handleKey(event, model) {
		if(event.key === "a") {
			if(model.selection.getNodeCount() !== 2) throw "Select 2 nodes";
			model.addEdge();
		}
	}

	toolTips() {
		return {
			Click: "Select 2 nodes to be joined",
			A: "Add edge between selected nodes"
		};
	}

	toolName() {
		return "Add Edge Tool";
	}
}

class DeleteTool {
	handleKey(event, model) {
		if(event.key === "a") {
			let edge_ids = model.selection.getSelectedEdgeIds();
			let node_ids = model.selection.getSelectedNodeIds();
			for (let e_id of edge_ids) {
				model.removeEdge(parseInt(e_id));
			}
			for (let n_id of node_ids) {
				model.removeNode(parseInt(n_id));
			}
			model.selection.clearSelection();
		}
	}

	toolTips() {
		return {
			Click: "Select nodes and edges to delete",
			A: "Delete selection"
		};
	}

	toolName() {
		return "Delete Tool";
	}
}

class ExpandTool {
	handleKey(event, model) {
		if(event.key === "a") {
			model.expand();
		}
	}

	toolTips() {
		return {
			Click: "Select a node or edge to expand",
			A: "expand selected node or edge"
		};
	}

	toolName() {
		return "Expand Tool";
	}
}

class ContractTool {
	handleKey(event, model) {
		if(event.key === "a") {
			model.contract();
		}
	}

	toolTips() {
		return {
			Click: "Select a node or edge to contract",
			A: "contract selected node or edge"
		};
	}

	toolName() {
		return "Contract Tool";
	}
}

export {
	setTool
};