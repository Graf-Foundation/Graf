import grafhelpers from '../middleware/helperFunctions';

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

    
    dfs(selectedNodes, links) {


        var data = grafhelpers.convertGrafData(links);
        var queue = new Array();
        var visited = new Map();
        var start = {node: selectedNodes[0].index, path:[{id: selectedNodes[0].index}]};

        queue.push(start);

        while(queue.length > 0) {
            console.log("The queue contains: ");
            for (var i = queue.length; i >= 0; i--) {
                console.log(queue[i]);
            }

            var state = queue.pop();

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

        console.log("Graph data structure is...");
        console.log(JSON.parse(JSON.stringify(data)));

        return visited;
         


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
