<template>
  <div id="infoBox" class="infoBox">
    <sui-card>
      <sui-card-content id="infoBoxHeader" class="infoBoxHeader">
        <sui-card-header>
          Info
        </sui-card-header>
      </sui-card-content>
      <sui-card-content style="display:none">
        {{selected}}
      </sui-card-content>
      <sui-card-content v-for="n in selected.selectedNodes" v-bind:key="n.id">
        <h5>
          <sui-button 
          @click ="onDeleteNode(n)" 
          circular 
          class = "right floated"
          size = "mini" 
          icon="trash alternate outline"/>

          <sui-button
          @click ="onDeselectNode(n)" 
          circular 
          class = "right floated"
          size = "mini"
          icon="angle down" />
        </h5> 
        <div class = "smallerv2"> 
          Name: 
          <sui-input 
          fluid v-model ="n.name"  
          @keypress.stop/> 
        </div>
      </sui-card-content>
      <sui-card-content v-for="e in selected.selectedEdges" v-bind:key="e.id">
        <h5>
          <sui-button 
          @click ="onDeleteEdge(e)" 
          circular 
          class = "right floated"
          size = "mini" 
          icon="trash alternate outline"/> 

          <sui-button
          @click ="onDeselectEdge(e)" 
          circular 
          class = "right floated"
          size = "mini"
          icon="angle down" />
          </h5>
        <div class = "smaller"> Weight: <sui-input fluid v-model ="e.name"  @keypress.stop/> </div>
        
        <h5>Type: </h5>
        {{ e.type }}
      </sui-card-content>
    </sui-card>
  </div>
</template>

<script>

export default {
  name: "InfoBox",
  mounted: function() {
    dragElement(document.getElementById("infoBox"));

    function dragElement(elmnt) {
      var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
      if (document.getElementById(elmnt.id + "Header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "Header").onmousedown = dragMouseDown;
      } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
      }

      function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
      }

      function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
      }

      function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
      }
    }
  },
  methods: {
    onDeselectNode(n) {
      this.$emit('des-node', n);
    },
    onDeleteNode(n) { 
      this.$emit('del-node', n);
    },
    onDeselectEdge(e) {
      this.$emit('des-edge', e);
    },
    onDeleteEdge(e) { 
      this.$emit('del-edge', e);
    }

  },
  props: ['selected']
}

</script>

<style scoped>
h5 {
  margin-bottom: 0;
  /* width: 35%; */
}
h4 {
  margin-bottom: 0;
  font-size: 10.5pt;
  width: 35%;
  
}
.smaller {
  display: block;
  font-size: 10.5pt;
  font-weight: bold;
  margin-bottom: 0;
  width: 35%;
}

.smallerv2 {
  display: block;
  font-size: 10.5pt;
  font-weight: bold;
  margin-bottom: 0;
  width: 55%;
}

.infoBox {
  position: absolute;
  z-index: 9;
  border: 1px solid #d3d3d3;
  left:100%;
}

.infoBoxHeader {
  cursor: move;
  z-index: 10;
}
</style>
