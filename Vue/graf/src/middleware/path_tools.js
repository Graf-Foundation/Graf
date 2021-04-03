import grafTools from '../middleware/graf_tools.js';
import helperAlgs from '../middleware/algorithms.js'

class PathTools {

    static algs = {"bfs": helperAlgs.bfs, "dijkstra": helperAlgs.djikstra};

    shortestPath(graf, selection) {
        var path = PathTools.algs[selection.selectedAlgorithm](Array.from(selection.selectedNodes), graf.links);
        // Recolor all edges in path
        grafTools.color_graf(graf, 'red', 'node', grafTools.match_ids_to_graf(graf, path));
        grafTools.color_graf(graf, 'red', 'edge', grafTools.getEdgesFromPath(graf, path));
    }

    searchAlg(graf, selection) {
        if(!graf.pathActive) {
            var data = PathTools.algs[selection.selectedAlgorithm](Array.from(selection.selectedNodes), graf.links);
            grafTools.update_distances(graf, data, true);
            graf.pathActive = true;
        } else {
            grafTools.update_distances(graf, data, false);
            graf.pathActive = false;
        }
    }
}

export default new PathTools();
