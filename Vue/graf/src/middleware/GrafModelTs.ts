import {ForceSimWrapper} from "./GrafForceSim"

type Nullable<T> = T | null;

/** A simple graph structure. May be directed or undirected. */
class Graph {
	public readonly label: string;
	private readonly isDirected: boolean;
	private readonly _nodes: Set<Node>;
	private readonly _edges: Set<Edge>;
	private _simulation: ForceSimWrapper;

	public get nodes(): ReadonlySet<Node> { return this._nodes; }
	public get edges(): ReadonlySet<Edge> { return this._edges; }
	public get edgeCount() { return this.edges.size; }
	public get nodeCount() { return this.nodes.size; }
	public get simulation() { return this._simulation; }
	/** Whether this Graph object is actually being visualized and simulated in the editor. */
	public get isSimulated() { return this.simulation !== null; }

	/**
	 * Constructs a new Graph.
	 * @param {string} label The label to give this graph
	 * @param {boolean} directed Whether to make this graph directed (true) or undirected (false). By default, false.
	 * @param {ForceSimWrapper} sim The ForceSimWrapper to attach this graph to, if any.
	 */
	public constructor(label = "New Graf", directed = false, sim: ForceSimWrapper = null) {
		this.label = label;
		this._nodes = new Set();
		this._edges = new Set();
		this.isDirected = directed;
		this._simulation = sim;
	}

	/**
	 * Adds a node with the given (non-unique) label to the graph.
	 * @param {string} label the desired label for the node.
	 * @return {number} the id of the created node.
	 */
	public addNode(label = this.nodeCount.toString()): number {
		const node = new Node(this.nodeCount, label);
		this._nodes.add(node);
		this.simulation.addSimNode()
		return node.id;
	}
	/**
	 * Adds an edge to the graph and returns its id.
	 * If the edge already exists, returns the id of the existing edge.
	 * @param {number} source the id of the node at one endpoint.
	 * @param {number} target the id of the node at the other endpoint.
	 * @return {number} the id of the given edge.
	 */
	addEdge(source: number, target: number): number {
		const edge = (this.isDirected) ?
	}
	/**
	 * Removes the node with the given `id` and any edges connected to it, if it exists. Otherwise, does nothing and
	 * returns false.
	 * @param {number} id the id of the node to remove.
	 * @return {boolean} whether there was any node with the given id.
	 */
	removeNode(id: number): Nullable<Node> {
		return this.nodes[0];
	}
	/**
	 * Removes the edge with the given id, if it exists.
	 * @param {number} id the id of the edge to remove.
	 * @return {boolean} whether there was any edge with the given id.
	 */
	removeEdge(id: number): boolean {
		// TODO
	}

	/**
	 * Returns whether this graph contains a matching edge.
	 */

}

class Node {
	private readonly _id: number;
	private readonly _label: string;
	private readonly _edges: Set<Edge>;

	public constructor(id: number, label: string = "") {
		this._id = id;
		this._label = label;
		this._edges = new Set();
	}

	/** The id of this node. */
	public get id() { return this._id; }
	/** The label of this node. */
	public get label() { return this._label; }
	/** The edge list of this node. */
	public get edges(): ReadonlySet<Edge> { return this._edges; }
}

class Edge {
	private readonly _source: Node;
	private readonly _target: Node;
	private _data: object;
	private _isDirected: boolean;

	/**
	 * Constructs a new Edge. If this edge is undirected and `target.id` is less than `source.id`, then `target`
	 * will be made the source and `source` will be made the target.
	 * @param id The id of this edge
	 * @param source The id of the source node
	 * @param target The id of the target node
	 * @param {boolean} directed Whether this edge should be directed or undirected
	 * @param {object} data A JSON representing any properties of this edge, e.g. weight, label, etc.
	 */
	public constructor(id: number, source: Node, target: Node, directed = false, data = Object.entries({ weight: 1 })) {
		this._source = source;
		this._target = target;
		this._data = data;
		this._isDirected = directed;
	}


	public get source() { return this._source; }
	public get target() { return this._target; }
	public get sourceId() { return this._source.id; }
	public get targetId() { return this._target.id; }
}

export { Graph, Node, Edge }