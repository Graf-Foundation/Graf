<template>
	<div class="ui sidebar">
		<sui-sidebar-pushable>
			<sui-menu
				is="sui-sidebar"
				:visible="this.open"
				animation="overlay"
				width= "thin"
				icon="labeled"
				vertical
				direction = "left"
			>
				<sui-menu-item>
					Settings
				</sui-menu-item>	
				<sui-menu-item>
					<div>
						Node Size
					</div>	
					<div class="slidecontainer">
						<input @change="onSliderChange(val1, 1);" v-model.number = "val1" type="range" min="10" max="80" value="20" class="slider">
					</div>
				</sui-menu-item>
				<sui-menu-item>
					<div>
						Edge Force
					</div>	
					<div class="slidecontainer">
						<input @change="onSliderChange(val2, 2);" v-model.number = "val2" type="range" min=".66" max="10" value="3" step=".01" class="slider">
					</div>
				</sui-menu-item>
				<sui-menu-item>
					<div>
						Edge Width
					</div>	
					<div class="slidecontainer">
						<input @change="onSliderChange(val3, 3);" v-model.number = "val3" type="range" min=".5" max="15" value="3" step =".1" class="slider">
					</div>
				</sui-menu-item>
				<sui-menu-item>
					<div>
					<sui-checkbox @change="onEdgeChange()" label="Edge Weights"/>
					</div>	
				</sui-menu-item>
				<sui-menu-item>
					<div>Node Color</div>
					<input type="color" @input="onColorChange(nodeCol, 1)" v-model.number = nodeCol value="#000000">
				</sui-menu-item>
				<sui-menu-item>
					<div>Edge Color</div>
					<input type="color" @input="onColorChange(edgeCol, 2)" v-model.number = edgeCol value="#919191">
				</sui-menu-item>
				<sui-menu-item>
					<div>Node Label Color</div>
					<input type="color" @input="onColorChange(nLabelCol, 3)" v-model.number = nLabelCol value="#000000">
				</sui-menu-item>
				<sui-menu-item>
					<div>Edge Weight Color</div>
					<input type="color" @input="onColorChange(eLabelCol, 4)" v-model.number = eLabelCol value="#000000">
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
			val1: 20,
			val2: 3,
			val3: 3,
			nodeCol: "#000000",
			edgeCol: "#919191",
			nLabelCol: "#000000",
			eLabelCol: "#000000",
		}
	},
	methods: {
		onSliderChange(val, need) {
			this.$emit('slider-change', val, need);
		},
		onEdgeChange(){
			this.$emit('edge-change');
		},
		onReset(){
			this.val1 = 20;
			this.val2 = 3;
			this.val3 = 3;
			this.nodeCol = "#000000";
			this.edgeCol = "#919191";
			this.nLabelCol = "#000000";
			this.eLabelCol = "#000000"; 
			this.data = Object.assign({}, this.data)

		}, 
		onResetColor(){
			this.nodeCol = "#000000";
			this.edgeCol = "#919191";
		},
		onColorChange(color, need){
			this.$emit('color-change', color, need)
		}
	},
	created: function () {
    this.$root.$on('resetSliders', () => {
		this.onReset();
    });
	this.$root.$on('resetColors', () => {
		this.onResetColor();
    });
  },
	props: ["open"]
};
</script>

<style scoped>
.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 8px;
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
  width: 15px;
  height: 15px;
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

input[type="color"] {
	-webkit-appearance: none;
	border-radius: 16px;
	/* border-style: groove; */
	/* border-color: rgb(233, 225, 225); */
	border: none; 
	width: 25px;
	height: 25px;
}


</style>
