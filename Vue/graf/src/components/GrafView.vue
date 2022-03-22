<template>
  <div class="svg-container" style="width: 100%;">
    <svg id="svg" preserveAspectRatio="xMinYMin meet" pointer-events="all"
         :width="width+'px'"
         :height="height+'px'"
         :viewBox="[-width/2, -height/2, width, height]"
         @mousemove="drag($event)"
         @mouseup="drop()"
		@mousedown="startDrag($event)">
		<polygon
			:points="dragBox()"
			:stroke="'rgba(0, 123, 255, 1)'"
			:fill="'rgba(0, 123, 255, 0.33)'"/>
		/>
      <line v-for="link in this.simData.links"
            :key="'L' + link.id"
            :x1="link.source.x"
            :y1="link.source.y"
            :x2="link.target.x"
            :y2="link.target.y"
            :stroke-width="settings.grafEdgeThickness"
			:stroke="edgeColor(link)"
            v-on:click="linkClick(link)"/>

		<polygon v-for="link in this.simData.links"
			:key="'D' + link.id"
			:points="arrowBuild(link)"
			:fill="edgeColor(link)"
			:stroke="edgeColor(link)"
			v-on:click="linkClick(link)"
			/>

      <circle v-for="node in this.simData.nodes"
              :key="'N' + node.id"
              :cx="node.x"
              :cy="node.y"
              :r="settings.nodeSize"
              :fill="nodeColor(node)"
              stroke="black"
              stroke-width="4"
              v-on:click="nodeClick(node)"
              @mousedown="nodeMoving = node"/>
    </svg>
  </div>
</template>

<script>


export default {
	name: "GrafView",
	props: ["simData", "model", "settings"],
	data() {
		return {
			width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
			height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 40,
			nodeMoving: null,
			isDragging: false,
			startDragX: 0,
			startDragY: 0,
			endDragX: 0,
			endDragY: 0
		};
	},
	methods: {
		nodeClick(node) {
			this.$emit("node-click", node);
		},
		linkClick(link) {
			this.$emit("link-click", link);
		},
		drag(e) {
			if (this.nodeMoving != null) {
				let x = e.clientX - this.width/2;
				let y = e.clientY - this.height/2 - 64;
				this.nodeMoving.fx = x;
				this.nodeMoving.fy = y;
			} else if(this.isDragging) {
				let x = e.clientX - this.width/2;
				let y = e.clientY - this.height/2 - 64;
				this.endDragX = x;
				this.endDragY = y;
			}
		},
		drop(){
			for(let linkInd = 0; linkInd < this.simData.links.length; linkInd++) {
				let link = this.simData.links[linkInd];
				if(this.pointInDragBox(link.source.x, link.source.y) && this.pointInDragBox(link.target.x, link.target.y)) {
					this.$emit("link-click", link);
				}
			}
			for(let nodeInd = 0; nodeInd < this.simData.nodes.length; nodeInd++) {
				let node = this.simData.nodes[nodeInd];
				if(this.pointInDragBox(node.x, node.y)) {
					this.$emit("node-click", node);
				}
			}
			this.isDragging = false;
			this.startDragX = 0;
			this.startDragY = 0;
			this.endDragX = 0;
			this.endDragY = 0;
			if(this.nodeMoving != null) {
				delete this.nodeMoving.fx;
				delete this.nodeMoving.fy;
				this.nodeMoving = null;
			}
		},
		startDrag(e){
			if(this.nodeMoving == null) {
				let x = e.clientX - this.width/2;
				let y = e.clientY - this.height/2 - 64;
				this.endDragX = x;
				this.endDragY = y;
				this.startDragX = x;
				this.startDragY = y;
				this.isDragging = true;
			}
		}, 
		pointInDragBox(x, y) {
			let withinX = false;
			let withinY = false;
			if(this.startDragX < this.endDragX && x > this.startDragX && x< this.endDragX) {
				withinX = true;
			} else if(this.startDragX > this.endDragX && x < this.startDragX && x > this.endDragX){
				withinX = true;
			}
			if(this.startDragY < this.endDragY && y > this.startDragY && y < this.endDragY){
				withinY = true;
			} else if(this.startDragY > this.endDragY && y < this.startDragY && y > this.endDragY){
				withinY = true;
			}
			return withinX && withinY;
		}
	},
	computed: {
		nodeColor: function () {
			// TODO MDF: replace these hardcoded colors with variables from node style / graf style
			return function (node) {
				return this.model.selection && this.model.selection.containsNode(node.id) ? "red" : "teal";
			};
		},
		edgeColor: function() {
			return function (edge) {
				return this.model.selection && this.model.selection.containsEdge(edge.id) ? "red" : "black";
			};
		},
		arrowBuild: function(){
			return function (link) {
				if(this.settings.grafDirected) {
					let x1 = link.source.x;
					let y1 = link.source.y;
					let x2 = link.target.x;
					let y2 = link.target.y;
					
					let slope = (y2 - y1) / (x2 - x1);
					let base = 4 + 3.45 * this.settings.grafEdgeThickness;
					let height = 20 + 2.5 * this.settings.grafEdgeThickness;
					let normFactor = 1/(Math.sqrt(1 + Math.pow(slope,2)));
					
					let basePointx = x2;
					let basePointy = y2 ;
					if(x2-x1 < 0) {
						basePointx += height * normFactor;
						basePointy += height * normFactor * slope;
					} else {
						basePointx -= height * normFactor;
						basePointy -= height * normFactor * slope;
					}

					let base1x = basePointx + (base/2) * normFactor * slope * - 1;
					let base1y = basePointy + (base/2) * normFactor; 
					let base2x = basePointx + (base/2) * normFactor * slope;
					let base2y = basePointy + (base/2) * normFactor * -1;

					return base1x + "," + base1y + " " + base2x + "," + base2y + " " + x2 + "," + y2;
				} else {
					return "0,0 0,0 0,0";
				}
			};
		},
		dragBox: function(){
			return function() {
				if (this.isDragging) {
					return this.startDragX + "," + this.startDragY + " " + this.startDragX + "," + this.endDragY + " " 
							+ this.endDragX + "," + this.endDragY + " " + this.endDragX + "," + this.startDragY;
				} else {
					return "0,0";
				}
			};
		}
	}
};
</script>
