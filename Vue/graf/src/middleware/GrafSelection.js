class Selection {
    constructor() {
        this.node_ids = []
        this.edge_ids = []
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

    clearSelection() {
        //This clears the arrays without breaking references
        this.node_ids.splice(0,this.node_ids.length)
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
}

class TwoNodeSelection extends Selection() {
    addNode(node_id) {
        if(this.node_ids.length === 2) {
            this.node_ids.splice(0,1);
        }
        this.node_ids.push(node_id);
    }

    addEdge(edge_id) {
        console.error(`Cannot add edge: ${edge_id} to two node selection`);
    }
}

class ManyNodeSelection extends Selection() {
    addNode(node_id) {
        this.node_ids.push(node_id);
    }

    addEdge(edge_id) {
        console.error(`Cannot add edge: ${edge_id} to many node selection`);
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
        if(this.node_ids.length === 1 || this.node_ids.length === 1) {
            this.clearSelection();
        }

        this.edge_ids.push(edge_id);
    }
}

class ManyHybridSelection extends Selection {
    addNode(node_id) {
        this.node_ids.push(node_id);
    }

    addEdge(edge_id) {
        this.edge_ids.push(edge_id);
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
}

class ManyEdgeSelection extends Selection() {
  addNode(node_id) {
      console.error(`Cannot add node: ${node_id} to many edge selection`);

  }

  addEdge(edge_id) {
    this.edge_ids.push(edge_id);
  }
}


export {
    OneNodeSelection,
    TwoNodeSelection,
    ManyNodeSelection,
    SingleHybridSelection,
    ManyHybridSelection
}
