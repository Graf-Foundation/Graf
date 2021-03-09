<template>
  <div id="toolbar" v-bind:class="{vertical: isVertical}">
    <div id="toolbarheader"></div>
    <button v-for="tool in tools"
            v-bind:key="tool"
            v-bind:class="{active: activeTool === tool}"
            v-on:click="activeTool = tool">
      <img v-bind:src=icons[tool] v-bind:title="altTexts[tool]"/>
    </button>
    <button v-on:click="changeVertical" title="(v)ertical"><img src='l'/></button>
  </div>
</template>

<script>
import select_logo from '../assets/select.svg';
import node_logo from '../assets/node.svg';
import edge_logo from '../assets/edge.svg';
import label_logo from '../assets/label.svg';
import erase_logo from '../assets/erase.svg';
export default{
  name: 'Toolbar',
  mounted() {
    document.addEventListener("keypress", (event) => {
      //may want to consider making a class for scalability when we begin to add more features
      switch(event.key){
        case "s":
          this.$set(this,"activeTool","Select");
          break;
        case "n":
          this.$set(this,"activeTool","Node");
          break;
        case "e": 
          this.$set(this,"activeTool","Edge");
          break;
        case "l":
          this.$set(this,"activeTool","Label");
          break;
        case "r":
          this.$set(this,"activeTool","Erase");
          break;
        case "v":
          this.changeVertical();
          break;
        default:
          break;
      }
    });
    
    //theres probably a way to do this with more vue stuff, but I'm not sure what it is.
    dragElement(document.getElementById("toolbar"));

    function dragElement(elmnt) {
      var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
      if (document.getElementById(elmnt.id + "header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
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
  data: 
  function() {
    return {
      isVertical: false,
      activeTool: "Select",
      tools: ["Select", "Node", "Edge", "Label", "Erase"],
      icons: {
        "Select" : select_logo,
        "Node" : node_logo,
        "Edge" : edge_logo,
        "Label" : label_logo,
        "Erase" : erase_logo
      },
      altTexts: {
        "Select" : "(s)elect",
        "Node" : "(n)ode",
        "Edge" : "(e)dge",
        "Label" : "(l)abel",
        "Erase" : "e(r)ase"
      }
    }
  },
  methods: {
    changeVertical: function(){
      this.isVertical = !this.isVertical;
    }
  }
}
</script>      

<style scoped>
button {
  display: inline-block;
  margin: 5px;
  font-weight: normal;
}
.active {
  background-color: LightGray;
}
#toolbar {
  display: inline-block;
  border: solid;
  position: absolute;
  background-color: white;
}
#toolbarheader {
  padding: 10px;
  cursor: move;
  z-index: 10;
  background-color: black;
  color: gray;
}
img {
  width: 20px;
  height: 20px;
  float: left;
}
.vertical > button {
  display: block;
}

</style>
