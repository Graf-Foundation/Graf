import grafhelpers from '../middleware/helperFunctions';
import GrafTools from '../middleware/grafTools.js'

class helperAlgs {
    bfs(selectedNodes, links) {
        var data = grafhelpers.convertGrafData(links);
        var queue = new Array();
        var visited = new Map();
        var start = {node: selectedNodes[0].index, path:[{id: selectedNodes[0].index}]};
        queue.push(start);

        while(queue.length > 0) {
            var state = queue.shift();

            if (!(visited.has(state.node))) {
                var fringe = data[state.node];
                fringe.forEach(fNode => {
                    if (!(visited.has(fNode))) {
                        var next_path = JSON.parse(JSON.stringify(state.path));
                        next_path.push({id: fNode});
                        queue.push({node: fNode, path: next_path});
                    }
                });
                visited.set(state.node, state.path);
            }
        }

        return visited;
    }


    //Dikstras that considers the edge weights in its pathing(I did not want to delete the old one)
    djikstra2(graf, start, end) {
        //var data = grafhelpers.convertGrafData(graf.links);
        var queue = new Array();
        var visited = new Map();
        var final_path = new Array();
        var final_links = new Array();
        queue.push({weight:  0, id: start.id, path: [], links: [], lastlink: ""});
        while(queue.length > 0) {
            var minPath = queue[0];
            minPath.path.push(minPath.id);
            minPath.links.push(parseInt(minPath.lastlink.substring(minPath.lastlink.length-1)));
            final_path = minPath.path;
            final_links = minPath.links;

            queue.splice(0, 1);
            var minDest = minPath.id;

            if(minDest == end.id) {
                //console.log("found path", minPath.path);
                break;
            }
            if(visited.has(minDest)){
                continue;
            }
            for(let e of GrafTools.getChildren(graf, minPath.id)) {
                if(!visited.has(e[0])){
                    var temp = {weight:  parseInt(e[3]) + minPath.weight, id: e[0], path: minPath.path, links: minPath.links, lastlink: e[4]};
                    queue.push(temp);
                }
            }
            //sort queue by weight
            queue = this.sortQueue(queue);
            console.log(queue)
            visited.set(minDest, "visited");
        }
        final_links.splice(0, 1);
        console.log(final_path);
        console.log(final_links);
        return [final_path, final_links];

    }

    sortQueue(queue){
        for(var i = 0; i < queue.length; i++) {
            var minInt = 0;
            var minCount = Number.MAX_SAFE_INTEGER;
            for(var j = i; j < queue.length; j++) {
                if(queue[j].weight < minCount){
                    minCount = queue[j].weight;
                    minInt = j;
                }
            }
            var temp = queue[minInt];
            queue[minInt] = queue[i];
            queue[i] = temp;
        }
        //console.log(queue);
        return queue
    }

    djikstra(selectedNodes, links) {
        var data = grafhelpers.convertGrafData(links);
        var queue = new Array();
        var visited = [];
        var start = {node: selectedNodes[0].index, path:[{id: selectedNodes[0].index}]};

        queue.push(start);

        while(queue.length > 0) {
            var state = queue.shift();

            if(state.node == selectedNodes[1].index) {
                return state.path;
            }

            else if (!(visited.includes(state.node))) {
                var fringe = data[state.node];
                fringe.forEach(fNode => {
                    if (!(visited.includes(fNode))) {
                        var next_path = JSON.parse(JSON.stringify(state.path));
                        next_path.push({id: fNode});
                        queue.push({node: fNode, path: next_path});
                    }
                });
                visited.push(state.node);
            }
        }
    }

}

export default new helperAlgs();
