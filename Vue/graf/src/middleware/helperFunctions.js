
class grafhelpers {

    color_graf(graf, color, type, selection) {
      if(type == 'node') {
          for(var node in graf.nodes) {
              if(selection.has(graf.nodes[node]))
                  graf.nodes[node]._color = color;
          }
      }
      if(type == 'edge') {
          for(var edge in graf.links) {
              if(selection.has(graf.links[edge])) {
                  graf.links[edge]._color = color;
              }
          }
      }
      // Hacky BS to force update of the d3 network, should fork and workaround
      graf.nodes.push({id: -1});
      graf.nodes.splice(graf.nodes.length-1,1)
    }
    convertGrafData(links) {
        var data = {};
        for(var edge in links) {

            var lNode = links[edge].sid
            var rNode = links[edge].tid

            if(links[edge].type === "Undirected" || links[edge].type === "Bidirected") {
                if(!(lNode in data))
                    data[lNode] = new Set([rNode]);
                else
                    data[lNode].add(rNode);
    
                if(!(rNode in data))
                    data[rNode] = new Set([lNode]);
                else
                    data[rNode].add(lNode);

            } else if(links[edge].type === "Directed") {
                if(!(lNode in data))
                    data[lNode] = new Set([rNode]);
                else
                    data[lNode].add(rNode);

                if(!(rNode in data))
                    data[rNode] = new Set([rNode]);
            }
        }

        return data;
    }
    screenshotGraf(svg) {

        // initialize temp img and canvs elements
        var img = document.createElement('img');
        var canvas = document.createElement('canvas');

        // get svg data
        var xml = new XMLSerializer().serializeToString(svg);

        // make it base64
        var svg64 = btoa(xml);
        var b64Start = 'data:image/svg+xml;base64,';

        // prepend a "header"
        var image64 = b64Start + svg64;

        // set it as the source of the img element
        img.onload = function() {
            // draw the image onto the canvas
            canvas.getContext('2d').drawImage(img, 0, 0);
        }
        img.src = image64;

        // create link element, then set attributes for downloading element data
        var link = document.createElement("a");
        document.body.appendChild(link);
        link.href = img.src;
        link.download = "test_file";
        link.click();
    }
    saveGraf(data) {

        // translate json data to base64 encoded text
        var graf = btoa(JSON.stringify(data));

        // set data type
        var linkSource = 'data:application/txt;base64,' + graf;

        // create link element, then set attributes for downloading element data
        var link = document.createElement('a');
        document.body.appendChild(link);
        link.href = linkSource;
        link.download = "graf_data";
        link.click();
    }
    updateHistory(graf, history, type) {
        var data = JSON.stringify(graf);
        // if type, return first from previous, append current to next
        if(type) {
            if(history.previous.length === 0)
                return graf;
            history.next.unshift(data);
            return JSON.parse(history.previous.shift());
        // return first from next, append current to previous
        } else {
            if(history.next.length === 0)
                return graf;
            history.previous.unshift(data);
            return JSON.parse(history.next.shift());
        }
    }
    loadGraf(data) {
        return JSON.parse(data);
    }
    
    BFS_maxFlow(selectedNodes, data) {
        console.log("***** IN BFS_maxFlow *****");
        var queue = new Array();
        var visited = new Map();
        var start = {node: selectedNodes[0].index, path:[{id: selectedNodes[0].index}]};
        queue.push(start);

        while (queue.length > 0) {
            var state = queue.shift();

            if (!(visited.has(state.node))) {
                var fringe = data[state.node];
                for (var fNode in fringe) {
                    fNode = parseInt( fNode );
                    if (!(visited.has(fNode))) {
                        var next_path = JSON.parse(JSON.stringify(state.path));
                        next_path.push({id: fNode});
                        queue.push({node: fNode, path: next_path});
                    }
                }
                visited.set(state.node, state.path);
            }
        }

        var ret = [];
        if (!(visited.has(selectedNodes[1].index))) {
            console.log( "NO PATH -- NOT REACHABLE" );
            return ret;
        }
        var result = visited.get(selectedNodes[1].index);
        for (let element in result) {
            ret.push(result[element].id);
        }
        console.log(ret);
        return ret;
    }
}

export default new grafhelpers();
