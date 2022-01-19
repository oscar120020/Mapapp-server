const Markers = require("./markers");

class Sockets {
    constructor( io ){
        this.io = io;
        this.markers = new Markers();
        this.socketsEvents();
    }

    socketsEvents(){
        this.io.on('connection', ( socket ) => {
            socket.emit("load-markers", this.markers.actives)

            socket.on("new-marker", (marker) => {
                this.markers.addMarker(marker)
                socket.broadcast.emit("new-marker", marker)
            })

            socket.on("update-marker", (marker) => {
                this.markers.updateMarker(marker)
                socket.broadcast.emit("update-marker", marker)
            })
        });
    }
}

module.exports = Sockets