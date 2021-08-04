import helperAlgs from '../middleware/algorithms.js'
import grafhelpers from '../middleware/helperFunctions';

class PathTools {

    static algs = {"bfs":         {"fun": helperAlgs.bfs, "type": "search"}, 
                   "dfs":         {"fun": helperAlgs.dfs, "type": "search"},
                   "dijkstra":    {"fun": helperAlgs.djikstra, "type": "shortestPath"},
                   "kosaraju":    {"type": "scc"},
                   "bellmanford": {"fun": helperAlgs.bellmanford, "type": "shortestPath"}
                   "maxFlow":     {"fun": helperAlgs.maxFlow, "type": "flow"}
    };

    algorithm(graf, selection, alg) {
        var data = PathTools.algs[alg]
        if(data.type === "search") {
            this.searchAlg(graf, selection, data.fun);
        } else if(data.type === "shortestPath") {
            //this.shortestPath(graf, selection, data.fun);
            this.shortestPath2(graf, selection);
        } else if(data.type === "scc"){
            this.strongyConnected(graf);
        }
    } 
    //deprecated
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

        //if no path was found
        if(data[1] == 0){
            return;
        }
        var pathData = new Array();
        for(var a = 0; a < nodePath.length; a++) {
            pathData.push({id: nodePath[a]});
        }   
        //coloring the nodes
        
        for(var i = 0; i < nodePath.length; i++){
            graf.nodes[this.getIndexFromID(graf,nodePath[i])]._color = "red";
        }

        //coloring the edges
        var edgeColor = this.getEdgesFromPath(graf, pathData);

        grafhelpers.color_graf(graf, "red", "edge", edgeColor);
    }

    strongyConnected(graf){

        var data = helperAlgs.kosaraju(graf);
        //TO DO: make this infinitley scaleable so will never run out of colors
        var colors = ["#0012FF", "#1CFF00" , "#FF0000", "#FFFE00", "#FF007B",
                        "#00F5FF", "#CAFF00", "#FFAD00", "#C600FF", "#7D7D7D",
                        "#2E275F", "#275F32", "#5F2727", "#5D5F27", "#5F2756",
                        "#275F5F", "#425F27", "#5F4B27", "#50275F", "#C1C1C1"
                    ];
        for(var i = 0; i < data.length; i++){
            for(var j = 0; j< data[i].length; j++){
                graf.nodes[this.getIndexFromID(graf, data[i][j])]._color = colors[i];
            }
        }
        // //Updating BS
        graf.nodes.push({id: -1});
        graf.nodes.splice(graf.nodes.length-1,1)
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
              console.log(index);
          });
      } else {
          for(var node in graf.nodes) {
              var name = graf.nodes[node].name;
              if(name.indexOf(sep) > -1)
                  graf.nodes[node].name = name.slice(0, name.lastIndexOf(sep));
          }
      }
    }

    update_flow(graf, data, type) {
      var sep = ":\n ";
      var colored_edges = new Set();
      var colored_nodes = new Set();
      if(type) {
          for(let link_edge in graf.links) {
              var start = graf.links[link_edge].sid;
              var end = graf.links[link_edge].tid;
              if(data[start][end] != 0 || (data[end][start] != 0 && data[end][start] != undefined)) {
                  colored_edges.add(graf.links[link_edge]);
                  for(let node1 in graf.nodes) {
                      if(graf.nodes[node1].id === start || graf.nodes[node1].id === end) {
                          colored_nodes.add(graf.nodes[node1]);
                      }
                  }
                  if (data[start][end] != 0) {
                      graf.links[link_edge].name += sep + data[start][end];
                  } else {
                      graf.links[link_edge].name += sep + data[end][start];
                  }
              }
          }
          return [colored_nodes, colored_edges];
      } else {
          for(let link_edge in graf.links) {
              var name = graf.links[link_edge].name;
              if(typeof(name) !== "number" && name.indexOf(sep) > -1) {
                  graf.links[link_edge].name = name.slice(0, name.lastIndexOf(sep));
              }
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

    getIndexFromID(graf, id){
        for(let n of graf.nodes) {
            if(n.id === id) {
                return n.index;
            }
        }
    }

    
}

export default new PathTools();
