import helperAlgs from '../middleware/algorithms.js'
import grafhelpers from '../middleware/helperFunctions';

class PathTools {

    static algs = {"bfs": {"fun": helperAlgs.bfs, "type": "search"}, "dijkstra": {"fun": helperAlgs.djikstra, "type": "shortestPath"}};

    algorithm(graf, selection, alg) {
        var data = PathTools.algs[alg]
        if(data.type === "search") {
            this.searchAlg(graf, selection, data.fun);
        } else if(data.type === "shortestPath") {
            //this.shortestPath(graf, selection, data.fun);
            this.shortestPath2(graf, selection);
        }
    }

    shortestPath(graf, selection, alg) {
        var path = alg(Array.from(selection.selectedNodes), graf.links);
        // Recolor all edges in path
        grafhelpers.color_graf(graf, 'red', 'node', this.match_ids_to_graf(graf, path));
        grafhelpers.color_graf(graf, 'red', 'edge', this.getEdgesFromPath(graf, path));
    }
    
    //sortestPath that considers edge weight(I did not want to delete the old one)
    shortestPath2(graf, selection){

        var selections = Array.from(selection.selectedNodes)
        var data = helperAlgs.djikstra2(graf, selections[0], selections[1]);
        var nodePath = data[0];
        var edgePath = data[1];

        //coloring the nodes
        for(let n in nodePath) {
            graf.nodes[n]._color = "red";
        }
        //coloring the edges
        for(let e in edgePath) {
            graf.links[e]._color = "red";
        }
    }

    searchAlg(graf, selection, alg) {
        this.update_distances(graf, data, false);
        var data = alg(Array.from(selection.selectedNodes), graf.links);
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
