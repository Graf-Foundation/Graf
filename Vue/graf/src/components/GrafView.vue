<template>
  <div class="svg-container" style="width: 100%">
    <svg id="svg" preserveAspectRatio="xMinYMin meet" pointer-events="all"
         :width="width+'px'"
         :height="height+'px'"
         :viewBox="[-width/2, -height/2, width, height]"
         @mousemove="drag($event)"
         @mouseup="drop()">

      <line v-for="link in this.graph.links"
            :key="link.id"
            :x1="link.source.x"
            :y1="link.source.y"
            :x2="link.target.x"
            :y2="link.target.y"
            stroke="black"
            stroke-width="5"
            v-on:click="linkClick(link)"/>

      <circle v-for="node in this.graph.nodes"
              :key="node.id"
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
import {ForceSimWrapper} from "../middleware/GrafForceSim";
import * as Model from "../middleware/GrafModel"

export default {
  name: "GrafView",
  data() {
    return {
      grafModel: null,
      width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
      height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 40,
      simulation: null,
      graph: {
        links: [{id: 0, source: 0, target: 1}, {id: 1, source: 2, target: 0}],
        nodes: [{id: "A", x: 0, y: 0},{id: "B", x: 0, y: 0},{id: "C",x: 0, y: 0}]
      },
      nodeMoving: null
    };
  },
  mounted() {
    console.log("mounted");

    this.simulation = new ForceSimWrapper(null,
        this.graph.nodes,
        this.graph.links
    );

    this.grafModel = new Model.Graph(this.simulation);
  },
  methods: {
    nodeClick(node) {
      let id = node.id
      console.log(`Node ${id} Clicked`)
    },
    linkClick(link) {
      let id = link.id
      console.log(`Link ${id} Clicked`)
    },
    drag(e) {
      if (this.nodeMoving != null) {
        let x = e.clientX - this.width/2;
        let y = e.clientY - this.height/2;
        this.nodeMoving.fx = x
        this.nodeMoving.fy = y
      }
    },
    drop(){
      if(this.nodeMoving != null) {
        delete this.nodeMoving.fx
        delete this.nodeMoving.fy
        this.nodeMoving = null
      }
    }
  }
}
</script>

<style scoped>
</style>