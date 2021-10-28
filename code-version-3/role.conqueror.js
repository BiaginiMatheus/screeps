const constants = require('constants');

const controllerOtherRoom = new RoomPosition(constants.OTHER_CONTROLLER.X, constants.OTHER_CONTROLLER.Y, constants.ROOM.RIGHT);

module.exports = {
    run: function(creep){
        if(creep.pos.isEqualTo(controllerOtherRoom)){
            var controller = creep.room.controller;
            if(!controller.my){
                creep.claimController(controller);
            }else{
                Memory.rooms = 2;
            }
        }else{
            creep.moveTo(controllerOtherRoom);
        }
    }
};