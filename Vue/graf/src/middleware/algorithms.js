import grafhelpers from '../middleware/helperFunctions';
import GrafTools from '../middleware/grafTools.js'

class helperAlgs {
    bfs(selectedNodes, links) {
        var data = grafhelpers.convertGrafData(links);
        var queue = new Array();
        var visited = new Map();
        var start = {node: selectedNodes[0].id, path:[{id: selectedNodes[0].id}]};
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
        var queue = new Array();
        var visited = new Map();
        var final_path = new Array();
        var found = 0;
        queue.push({weight:  0, id: start.id, path: []});
        while(queue.length > 0) {
            var minPath = queue[0];
            minPath.path.push(minPath.id);
            final_path = minPath.path;
            queue.splice(0, 1);
            var minDest = minPath.id;

            if(minDest == end.id) {
                found = 1;
                break;
            }
            if(visited.has(minDest)){
                continue;
            }
            for(let e of GrafTools.getChildren(graf, minPath.id)) {
                if(!visited.has(e[0])){
                    var tempPath = [...minPath.path];
                    var temp = {weight:  parseInt(e[3]) + minPath.weight, id: e[0], path: tempPath};
                    queue.push(temp);
                }
            }
            //sort queue by weight
            queue = this.sortQueue(queue);
            visited.set(minDest, "visited");
        }
        return [final_path, found];

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
