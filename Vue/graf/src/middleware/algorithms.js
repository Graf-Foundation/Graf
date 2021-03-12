import grafhelpers from '../middleware/helperFunctions';
// import Queue from "queue";

class helperAlgs {

    bfs(start_n, end_n, links) {
        var data = grafhelpers.convertGrafData(links);
        var queue = new Array();
        var visited = [];

        var start = {node: start_n, path:[]}
        queue.push(start);

        while(queue.length > 0) {
            var state = queue.shift();

            if(state.node == end_n) {
                return state.path;
            }

            else if (!(visited.includes(state.node))) {
                var fringe = data[state.node];
                for (var fNode in fringe) {
                    if (!(visited.includes(fringe[fNode]))) {
                        var next_path = JSON.parse(JSON.stringify(state.path));
                        next_path.push([state.node, fringe[fNode]]);
                        queue.push({node: fringe[fNode], path: next_path});
                    }
                }
                visited.push(state.node);
            }
        }
    }

}

export default new helperAlgs();