import grafhelpers from '../middleware/helperFunctions';
import grafTools from '../middleware/graf_tools.js';

class helperAlgs {

    constructor() {
        this.algs = {"bfs": this.bfs, "djikstra": this.djikstra};
    }

    shortestPath(graf, selection) {
        var path = this.algs[selection.selectedAlgorithm](Array.from(selection.selectedNodes), graf.links);
        // Recolor all edges in path
        grafTools.color_graf(graf, 'red', 'node', grafTools.match_ids_to_graf(graf, path));
        grafTools.color_graf(graf, "red", "edge", grafTools.getEdgesFromPath(graf, path));
    }

    searchAlg(graf, selection) {
        if(!graf.pathActive) {
            var data = this.algs[selection.selectedAlgorithm](Array.from(selection.selectedNodes), graf.links);
            grafTools.update_distances(graf, data, true);
            graf.pathActive = true;
        } else {
            grafTools.update_distances(graf, data, false);
            graf.pathActive = false;
        }
    }

    bfs(selectedNodes, links) {
        var data = grafhelpers.convertGrafData(links);
        var queue = new Array();
        var visited = new Map();
        var start = {node: selectedNodes[0].index, path:[{id: selectedNodes[0].index}]};
        queue.push(start);

        while(queue.length > 0) {
            var state = queue.shift();

            if (!(visited.has(state.node))) {
                var fringe = data[state.node];
                fringe.forEach(fNode => {
                    if (!(visited.has(fNode))) {
                        var next_path = JSON.parse(JSON.stringify(state.path));
                        next_path.push({id: fNode});
                        queue.push({node: fNode, path: next_path});
                    }
                });
                visited.set(state.node, state.path);
            }
        }

        return visited;
    }

    djikstra(selectedNodes, links) {
        var data = grafhelpers.convertGrafData(links);
        var queue = new Array();
        var visited = [];
        var start = {node: selectedNodes[0].index, path:[{id: selectedNodes[0].index}]};

        queue.push(start);

        while(queue.length > 0) {
            var state = queue.shift();

            if(state.node == selectedNodes[1].index) {
                return state.path;
            }

            else if (!(visited.includes(state.node))) {
                var fringe = data[state.node];
                fringe.forEach(fNode => {
                    if (!(visited.includes(fNode))) {
                        var next_path = JSON.parse(JSON.stringify(state.path));
                        next_path.push({id: fNode});
                        queue.push({node: fNode, path: next_path});
                    }
                });
                visited.push(state.node);
            }
        }
    }

}

export default new helperAlgs();