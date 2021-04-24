<template>
	<div class="ui sidebar">
		<sui-sidebar-pushable>
			<sui-menu
				is="sui-sidebar"
				:visible="this.open"
				animation="overlay"
				width="thin"
				icon="labeled"
				inverted
				vertical
				right
			>
				<sui-menu-item>
					<div class="slidecontainer">
						<input @change="onSliderChange(val);" v-model.number = "val" type="range" min="10" max="80" value="20" class="slider">
					</div>
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
		return {}
	},
	methods: {
		onSliderChange(val) {
			console.log(val);
			this.$emit('slider-change', val);
		}
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

</style>
