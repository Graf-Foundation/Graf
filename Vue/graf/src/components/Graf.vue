<template>
    <div>
        <D3Network :net-nodes="nodes" :net-links="links" :options="options"/>
        <button
        @click="onSaveImage();"
        >Save Image</button>
        <button
        @click="onSaveGraf();"
        >Save Graf</button>
    </div>
</template>

<script>
import D3Network from 'vue-d3-network';
import grafhelpers from '../middleware/helperFunctions';

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
                size:{ w: window.innerWidth, h: window.innerHeight - 200},
                nodeSize: this.nodeSize,
                nodeLabels: true,
                linkLabels:true,
                canvas: this.canvas
            }
        }
    }, methods: {
        onSaveImage() {
            grafhelpers.screenshotGraf(document.getElementsByClassName("net-svg")[0]);
        },
        onSaveGraf() {
            grafhelpers.saveGraf(this.nodes, this.links);
        }
    }
}
</script>

<style scoped>

</style>
