import PathTools from '../middleware/pathTools'
import grafhelpers from '../middleware/helperFunctions';

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
        if(graf.nodes[selected.index]._color != 'black' && graf.nodes[selected.index]._color != undefined)
            grafhelpers.color_graf(graf, 'black', 'node', new Set([selected]));
        else
            grafhelpers.color_graf(graf, 'red', 'node', new Set([selected]));
        selection.selectedNodes.add(selected);
    }
    if(type == 'edge') {
        if(graf.links[selected.index]._color != 'black' && graf.links[selected.index]._color != undefined)
            grafhelpers.color_graf(graf, 'black', 'edge', new Set([selected]));
        else
            grafhelpers.color_graf(graf, 'red', 'edge', new Set([selected]));
        selection.selectedEdges.add(selected);
    }
  }

  new_node(graf) {
    graf.nodes.push({id:graf.aggCount});
    graf.aggCount += 1;
  }

  new_edge(graf, selection) {
    if(selection.selectedLast != null && selection.selectedCurrent != null && selection.selectedCurrent != selection.selectedLast) {
      graf.links.push({sid: selection.selectedLast.id, tid: selection.selectedCurrent.id, _color: 'black'});
      selection.selectedLast = null;
      selection.selectedCurrent = null
      this.clear_selection(graf, selection);
    }
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

  algorithm(graf, selection) {
    if(selection.selectedNodes.size === 1) {
        PathTools.searchAlg(graf, selection);
    } else if(selection.selectedNodes.size === 2) {
        PathTools.shortestPath(graf, selection);
    }
  }

  contract(graf, selection) {
    var nodeSize = selection.selectedNodes.size;
    var edgeSize = selection.selectedEdges.size;
    console.log(nodeSize,edgeSize);
    if(nodeSize == 1 && edgeSize == 0) {
      for(let node of selection.selectedNodes) {
        var id = node.id;
        this.contractNode(graf, id);
      }
    }
    if(nodeSize === 0 && edgeSize === 1) {
      for(let edge of selection.selectedEdges) {
        var source = edge.sid;
        var target = edge.tid;
        this.contractEdge(graf, source, target);
      }
    }
  }

  contractNode(graf, nodeId) {
    var children = this.getChildren(graf, nodeId);
    for(let child of children) {
      var subChildren = this.getChildren(graf, child);
      for(let subChild of subChildren) {
        graf.links.push({sid: nodeId, tid: subChild, _color: 'black'});
      }
    }
    for(let child of children) {
      if(child != nodeId)
        this.removeNode(graf, child);
    }
  }

  contractEdge(graf, sourceId, targetId) {
    var targetChildren =  this.getChildren(graf, targetId);
    for(let child of targetChildren) {
      graf.links.push({sid: sourceId, tid: child, _color: 'black'});
    }
    this.removeNode(graf, targetId);
  }

  //Assumes bidirectionality
  getChildren(graf, nodeId) {
    let childIds = []
    for(let link of graf.links) {
      if(link.sid == nodeId) {
        childIds.push(link.tid);
      }
      if(link.tid == nodeId) {
        childIds.push(link.sid);
      }
    }
    return childIds;
  }
}

export default new GrafTools();
