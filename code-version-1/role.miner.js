const constants = require('constants');
const utils = require('creep.utils');

module.exports = {
    run: function(creep){
        var containers = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER) && (structure.store[RESOURCE_ENERGY] < structure.storeCapacity);
            }
        })
        if(creep.store.energy == creep.store.getCapacity()){
            creep.memory.working=true;    
        }
        if(creep.store.energy==0){
            creep.memory.working = false;
        }
        if(!(creep.memory.working) && creep.store.getFreeCapacity() > 0) {
            var sources = creep.pos.findClosestByRange(FIND_SOURCES);
            if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                if(utils.canGoRestrictedArea()){
                    creep.moveTo(sources)
                }else{
                    utils.freePassage();
                }
            }
        }else if(creep.store.getFreeCapacity() == 0 && containers.length > 0 && creep.transfer(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(containers[0], {visualizePathStyle: {stroke: '#ffff00'}});
        }
    }

};