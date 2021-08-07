<template>
  <div class>
    <sui-modal v-model='open'>
      <sui-modal-header>Load Options</sui-modal-header>
      <sui-modal-content>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <sui-button @click ='onLoadFromFile()' icon="file">From File</sui-button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <sui-dropdown
            class="labeled icon"
            icon="connectdevelop"
            button
            text="Clique">
            <sui-dropdown-menu>
                <sui-dropdown-item
                v-for="clique in clique"
                v-bind:key="clique"
                @click="onCliqueLoad(clique)"
                >
                {{clique}}
                </sui-dropdown-item>
            </sui-dropdown-menu>
        </sui-dropdown>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <sui-dropdown
            class="labeled icon"
            icon="recycle"
            button
            text="Cycle">
            <sui-dropdown-menu>
                <sui-dropdown-item
                v-for="cycle in cycle"
                v-bind:key="cycle"
                @click="onCycleLoad(cycle)"
                >
                {{cycle}}
                </sui-dropdown-item>
            </sui-dropdown-menu>
        </sui-dropdown>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        
        <sui-button @click="loadit(0)" icon="connectdevelop">SCC Example</sui-button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <sui-button @click="loadit(1)" icon ="arrow right"> Path Example</sui-button>
        <br><br><br><br><br><br><br><br><br><br><br><br>
      </sui-modal-content>
    </sui-modal>
  </div>
</template>

<script>


