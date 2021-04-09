import PathTools from '../middleware/pathTools';
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

  new_edge(graf, selection) {
    if(selection.selectedLast != null && selection.selectedCurrent != null && selection.selectedCurrent != selection.selectedLast) {
      if(!this.edge_exists(graf, selection.selectedLast.id, selection.selectedCurrent.id))
        graf.links.push({sid: selection.selectedLast.id, tid: selection.selectedCurrent.id, _color: 'black'});
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
      var subChildren = this.getChildren(graf, child);
      for(let subChild of subChildren) {
        if(!this.edge_exists(graf, nodeId, subChild))
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
      if(!this.edge_exists(graf, sourceId, child))
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
