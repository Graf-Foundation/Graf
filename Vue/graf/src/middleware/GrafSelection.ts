/** An immutable container for a user selection of nodes and edges. */
class Selection {

	private readonly _nodes: number[];
	private readonly _edges: number[];

	/** Builds a new selection with the given nodes and edges. */
	public constructor(nodes: readonly number[] = [], edges: readonly number[] = []) {
		this._nodes = [...nodes];
		this._edges = [...edges];
	}

	/** The list of IDs of nodes contained in this selection. */
	public get nodes(): readonly number[] { return this._nodes; }
	/** The list of IDs of edges contained in this selection. */
	public get edges(): readonly number[] { return this._edges; }
	/** The number of nodes contained in this selection. */
	public get nodeCount(): number { return this.nodes.length; }
	/** The number of edges contained in this selection. */
	public get edgeCount(): number { return this.edges.length; }

	/** Returns a new Selection with the given node added. */
	public addNode(id: number): Selection {
		return new Selection([...this.nodes, id], this.edges);
	}
	/** Returns a new Selection with the given edge added. */
	public addEdge(id: number): Selection {
		return new Selection(this.nodes, [...this.edges, id]);
	}
	/** Returns a new Selection with all the given nodes and edges added. */
	public addAll(nodes: readonly number[] = [], edges: readonly number[] = []) {
		return new Selection([...this.nodes, ...nodes], [...this.edges, ...edges]);
	}
	/** Returns a new Selection with the given node removed. */
	public removeNode(id: number): Selection {
		return new Selection(this.nodes.filter(id2 => id2 !== id), this.edges);
	}
	/** Returns a new Selection with the given edge removed. */
	public removeEdge(id: number): Selection {
		return new Selection(this.nodes, this.edges.filter(id2 => id2 !== id));
	}
	/** Returns a new Selection with all the given nodes and edges removed. */
	public removeAll(nodes: readonly number[] = [], edges: readonly number[] = []) {
		return new Selection(
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

export { Selection };
