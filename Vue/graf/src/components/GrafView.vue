<template>
  <div class="svg-container" style="width: 100%">

    <svg id="svg" preserveAspectRatio="xMinYMin meet" pointer-events="all"
         :width="width+'px'"
         :height="height+'px'"
         :viewBox="[-width/2, -height/2, width, height]"
         @mousemove="drag($event)"
         @mouseup="drop()">

      <line v-for="link in this.simData.links"
            :key="'L' + link.id"
            :x1="link.source.x"
            :y1="link.source.y"
            :x2="link.target.x"
            :y2="link.target.y"
            stroke="black"
            stroke-width="5"
            v-on:click="linkClick(link)"/>

      <circle v-for="node in this.simData.nodes"
              :key="'N' + node.id"
              :cx="node.x"
              :cy="node.y"
              :r="10"
              fill="teal"
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
	props: ["simData"],
	data() {
		return {
			width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
			height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 40,
			nodeMoving: null
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
			}
		},
		drop(){
			if(this.nodeMoving != null) {
				delete this.nodeMoving.fx;
				delete this.nodeMoving.fy;
				this.nodeMoving = null;
			}
		}
	},
	computed: {
		nodeColor: function () {
			// TODO MDF: replace these hardcoded colors with variables from node style / graf style
			return function (node) {
				return this.model.selection && this.model.selection.containsNode(node.id) ? "red" : "teal";
			};
		}
	}
};
</script>
