/**!
 Copyright (c) 2018 7thCode.(http://seventh-code.com/)
 This software is released under the MIT License.
 //opensource.org/licenses/mit-license.php
 */

"use strict";

import * as socketio from 'socket.io';
import * as _ from "lodash";

export class IO {

    public io: any = null;

    public connected: string[] = [];

    constructor(server: any) {
        this.io = socketio.listen(server);
        this.connected = [];
    }

    public addConnected(item: string): void {
        let index = _.indexOf(this.connected, item);
        if (index == -1) {
            this.connected.push(item);
        }
    }

    public removeConnected(item: string): void {
        let index = _.indexOf(this.connected, item);
        if (index != -1) {
            this.connected.splice(index, 1);
        }
    }

    public SendTo(request:any, to:string) {
        _.forEach(this.io.sockets.connected, (client: any, id: string): void => {
            if (client.username === to) {
                request.payload.list = this.connected;
                request.response.id = id;
                client.emit(request.response.name, request);
            }
        });
    }

    public Broadcast(request: any, room:string): void {
        _.forEach(this.io.sockets.connected, (client: any, id: string): void => {
            request.payload.list = this.connected;
            request.response.id = id;
            client.to(room).emit(request.response.name, request);
        });
    }

    public wait(config:any, event: any): void {

        this.io.on('connection', (socket:any):void => {

            socket.on('request', (request: { response: { name: string, id: string, method: string, from: string, to: string }, payload: any }):void => {

                let response = request.response;

                request.response.id = socket.id;

                event.emitter.emit('socket', request);

                let from = response.from;
                let to = response.to;
                switch (response.method) {
                    case "enter": {
                        socket.join('default');
                        this.io.sockets.connected[socket.id].username = from;
                        this.addConnected(from);
                        this.Broadcast(request,'default');
                    }
                        break;
                    case "leave": {
                        this.io.sockets.connected[socket.id].username = "";
                        this.removeConnected(from);
                        this.Broadcast(request,'default');
                        socket.leave('default');
                    }
                        break;
                    case "send": {
                        this.SendTo(request, to);
                    }
                        break;
                    case "broadcast": {
                        this.Broadcast(request,'default');
                    }
                        break;
                    default:
                }

            });

            socket.on("disconnect", () => {
                socket = null;
            });
        });

    }
}

module.exports = IO;
