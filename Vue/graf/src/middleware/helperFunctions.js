
class grafhelpers {

    changeGrafColor() {}
    convertGrafData(links) {
        var data = {};
        for(const edge in links) {

            var lNode = links[edge].sid
            var rNode = links[edge].tid

            if(!(lNode in data)) {
                data[lNode] = [rNode];
            } else {
                data[lNode].push(rNode);
            }

            if(!(rNode in data)) {
                data[rNode] = [lNode];
            } else {
                data[rNode].push(lNode);
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
    saveGraf(nodes, links) {

        // translate json data to base64 encoded text
        var graf = btoa(JSON.stringify({nodes, links}));

        // set data type
        var linkSource = 'data:application/txt;base64,' + graf;

        // create link element, then set attributes for downloading element data
        var link = document.createElement('a');
        document.body.appendChild(link);
        link.href = linkSource;
        link.download = "graf_data";
        link.click();
    }
    loadGraf(data) {
        return JSON.parse(data);
    }
}

export default new grafhelpers();