import helperAlgs from '../middleware/algorithms.js'
import grafhelpers from '../middleware/helperFunctions';

class PathTools {

    static algs = {"bfs": helperAlgs.bfs, "dijkstra": helperAlgs.djikstra};

    shortestPath(graf, selection) {
        var path = PathTools.algs[selection.selectedAlgorithm](Array.from(selection.selectedNodes), graf.links);
        // Recolor all edges in path
        grafhelpers.color_graf(graf, 'red', 'node', this.match_ids_to_graf(graf, path));
        grafhelpers.color_graf(graf, 'red', 'edge', this.getEdgesFromPath(graf, path));
    }

    searchAlg(graf, selection) {
        this.update_distances(graf, data, false);
        var data = PathTools.algs[selection.selectedAlgorithm](Array.from(selection.selectedNodes), graf.links);
        this.update_distances(graf, data, true);
    }

    match_ids_to_graf(graf, selection) {
      var matches = new Set();

      for(var node1 in graf.nodes) {
          for(var node2 in selection) {
              if(graf.nodes[node1].id === selection[node2].id)
                  matches.add(graf.nodes[node1]);
          }
      }

      return matches;
    }

    update_distances(graf, data, type) {
      var sep = ":\n ";
      if(type) {
          data.forEach(function(value, key) {
              let index = graf.nodes.findIndex((node) => { return node.id === key });
              graf.nodes[index].name += sep + (value.length - 1);
          });
      } else {
          for(var node in graf.nodes) {
              var name = graf.nodes[node].name;
              if(name.indexOf(sep) > -1)
                  graf.nodes[node].name = name.slice(0, name.lastIndexOf(sep));
          }
      }
    }

    getEdgesFromPath(graf, path) {
      var edges = new Set();
      var i = 0, j = 1;
      while(j < path.length) {
          edges.add(this.getEdge(graf, [path[i], path[j]]));
          i += 1;
          j += 1;
      }
      return edges;
    }

    getEdge(graf, selection) {
        for(var edge in graf.links) {
            if(graf.links[edge].sid === selection[0].id && graf.links[edge].tid === selection[1].id || graf.links[edge].tid === selection[0].id && graf.links[edge].sid === selection[1].id) {
                return graf.links[edge];
            }
        }
    }
}

export default new PathTools();
