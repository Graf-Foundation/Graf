import grafhelpers from '../middleware/helperFunctions';
import cookieHelpers from '../middleware/cookieHelper';

class GrafTools {

  // Helper
  clear_selection(graf, selection) {
    grafhelpers.color_graf(graf, 'black', 'node', new Set(graf.nodes));
    grafhelpers.color_graf(graf, 'black', 'edge', new Set(graf.links));
    selection.selectedNodes = new Set();
    selection.selectedEdges = new Set();
  }

  update_selection(graf, selected, type, selection) {
    if(!selection.selectMultiple) {
        this.clear_selection(graf, selection);
    }
    if(type == 'node') {
        if(selection.selectedNodes.has(selected)) {
            grafhelpers.color_graf(graf, 'black', 'node', new Set([selected]));
            selection.selectedNodes.delete(selected);
        } else {
            grafhelpers.color_graf(graf, 'red', 'node', new Set([selected]));
            selection.selectedNodes.add(selected);
        }
    }
    if(type == 'edge') {
        if(selection.selectedEdges.has(selected)) {
            grafhelpers.color_graf(graf, 'black', 'edge', new Set([selected]));
            selection.selectedEdges.delete(selected);
        } else {
            grafhelpers.color_graf(graf, 'red', 'edge', new Set([selected]));
            selection.selectedEdges.add(selected);
        }
    }
    //Modifying cookie
    cookieHelpers.putCookie("GrafData", cookieHelpers.compressGraf(JSON.stringify(graf)));
  }

  new_node(graf) {
    graf.nodes.push({id:graf.aggCount});
    graf.aggCount += 1;
  }

  new_edge(graf, selection, type) {
    if(selection.selectedLast != null && selection.selectedCurrent != null && selection.selectedCurrent != selection.selectedLast) {
      if(!this.edge_exists(graf, selection.selectedLast.id, selection.selectedCurrent.id))
        if(type == "undir")
          graf.links.push({ sid: selection.selectedLast.id,
                            tid: selection.selectedCurrent.id,
                            _color: 'black',
                            type: "Undirected"});
        else if(type == "dir")
          graf.links.push({ sid: selection.selectedLast.id,
                            tid: selection.selectedCurrent.id,
                            _color: 'black',
                            type: "Directed",
                            _svgAttrs: {'marker-end': 'url(#target-arrow)'}});
        else if(type == "bidir")
          graf.links.push({ sid: selection.selectedLast.id,
                            tid: selection.selectedCurrent.id,
                            _color: 'black',
                            type: "Bidirected",
                            _svgAttrs: {'marker-start': 'url(#source-arrow)', 'marker-end': 'url(#target-arrow)'}});
      selection.selectedLast = null;
      selection.selectedCurrent = null
      this.clear_selection(graf, selection);
    }
  }

  edge_exists(graf, node1, node2) {
    for(let link of graf.links) {
      if((link.sid == node1 && link.tid == node2) ||
         (link.sid == node2 && link.tid == node1))
        return true;
    }
    return false
  }

  erase(graf, selection) {
    // Remove selected Nodes and attached Edges
    for(let node of selection.selectedNodes) {
      this.removeNode(graf, node.id)
    }
    // Remove selected Edges
    for(let edge of selection.selectedEdges) {
      this.removeLink(graf, edge.id)
    }
    this.clear_selection(graf, selection);
  }

  removeLink(graf, linkId) {
    let index = graf.links.findIndex((link) => { return link.id === linkId });
    if (index > -1) {
      graf.links.splice(index, 1);
    }
  }
  removeNode(graf, nodeId) {
    let index = graf.nodes.findIndex((node) => { return node.id === nodeId });
    if (index > -1) {
      // remove links attached to node
      let newLinks = [];
      for (let link of graf.links) {
        if(link.sid != nodeId && link.tid != nodeId) {
          newLinks.push(link);
        }
      }
      graf.links = newLinks;
      // remove the node
      graf.nodes.splice(index, 1);
    }
  }

  contract(graf, selection) {
    var nodeSize = selection.selectedNodes.size;
    var edgeSize = selection.selectedEdges.size;
    if(nodeSize == 1 && edgeSize == 0) {
      for(let node of selection.selectedNodes) {
        var id = node.id;
        this.contractNode(graf, id);
        return;
      }
    }
    else if(nodeSize == 0 && edgeSize == 1) {
      for(let edge of selection.selectedEdges) {
        var source = edge.sid;
        var target = edge.tid;
        this.contractEdge(graf, source, target);
        return;
      }
    }
    this.clear_selection(graf, selection)
  }

  contractNode(graf, nodeId) {
    var children = this.getChildren(graf, nodeId);
    for(let child of children) {
      var subChildren = this.getChildren(graf, child[0]);
      for(let subChild of subChildren) {
        if(!this.edge_exists(graf, nodeId, subChild[0]) && subChild[0] != nodeId)
        graf.links.push({ sid: nodeId,
                          tid: subChild[0],
                          _color: 'black',
                          type: subChild[1],
                          _svgAttrs: subChild[2]
                        });
      }
      var subParents = this.getParents(graf, child[0]);
      for(let subParent of subParents) {
        if(!this.edge_exists(graf, nodeId, subParent[0])  && subParent[0] != nodeId)
        graf.links.push({ sid: nodeId,
                          tid: subParent[0],
                          _color: 'black',
                          type: subParent[1],
                          _svgAttrs: subParent[2]
                        });
      }
    }
    for(let child of children) {
      if(child[0] != nodeId)
        this.removeNode(graf, child[0]);
    }
  }

  contractEdge(graf, sourceId, targetId) {
    var children = this.getChildren(graf, targetId);
    for(let child of children) {
      if(!this.edge_exists(graf, sourceId, child[0]) && child[0] != sourceId)
      graf.links.push({ sid: sourceId,
                        tid: child[0],
                        _color: 'black',
                        type: child[1],
                        _svgAttrs: child[2]
                      });
    }
    var parents = this.getParents(graf, sourceId);
    for(let parent of parents) {
      if(!this.edge_exists(graf, parent[0], sourceId) && parent[0] != sourceId)
      graf.links.push({ sid: parent[0],
                        tid: sourceId,
                        _color: 'black',
                        type: parent[1],
                        _svgAttrs: parent[2]
                      });
    }
    this.removeNode(graf, targetId);
  }

  getChildren(graf, nodeId) {
    let edges = []
    for(let link of graf.links) {
      if(link.sid == nodeId)
        edges.push([link.tid, link.type, link._svgAttrs]);
      if(link.tid == nodeId && link.type != "Directed")
        edges.push([link.sid, link.type, link._svgAttrs]);
    }
    return edges;
  }

  getParents(graf, nodeId) {
    let edges = []
    for(let link of graf.links) {
      if(link.tid == nodeId)
        edges.push([link.sid, link.type, link._svgAttrs]);
      if(link.sid == nodeId && link.type != "Directed")
        edges.push([link.tid, link.type, link._svgAttrs]);
    }
    return edges;
  }

}

export default new GrafTools();
