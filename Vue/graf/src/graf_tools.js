class GrafTools {
  // Tools
  clear_selection(selection) {
    selection.selectedNodes = new Set();
    selection.selectedEdges = new Set();
  }

  update_selection(selected, type, selection) {
    if(!selection.selectMultiple) this.clear_selection(selection);
    if(type == 'node') selection.selectedNodes.add(selected);
    if(type == 'edge') selection.selectedEdges.add(selected);
  }

  new_node(graf) {
    graf.nodes.push({id:graf.nodes.length});
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
      graf.links.splice(edge.index,1);
      //selection.selectedEdges.delete(edge);
    }
    this.clear_selection(selection);
  }

  nodeExists(nodeId, graf) {
    let index = graf.nodes.findIndex((node) => { return node.id === nodeId });
    return (index > -1);
  }
  removeLink(graf, linkId) {
    let index = graf.links.findIndex((link) => { return link.id === linkId });
    if (index > -1)
      graf.links.splice(index, 1);
    graf.links = this.rebuildLinks(graf);
  }
  removeNode(graf, nodeId) {
    let index = graf.nodes.findIndex((node) => { return node.id === nodeId });
    if (index > -1)
      graf.nodes.splice(index, 1);
    graf.links = this.rebuildLinks(graf);
    graf.nodes = this.rebuildNodes(graf);
  }
  rebuildLinks(graf) {
    let newLinks = [];
    var count = 0;
    for (let link of graf.links) {
      if (this.nodeExists(link.sid, graf) && this.nodeExists(link.tid, graf)) {
        link.id = count;
        count++;
        newLinks.push(link);
      }
    }
    return newLinks;
  }
  rebuildNodes(graf) {
    let newNodes = [];
    let newLinks = [];
    var count = 0;
    for (let node of graf.nodes) {
      this.fixLinks(newLinks, node.id, count);
      node.id = count;
      count++;
      newNodes.push(node);
    }
    graf.links = newLinks;
    return newNodes
  }
  fixLinks(links, oldId, newId) {
    for(let link in links) {
      if(link.sid == oldId) link.sid = newId;
      if(link.tid == oldId) link.tid = newId;
    }
  }



  // TODO: This doesn't work and isnt well abstracted, remember the end goal is to have a scripting language for graphs
  // This function should realy only take a graph and an algorithm as input, as well as any neceesary info for the algorithm

  algorithm() {
    // If there is no red path on screen
    // if(!this.pathActive) {
    //
    //     // Get start and end nodes
    //     var goals = Array.from(this.selectedNodes);
    //
    //     // Find bfs path
    //     var path = helperAlgs.bfs(goals[0] + 1, goals[1] + 1, this.links);
    //
    //     // Recolor all edges in path
    //     for (var i in path) {
    //         for (var j in this.links) {
    //             if ((path[i][0] == this.links[j].sid && path[i][1] == this.links[j].tid) || (path[i][1] == this.links[j].sid && path[i][0] == this.links[j].tid)) {
    //                 this.links[j]._color = 'red';
    //                 break;
    //             }
    //         }
    //     }
    //     this.selectedNodes = new Set();
    //     this.pathActive = true;
    //
    // // Remove coloring and deactivate path
    // } else {
    //     for (j in this.links) {
    //         this.links[j]._color = 'black';
    //     }
    //     this.pathActive = false;
    // }
  }
}

export default new GrafTools();
