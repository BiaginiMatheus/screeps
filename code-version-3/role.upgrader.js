const constants = require('constants');
const utils = require('creep.utils');

const waitPos = new RoomPosition(constants.WAIT_COORDINATES.UPGRADER.X, constants.WAIT_COORDINATES.UPGRADER.Y, constants.ROOM.MINE);

module.exports = {
    run: function(creep) {
        creep = utils.isWorking(creep);
        if(!(creep.memory.working) && creep.store.getFreeCapacity() > 0) {
            var containers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER);
                }
            })
            var src = creep.pos.findClosestByPath(containers)
            if(creep.withdraw(src, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                var code = creep.moveTo(src);
            }else{
                if(creep.pos.y>=Game.getObjectById(constants.ID.CONTAINER).pos.y){
                    creep.moveTo(waitPos);
                }
            }
        }else if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            var code = creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ff0000'}});
        }else{
        }
    }
};