<template>
	<div class="ui sidebar">
		<sui-sidebar-pushable>
			<sui-menu
				is="sui-sidebar"
				:visible="open"
				animation="overlay"
				width="thin"
				icon="labeled"
				inverted
				vertical
                right
			>
				<sui-menu-item>
					<div class="slidecontainer">
  						<input type="range" min="1" max="100" value="50" class="slider" id="myRange">
					</div>
				<sui-menu-item to="/">
					<sui-icon name="home" />
					My Acccount
				</sui-menu-item>
				<sui-menu-item>
					<sui-icon name="file outline" />
					Master List
				</sui-menu-item>
				<sui-menu-item>
					<sui-icon name="plus" />
					New Project
				</sui-menu-item>
			</sui-menu>
			<sui-sidebar-pusher>
				<sui-segment>
					<h3 is="sui-header">Application Content</h3>
					<docs-wireframe name="paragraph" />
				</sui-segment>
			</sui-sidebar-pusher>
		</sui-sidebar-pushable>
	</div>
</template>

<script>
export default {
	name: "Settings",
	data() {
		return {
			//open: false
		};
	},
	props: ["open"],
	methods: {
    	toggle() {
      		this.open = !this.open
			console.log(this.open)
    	}
  	},
	  created: function () {
    	this.$root.$on('openSettings', () => {
      	this.toggle();
    });
  }
};
</script>

<style scoped>
.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 15px;
  border-radius: 5px;  
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  border-radius: 50%; 
  background: #25df2c;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #25df2c;
  cursor: pointer;
}
</style>