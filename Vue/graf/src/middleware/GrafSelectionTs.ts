class GraphSelection {

	private readonly _nodes: number[];
	private readonly _edges: number[];

	/** Builds a new selection with the given nodes and edges. */
	public constructor(nodes: readonly number[] = [], edges: readonly number[] = []) {
		this._nodes = [...nodes];
		this._edges = [...edges];
	}

	/** Gets the list of IDs of nodes contained in this selection. */
	public get nodes(): readonly number[] { return this._nodes; }
	/** Gets the list of IDs of edges contained in this selection. */
	public get edges(): readonly number[] { return this._edges; }
	/** Gets the number of nodes contained in this selection. */
	public get nodeCount(): number { return this.nodes.length; }
	/** Gets the number of edges contained in this selection. */
	public get edgeCount(): number { return this.edges.length; }

	/** Returns a new GraphSelection with the given node added. */
	public addNode(id: number): GraphSelection {
		return new GraphSelection([...this.nodes, id], this.edges);
	}
	/** Returns a new GraphSelection with the given edge added. */
	public addEdge(id: number): GraphSelection {
		return new GraphSelection(this.nodes, [...this.edges, id]);
	}
	/** Returns a new GraphSelection with all the given nodes and edges added. */
	public addAll(nodes: readonly number[] = [], edges: readonly number[] = []) {
		return new GraphSelection([...this.nodes, ...nodes], [...this.edges, ...edges]);
	}
	/** Returns a new GraphSelection with the given node removed. */
	public removeNode(id: number): GraphSelection {
		return new GraphSelection(this.nodes.filter(id2 => id2 !== id), this.edges);
	}
	/** Returns a new GraphSelection with the given edge removed. */
	public removeEdge(id: number): GraphSelection {
		return new GraphSelection(this.nodes, this.edges.filter(id2 => id2 !== id));
	}
	/** Returns a new GraphSelection with all the given nodes and edges removed. */
	public removeAll(nodes: readonly number[] = [], edges: readonly number[] = []) {
		return new GraphSelection(
			nodes=this.nodes.filter(id => !nodes.includes(id)),
			edges=this.nodes.filter(id => !edges.includes(id))
		);
	}

	/** Returns whether this selection contains the given node. */
	public containsNode(id: number): boolean { return this.nodes.some(id2 => id2 === id); }
	/** Returns whether this selection contains the given edge. */
	public containsEdge(id: number) { return this.nodes.some(id2 => id2 === id); }
	/** Returns whether this selection contains all the given nodes and edges. */
	public containsAll(nodes: readonly number[] = [], edges: readonly number[] = []) {
		return nodes.every(id => this.nodes.includes(id))
			&& edges.every(id => this.edges.includes(id));
	}
}

export { GraphSelection };
