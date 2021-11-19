import * as d3 from "d3-force";

class Force {
	constructor(default_values, force_name, param_obj = null) {
		this.params = param_obj != null ? param_obj : default_values;
		this.defaults = default_values;
		this.name = force_name;
	}

	addOrUpdateParam(param_name, param_value) {
		this.params[param_name] = param_value;
	}

	setDefaults() {
		this.params = Object.assign(this.defaults);
	}

	disableForce(simulation) {
		return simulation.force(this.name, null);
	}
}

// https://github.com/d3/d3-force#centering
class CenteringForce extends Force {

	constructor(param_obj = null) {
		let defaults = {
			"x" : 0,
			"y" : 0,
			"str" : 2
		};

		super(defaults, "center", param_obj);
	}

	applyForce(simulation) {
		let p = this.params;
		return simulation.force(this.name, d3.forceCenter(p.x, p.y).strength(p.str));
	}
}

/// https://github.com/d3/d3-force#collision
class CollisionForce extends Force {
	constructor(param_obj = null) {
		let defaults = {
			"radius" : 10,
			"str" : 5,
			"itr" : 1,
		};

		super(defaults, "collide", param_obj);
	}

	applyForce(simulation) {
		let p = this.params;
		return simulation.force(this.name, d3.forceCollide(p.radius).strength(p.str).iterations(p.itr));
	}
}

// https://github.com/d3/d3-force#links
class LinkForce extends Force {
	constructor(param_obj = null) {
		let defaults = {
			"dist" : 100,
			"str" : 1,
			"itr" : 1
		};

		super(defaults, "link", param_obj);
	}

	applyForce(simulation, links) {
		let p = this.params;
		return simulation.force(this.name, d3.forceLink(links).distance(p.dist).strength(p.str).iterations(p.itr));
	}
}

// https://github.com/d3/d3-force#many-body
class ManyBodyForce extends Force {
	constructor(param_obj = null) {
		let defaults = {
			"str" : 5,
			"min" : 1,
			"max" : 0,
			"theta_val" : 0.9
		};

		super(defaults, "charge", param_obj);
	}

	applyForce(simulation) {
		let p = this.params;
		let force = d3.forceManyBody().strength(p.str).distanceMin(p.min).theta(p.theta_val);

		if(p.max) force = force.distanceMax(p.max);

		return simulation.force(this.name, force);
	}
}

// TODO NEW PERSON : the 3 types of positioning forces, see above for examples

// https://github.com/d3/d3-force#positioning

// Don't forget to export the new classes below and update gen forces in ForceSim

export {
	CenteringForce,
	CollisionForce,
	LinkForce,
	ManyBodyForce
};
