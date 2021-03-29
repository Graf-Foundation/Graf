import helperAlgs from '../middleware/algorithms.js'

class GrafTools {

  // Tools
  clear_selection(graf, selection) {
    this.color_graf(graf, 'black', 'node', new Set(graf.nodes));
    this.color_graf(graf, 'black', 'edge', new Set(graf.links));
    selection.selectedNodes = new Set();
    selection.selectedEdges = new Set();
    selection.selectedCurrent = null;
  }

  update_selection(graf, selected, type, selection) {
    if(!selection.selectMultiple) {
        this.clear_selection(graf, selection);
        return
    }

    if(type == 'node') {
        if(graf.nodes[selected.index]._color != 'black' && graf.nodes[selected.index]._color != undefined)
            this.color_graf(graf, 'black', 'node', new Set([selected]));
        else 
            this.color_graf(graf, 'red', 'node', new Set([selected]));
        selection.selectedNodes.add(selected);
    }
    if(type == 'edge') {
        if(graf.links[selected.index]._color != 'black' && graf.links[selected.index]._color != undefined)
            this.color_graf(graf, 'black', 'edge', new Set([selected]));
        else 
            this.color_graf(graf, 'red', 'edge', new Set([selected]));
        selection.selectedEdges.add(selected);
    }
  }

  color_graf(graf, color, type, selection) {
    if(type == 'node') {
        for(var node in graf.nodes) {
            if(selection.has(graf.nodes[node]))
                graf.nodes[node]._color = color;
        }
        graf.nodes = this.rebuildNodes(graf, undefined);
    }
    if(type == 'edge') {
        for(var edge in graf.links) {
            if(selection.has(graf.links[edge]))
                graf.links[edge]._color = color;
        }
        graf.links = this.rebuildLinks(graf, undefined);
    }
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

  getEdge(graf, selection) {
      for(var edge in graf.links) {
          if(graf.links[edge].sid === selection[0].id && graf.links[edge].tid === selection[1].id || graf.links[edge].tid === selection[0].id && graf.links[edge].sid === selection[1].id) {
              return graf.links[edge];
          }
      }
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

  new_node(graf) {
    graf.nodes.push({id:graf.aggCount});
  }

  new_edge(graf, selection) {
    if(selection.selectedLast != null && selection.selectedCurrent != null && selection.selectedCurrent != selection.selectedLast) {
      graf.links.push({sid: selection.selectedLast.id, tid: selection.selectedCurrent.id, _color: 'black'});
      selection.selectedLast = null;
      selection.selectedCurrent = null
    }
  }
  erase(graf, selection) {
    // Remove selected Nodes and attached Edges
    for(let node of selection.selectedNodes) {
      this.removeNode(graf, node.id)
      //selection.selectedNodes.delete(node);
    }
    // Remove selected Edges
    for(let edge of selection.selectedEdges) {
      this.removeLink(graf, edge.id)
      //selection.selectedEdges.delete(edge);
    }
    this.clear_selection(graf, selection);
  }

  nodeExists(nodeId, graf) {
    let index = graf.nodes.findIndex((node) => { return node.id === nodeId });
    return (index > -1);
  }
  removeLink(graf, linkId) {
    let newLinks = [];
    for (let link of graf.links) {
      if(link.id != linkId) {
        newLinks.push(link);
      }
    }
    return newLinks;
  }
  removeNode(graf, nodeId) {
    let index = graf.nodes.findIndex((node) => { return node.id === nodeId });
    if (index > -1)
      graf.links = this.rebuildLinks(graf, nodeId);
      graf.nodes = this.rebuildNodes(graf, nodeId);
  }
  rebuildLinks(graf, nodeId) {
    let newLinks = [];
    //var count = 1;
    for (let link of graf.links) {
      //if (this.nodeExists(link.sid, graf) && this.nodeExists(link.tid, graf)) {
      if(link.sid != nodeId && link.tid != nodeId) {
        //link.id = count;
        //count++;
        newLinks.push(link);
      }
    }
    return newLinks;
  }
  rebuildNodes(graf, nodeId) {
    let newNodes = [];
    for(let node of graf.nodes) {
      if(node.id != nodeId)
        newNodes.push(node)
    }
    return newNodes;
  }
  algorithm(graf, selection) {
    if(selection.selectedNodes.size === 1) {
        helperAlgs.searchAlg(graf, selection);
    } else if(selection.selectedNodes.size === 2) {
        helperAlgs.shortestPath(graf, selection);
    }
  }
}

export default new GrafTools();
