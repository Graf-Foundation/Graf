import * as d3 from "d3-force";
import * as gf from "./GrafForces";

class ForceSimWrapper {
	constructor(force_params = null,
		sim_nodes = [],
		sim_links = []) {

		this.nodes = sim_nodes;
		this.links = sim_links;
		this.forces = {};
		this.simulation = d3.forceSimulation();

		//TODO anyone: make these settings dynamic
		this.simulation = this.simulation.alpha(.5);
		this.simulation = this.simulation.alphaDecay(0);

		if(force_params != null)
			this.genForces(force_params);
		else
			this.genDefaultForces();

		console.log(this.forces);

		this.applyForces();
	}

	genDefaultForces() {
		this.forces = {
			"link" : new gf.LinkForce(),
			"collide" : new gf.CollisionForce(),
			"charge" : new gf.ManyBodyForce()
		};
	}

	stopSim() {
		this.simulation = this.simulation.stop();
	}

	restartSim() {
		this.simulation = this.simulation.restart();
	}

	genForces(params) {
		let forces = {};

		if("link" in params) forces["link"] = new gf.LinkForce(params.links);
		if("collide" in params) forces["collide"] = new gf.CollisionForce(params.collide);
		if("charge" in params) forces["charge"] = new gf.ManyBodyForce(params.charge);
		if("center" in params) forces["center"] = new gf.CenteringForce(params.center);

		this.forces = forces;
	}

	updateForces(params) {
		for (const [key, value] of Object.entries(params)) {
			this.forces[key].addOrUpdateParam("str", value); 
			console.log(this.forces[key].params);
			console.log(this.forces);
		}
		this.applyForces();
	}

	applyForces() {
		let sim = this.simulation;

		sim = "link" in this.forces ? this.forces["link"].applyForce(sim, this.links) : sim;
		sim = "collide" in this.forces ? this.forces["collide"].applyForce(sim) : sim;
		sim = "charge" in this.forces ? this.forces["charge"].applyForce(sim) : sim;
		sim = "center" in this.forces ? this.forces["center"].applyForce(sim) : sim;

		this.simulation = sim;
	}

	addSimNode(node_id, node_x = 0, node_y = 0) {
		let node = {id: node_id, x: node_x, y: node_y};

		this.nodes.push(node);

		this.simulation = this.simulation.nodes(this.nodes);
	}

	removeSimNode(node_id) {
		// find index of node_id and splice
		let index = this.nodes.findIndex((node) => node.id == node_id);
		this.nodes.splice(index, 1);
	}

	addSimLink(link_id, source_id, target_id) {
		let link = { id: link_id, source: source_id, target: target_id };

		this.links.push(link);
		
		// this.simulation = this.simulation.force("link", d3.forceLink(this.links).id(function (n) { return n.id; }));
		// Must specify that nodes are indexed by id, not index, via:  .id(function (n) { return n.id; })
		this.simulation.force("link").id(function (n) { return n.id; }).links(this.links);
	}

	removeSimLink(link_id) {
		// find index of link_id and splice
		let index = this.links.findIndex((link) => link.id == link_id);
		this.links.splice(index, 1);
	}
}

export {
	ForceSimWrapper
};
