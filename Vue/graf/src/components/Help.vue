<template>
  <div>
    <sui-button @click='toggle' class="right floated icon" icon="help"></sui-button>
    <sui-modal v-model='open'>
      <sui-modal-header>Welcome to Graf!</sui-modal-header>
      <sui-modal-content>
        <sui-header>Quick Start Guide</sui-header>
        <img src="../assets/toolbar.png"/>
        <p>
          At the top of the page you'll see the toolbar. 
          The default tool is the Select tool, which can be used to select the nodes and edges on the graph. 
          Use the Node tool to add nodes to the graph, and the Edge tool to connect two Nodes.
          The label tool can be used to label nodes and edges.
          The erase tool is used to erase nodes and edges.
          The algorithm tool is used to apply algorithms to the graph, such as Dijkstra's algorithm.
          The edge tool can also be used to create directed or undirected edges.
          Happy Grafing!
        </p>
      </sui-modal-content>
      <sui-modal-actions>
        <sui-button positive @click='toggle'>
          OK
        </sui-button>
      </sui-modal-actions>
    </sui-modal>
  </div>
</template>

<script>

export default {
  name: "Help",
  data () {
    return {
      open: false
    }
  },
  methods: {
    toggle() {
      this.open = !this.open
    }
  }
}

</script>
