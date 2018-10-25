/**!
 Copyright (c) 2018 7thCode.(https://seventh-code.com/)
 This software is released under the MIT License.
 //opensource.org/licenses/mit-license.php
 */

"use strict";

namespace AuthControllersModule {

    let SocketControllers: angular.IModule = angular.module('SocketControllers', []);

    SocketControllers.controller('ChatController', ["$scope", "$rootScope", "$window", "$uibModal", '$log', 'AuthService', 'ProfileService', 'SessionService', 'Socket',
        ($scope: any, $rootScope: any, $window: any, $uibModal: any, $log: any, AuthService: any, ProfileService: any, SessionService: any, Socket): void => {

            let progress = (value: boolean): void => {
                $scope.$emit('progress', value);
            };

            $scope.$on('progress', (event: any, value: any): void => {
                $scope.progress = value;
            });

            let error_handler = (error: any): void => {
                progress(false);
                $scope.message = error.message;
                $log.error(error.message);
                alert(error.message);
            };

            let alert = (message: string): void => {
                let modalInstance: any = $uibModal.open({
                    controller: 'AlertDialogController',
                    templateUrl: '/auth/common/alert_dialog',
                    resolve: {
                        items: (): any => {
                            return message;
                        }
                    }
                });
                modalInstance.result.then((answer: any): void => {
                }, (): void => {
                });
            };


            $scope.about = true;

            $scope.showChatDialog = (): void => {
                let items = {};
                let modalRegist = $uibModal.open({
                    controller: 'ChatDialogController',
                    templateUrl: '/auth/common/chat_dialog',
                    backdrop: "static",
                    resolve: {
                        items: (): any => {
                            return items;
                        }
                    }
                });

                modalRegist.result.then((): void => {
                }, (): void => {
                });
            };

        }]);

    /**
     *
     * @param target  Comment for parameter ´target´.
     * @returns       Comment for return value.
     */
    SocketControllers.controller('ChatDialogController', ['$scope', '$window', '$uibModalInstance', 'SessionService', 'Socket',
        ($scope: any, $window: any, $uibModalInstance: any, SessionService: any, Socket: any): void => {

            let progress = (value: boolean): void => {
                $scope.$emit('progress', value);
            };

            let error_handler = (error: any): void => {
                progress(false);
                $scope.message = error.message;
            };

            $scope.$on('progress', (event: any, value: any): void => {
                $scope.progress = value;
            });

            SessionService.Get((error, profile) => {
                if (!error) {
                    if (profile) {

                        let SocketEnter = (): void => {
                            let resp_target = {name: "response", id: "", method: "enter", from: profile.username, to: ""};
                            let payload = {message: "", list: []};
                            Socket.emit("request", {response: resp_target, payload: payload});
                        };

                        let SocketLeave = (): void => {
                            let resp_target = {name: "response", id: "", method: "leave", from: profile.username, to: ""};
                            let payload = {message: "", list: []};
                            Socket.emit("request", {response: resp_target, payload: payload});
                        };

                        let messages: string[] = [];
                        let SocketSend = (to: string, message: string): void => {
                            if (to) {
                                let resp_target = {name: "response", id: "", method: "send", from: profile.username, to: to};
                                let payload = {message: message, list: []};
                                Socket.emit("request", {response: resp_target, payload: payload});
                                messages.push(moment().format("MM/DD kk:mm:ss SSS") + " " + message);
                            }
                        };


                        Socket.on("response", (response: any): void => {

                            let userlist: string[] = [];
                            response.payload.list.forEach((username: string): void => {
                                if (username != profile.username) {
                                    userlist.push(username);
                                }
                            });
                            $scope.userlist = userlist;

                            if (response.payload.message) {
                                messages.push(moment().format("MM/DD kk:mm:ss SSS") + " " + response.payload.message);
                                $scope.messages = messages;
                            }
                        });

                        let Broadcast = (message: string): void => {
                            let resp_target = {name: "response", id: "", method: "broadcast", from: profile.username, to: ""};
                            let payload = {message: message, list: []};
                            Socket.emit("request", {response: resp_target, payload: payload});
                        };

                        $scope.SocketEnter = SocketEnter;
                        $scope.SocketLeave = SocketLeave;
                        $scope.SocketSend = SocketSend;
                        $scope.Broadcast = Broadcast;

                        $scope.hide = (): void => {
                            SocketLeave();
                            $uibModalInstance.close();
                        };

                        $scope.cancel = (): void => {
                            SocketLeave();
                            $uibModalInstance.dismiss();
                        };

                        $scope.answer = (items: any): void => {
                            SocketLeave();
                            $uibModalInstance.close(null);
                        };

                        SocketEnter();
                    }
                } else {
                    error_handler(error);
                }

            });

        }]);

}