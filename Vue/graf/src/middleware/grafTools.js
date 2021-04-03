import pathTools from '../middleware/pathTools'
import grafhelpers from '../middleware/helperFunctions';

class GrafTools {

  // Helper
  clear_selection(graf, selection) {
    grafhelpers.color_graf(graf, 'black', 'node', new Set(graf.nodes));
    grafhelpers.color_graf(graf, 'black', 'edge', new Set(graf.links));
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
        pathTools.searchAlg(graf, selection);
    } else if(selection.selectedNodes.size === 2) {
        pathTools.shortestPath(graf, selection);
    }
  }
}

export default new GrafTools();