import CookieHelpers from '../middleware/cookieHelper';
export default {
  name: "Load",
  data () {
    return {
        open: false,
        clique: ['3','4','5','6','7','8','9','10','11','12','13'],
        cycle: ['3','4','5','6','7','8','9','10','11','12','13'],
        cliqueLoad: [
            '®¯0°a¯1°b¯2°c±²2³1´U°1²2³0´U°1²1³0´U°1µ3',
            '®¯0°a¯1°b¯2°c¯3°d±²2³1´U°1²2³0´U°1²1³0´U°1²3³0´U°1²3³2´U°1²3³1´U°1µ4',
            '®¯0°a¯1°b¯2°c¯3°d¯4°e±²2³1´U°1²2³0´U°1²1³0´U°1²3³0´U°1²3³2´U°1²3³1´U°1²4³1´U°1²4³3´U°1²4³0´U°1²4³2´U°1µ5',
            '®¯0°a¯1°b¯2°c¯3°d¯4°e¯5°f±²2³1´U°1²2³0´U°1²1³0´U°1²3³0´U°1²3³2´U°1²3³1´U°1²4³1´U°1²4³3´U°1²4³0´U°1²4³2´U°1²5³4´U°1²5³3´U°1²5³0´U°1²5³2´U°1²5³1´U°1µ6',
            '®¯0°a¯1°b¯2°c¯3°d¯4°e¯5°f¯6°g±²2³1´U°1²2³0´U°1²1³0´U°1²3³0´U°1²3³2´U°1²3³1´U°1²4³1´U°1²4³3´U°1²4³0´U°1²4³2´U°1²5³4´U°1²5³3´U°1²5³0´U°1²5³2´U°1²5³1´U°1²6³0´U°1²6³3´U°1²6³2´U°1²6³5´U°1²6³1´U°1²6³4´U°1µ7',
            '®¯0°a¯1°b¯2°c¯3°d¯4°e¯5°f¯6°g¯7°h±²2³0´U°1²2³1´U°1²0³1´U°1²4³0´U°1²4³2´U°1²4³1´U°1²3³2´U°1²3³4´U°1²1³3´U°1²3³0´U°1²6³3´U°1²6³4´U°1²6³2´U°1²6³1´U°1²6³0´U°1²5³6´U°1²5³2´U°1²5³3´U°1²5³1´U°1²5³0´U°1²5³4´U°1²7³6´U°1²7³5´U°1²7³4´U°1²7³3´U°1²7³2´U°1²7³1´U°1²7³0´U°1µ8',
            '®¯0°a¯1°b¯2°c¯3°d¯4°e¯5°f¯6°g¯7°h¯8°i±²2³0´U°1²2³1´U°1²0³1´U°1²4³0´U°1²4³2´U°1²4³1´U°1²3³2´U°1²3³4´U°1²1³3´U°1²3³0´U°1²6³3´U°1²6³4´U°1²6³2´U°1²6³1´U°1²6³0´U°1²5³6´U°1²5³2´U°1²5³3´U°1²5³1´U°1²5³0´U°1²5³4´U°1²7³6´U°1²7³5´U°1²7³4´U°1²7³3´U°1²7³2´U°1²7³1´U°1²7³0´U°1²8³5´U°1²8³6´U°1²8³2´U°1²8³3´U°1²8³7´U°1²8³1´U°1²8³0´U°1²8³4´U°1µ9',
            '®¯0°a¯1°b¯2°c¯3°d¯4°e¯5°f¯6°g¯7°h¯8°i¯9°j±²2³0´U°1²2³1´U°1²0³1´U°1²4³0´U°1²4³2´U°1²4³1´U°1²3³2´U°1²3³4´U°1²1³3´U°1²3³0´U°1²6³3´U°1²6³4´U°1²6³2´U°1²6³1´U°1²6³0´U°1²5³6´U°1²5³2´U°1²5³3´U°1²5³1´U°1²5³0´U°1²5³4´U°1²7³6´U°1²7³5´U°1²7³4´U°1²7³3´U°1²7³2´U°1²7³1´U°1²7³0´U°1²8³5´U°1²8³6´U°1²8³2´U°1²8³3´U°1²8³7´U°1²8³1´U°1²8³0´U°1²8³4´U°1²9³4´U°1²9³5´U°1²9³0´U°1²9³2´U°1²9³1´U°1²9³3´U°1²9³7´U°1²9³8´U°1²9³6´U°1µ10',
            '®¯0°a¯1°b¯2°c¯3°d¯4°e¯5°f¯6°g¯7°h¯8°i¯9°j¯10°k±²2³0´U°1²2³1´U°1²0³1´U°1²4³0´U°1²4³2´U°1²4³1´U°1²3³2´U°1²3³4´U°1²1³3´U°1²3³0´U°1²6³3´U°1²6³4´U°1²6³2´U°1²6³1´U°1²6³0´U°1²5³6´U°1²5³2´U°1²5³3´U°1²5³1´U°1²5³0´U°1²5³4´U°1²7³6´U°1²7³5´U°1²7³4´U°1²7³3´U°1²7³2´U°1²7³1´U°1²7³0´U°1²8³5´U°1²8³6´U°1²8³2´U°1²8³3´U°1²8³7´U°1²8³1´U°1²8³0´U°1²8³4´U°1²9³4´U°1²9³5´U°1²9³0´U°1²9³2´U°1²9³1´U°1²9³3´U°1²9³7´U°1²9³8´U°1²9³6´U°1²10³4´U°1²10³1´U°1²10³2´U°1²10³3´U°1²8³10´U°1²10³7´U°1²10³5´U°1²10³0´U°1²10³6´U°1²10³9´U°1µ11',
            '®¯0°a¯1°b¯2°c¯3°d¯4°e¯5°f¯6°g¯7°h¯8°i¯9°j¯10°k¯11°l±²2³0´U°1²2³1´U°1²0³1´U°1²4³0´U°1²4³2´U°1²4³1´U°1²3³2´U°1²3³4´U°1²1³3´U°1²3³0´U°1²6³3´U°1²6³4´U°1²6³2´U°1²6³1´U°1²6³0´U°1²5³6´U°1²5³2´U°1²5³3´U°1²5³1´U°1²5³0´U°1²5³4´U°1²7³6´U°1²7³5´U°1²7³4´U°1²7³3´U°1²7³2´U°1²7³1´U°1²7³0´U°1²8³5´U°1²8³6´U°1²8³2´U°1²8³3´U°1²8³7´U°1²8³1´U°1²8³0´U°1²8³4´U°1²9³4´U°1²9³5´U°1²9³0´U°1²9³2´U°1²9³1´U°1²9³3´U°1²9³7´U°1²9³8´U°1²9³6´U°1²10³4´U°1²10³1´U°1²10³2´U°1²10³3´U°1²8³10´U°1²10³7´U°1²10³5´U°1²10³0´U°1²10³6´U°1²10³9´U°1²11³5´U°1²11³1´U°1²11³0´U°1²11³6´U°1²11³7´U°1²11³4´U°1²11³8´U°1²11³9´U°1²11³3´U°1²11³2´U°1²10³11´U°1µ12',
            '®¯0°a¯1°b¯2°c¯3°d¯4°e¯5°f¯6°g¯7°h¯8°i¯9°j¯10°k¯11°l¯12°m±²2³0´U°1²2³1´U°1²0³1´U°1²4³0´U°1²4³2´U°1²4³1´U°1²3³2´U°1²3³4´U°1²1³3´U°1²3³0´U°1²6³3´U°1²6³4´U°1²6³2´U°1²6³1´U°1²6³0´U°1²5³6´U°1²5³2´U°1²5³3´U°1²5³1´U°1²5³0´U°1²5³4´U°1²7³6´U°1²7³5´U°1²7³4´U°1²7³3´U°1²7³2´U°1²7³1´U°1²7³0´U°1²8³5´U°1²8³6´U°1²8³2´U°1²8³3´U°1²8³7´U°1²8³1´U°1²8³0´U°1²8³4´U°1²9³4´U°1²9³5´U°1²9³0´U°1²9³2´U°1²9³1´U°1²9³3´U°1²9³7´U°1²9³8´U°1²9³6´U°1²10³4´U°1²10³1´U°1²10³2´U°1²10³3´U°1²8³10´U°1²10³7´U°1²10³5´U°1²10³0´U°1²10³6´U°1²10³9´U°1²11³5´U°1²11³1´U°1²11³0´U°1²11³6´U°1²11³7´U°1²11³4´U°1²11³8´U°1²11³9´U°1²11³3´U°1²11³2´U°1²10³11´U°1²12³11´U°1²12³6´U°1²12³7´U°1²12³10´U°1²12³0´U°1²12³5´U°1²12³1´U°1²12³4´U°1²12³8´U°1²12³9´U°1²12³3´U°1²12³2´U°1µ13',
        ],
        cycleLoad: [
            '®¯0°a¯1°b¯2°c±²2³1´U°1²0³1´U°1²0³2´U°1µ3',
            '®¯0°a¯1°b¯2°c¯3°d±²2³1´U°1²0³1´U°1²2³3´U°1²3³0´U°1µ4',
            '®¯0°a¯1°b¯2°c¯3°d¯4°e±²2³1´U°1²0³1´U°1²2³3´U°1²0³4´U°1²3³4´U°1µ5',
            '®¯0°a¯1°b¯2°c¯3°d¯4°e¯5°f±²2³1´U°1²0³1´U°1²2³3´U°1²3³4´U°1²0³5´U°1²4³5´U°1µ6',
            '®¯0°a¯1°b¯2°c¯3°d¯4°e¯5°f¯6°g±²2³1´U°1²0³1´U°1²2³3´U°1²4³5´U°1²3³4´U°1²6³5´U°1²6³0´U°1µ7',
            '®¯0°a¯1°b¯2°c¯3°d¯4°e¯5°f¯6°g¯7°h±²2³1´U°1²0³1´U°1²2³3´U°1²4³5´U°1²3³4´U°1²6³5´U°1²7³6´U°1²0³7´U°1µ8',
            '®¯0°a¯1°b¯2°c¯3°d¯4°e¯5°f¯6°g¯7°h¯8°i±²2³1´U°1²0³1´U°1²2³3´U°1²4³5´U°1²3³4´U°1²6³5´U°1²7³6´U°1²8³0´U°1²8³7´U°1µ9',
            '®¯0°a¯1°b¯2°c¯3°d¯4°e¯5°f¯6°g¯7°h¯8°i¯9°j±²2³1´U°1²0³1´U°1²2³3´U°1²4³5´U°1²3³4´U°1²6³5´U°1²7³6´U°1²8³7´U°1²8³9´U°1²9³0´U°1µ10',
            '®¯0°a¯1°b¯2°c¯3°d¯4°e¯5°f¯6°g¯7°h¯8°i¯9°j¯10°k±²2³1´U°1²0³1´U°1²2³3´U°1²4³5´U°1²3³4´U°1²6³5´U°1²7³6´U°1²8³7´U°1²8³9´U°1²10³0´U°1²10³9´U°1µ11',
            '®¯0°a¯1°b¯2°c¯3°d¯4°e¯5°f¯6°g¯7°h¯8°i¯9°j¯10°k¯11°l±²2³1´U°1²0³1´U°1²2³3´U°1²4³5´U°1²3³4´U°1²6³5´U°1²7³6´U°1²8³7´U°1²8³9´U°1²10³9´U°1²11³10´U°1²11³0´U°1µ12',
            '®¯0°a¯1°b¯2°c¯3°d¯4°e¯5°f¯6°g¯7°h¯8°i¯9°j¯10°k¯11°l¯12°m±²2³1´U°1²0³1´U°1²2³3´U°1²4³5´U°1²3³4´U°1²6³5´U°1²7³6´U°1²8³7´U°1²8³9´U°1²10³9´U°1²11³10´U°1²12³0´U°1²12³11´U°1µ13'
        ],

        kosaLoad: [
          '®¯0°a¯1°b¯2°c¯3°d¯4°e¯5°f¯6°g¯7°h¯8°i¯9°j¯10°k¯11°l¯12°m¯13°n¯14°o¯15°p¯16°q±²12³8´D°1²8³11´D°1²10³11´D°1²9³1´D°1²11³1´D°1²6³7´D°1²7³3´D°1²3³4´D°1²4³6´D°1²12³4´D°1²2³12´D°1²2³0´D°1²5³6´D°1²5³8´D°1²9³4´D°1²5³0´D°1²10³3´D°1²10³9´D°1²10³5´D°1²7³0´D°1²8³2´D°1²9³7´D°1µ17',
          "®¯0°a¯1°b¯2°c¯3°d¯4°e¯5°f¯6°g¯7°h±²5³1´D°20²1³6´D°3²6³0´D°1²0³4´D°13²4³5´D°6²1³3´D°10²3³6´D°6²6³2´D°1²2³0´D°1²4³6´D°1²6³5´D°1²3³2´D°4µ8"
          
        ]

    }
  },
  methods: {
    toggle() {
        this.open = !this.open
    },
    onLoadFromFile() {
        this.$emit('Load-File')
    },
    onCliqueLoad(value){
        var d = CookieHelpers.decompressGraf(this.cliqueLoad[parseInt(value)-3]);
        this.toggle();
        this.$emit('preset-load', d);
    },
    onCycleLoad(value){
        var d = CookieHelpers.decompressGraf(this.cycleLoad[parseInt(value)-3]);
        this.toggle();
        this.$emit('preset-load', d);
    }, 
    loadit(i){
        var d = CookieHelpers.decompressGraf(this.kosaLoad[i]);
        this.toggle();
        this.$emit('preset-load', d);
    },
  },
  created: function () {
    this.$root.$on('openLoad', () => {
      this.toggle();
    });
  }
}

</script>

<style> 

</style>




