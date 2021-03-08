<template>
  <div class="dropdown">
  <button class="dropbtn"><img width = "20" src = "https://image.flaticon.com/icons/png/512/40/40031.png" alt= "not found" /></button>
  <div class="dropdown-content">
  <a href="#">Settings</a>
  <a href="#">FAQ</a>
  <a href="#">About</a>
  </div>
	
  
  <D3Network :net-nodes="nodes" :net-links="links" :options="options"/>
  </div>
</template>

<script>
import D3Network from 'vue-d3-network';

export default {
  name: 'Graf',
  props: {
  },
  components: {
    D3Network
  },
  data () {
    return {
      nodes: [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
        { id: 8 },
        { id: 9 }
      ],
      links: [
        { sid: 1, tid: 2, _color: 'black'},
        { sid: 2, tid: 8, _color: 'black'},
        { sid: 3, tid: 4, _color: 'black'},
        { sid: 4, tid: 5, _color: 'black'},
        { sid: 5, tid: 6, _color: 'black'},
        { sid: 7, tid: 8, _color: 'black'},
        { sid: 5, tid: 8, _color: 'black'},
        { sid: 3, tid: 8, _color: 'black'},
        { sid: 7, tid: 9, _color: 'black'}
      ],
      nodeSize:20,
      canvas:false
    };
  },
  computed:{
    options(){
      return{
        force: 3000,
        size:{ w:600, h:600},
        nodeSize: this.nodeSize,
        nodeLabels: true,
        linkLabels:true,
        canvas: this.canvas
      }
    }
  }
}
</script>

<style scoped>

/* Dropdown Button */
.dropbtn {
  background-color: white;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
  position: fixed;
  right: 10px;
  top: 10px;
  /*right: 100px;*/
}

/* The container <div> - needed to position the dropdown content */
.dropdown { 
  position: relative;
  display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  display: none;
  position: fixed;
  right: 10px;
  top: 70px;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

/* Links inside the dropdown */
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {background-color: #ddd;}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {display: block;}

/* Change the background color of the dropdown button when the dropdown content is shown */
.dropdown:hover .dropbtn {background-color: #41bb22c0;}

</style>
