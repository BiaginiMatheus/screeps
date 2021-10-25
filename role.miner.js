const constants = require('constants');
const utils = require('creep.utils');

module.exports = {
    run: function(creep){
        const source2 = Game.getObjectById(constants.ID.ENERGY_SRC2);
        
        var containers = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER) && (structure.store[RESOURCE_ENERGY] < structure.storeCapacity);
            }
        })
        var containersNeedingRepair = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER) && ((structure.hitsMax-structure.hits) !=0 );
            }
        })
        if(creep.store.energy == creep.store.getCapacity()){
            creep.memory.working=true;    
        }
        if(creep.store.energy==0){
            creep.memory.working = false;
        }
        if(!(creep.memory.working) && creep.store.getFreeCapacity() > 0) {
            if(creep.harvest(source2) == ERR_NOT_IN_RANGE) {
                if(utils.canGoRestrictedArea()){
                    creep.moveTo(source2)
                }else{
                    utils.freePassage();
                }
                
            }
        }else if(containers.length > 0 && ((containers[0].hitsMax-containers[0].hits)!=0 && 
            creep.store.getFreeCapacity()>(creep.store.getCapacity/2) && 
            creep.repair(containers[0]) == ERR_NOT_IN_RANGE) ||
            creep.transfer(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(containers[0], {visualizePathStyle: {stroke: '#ffff00'}});
        }else if(containers.length < 0){
            var containersNeedingRepair = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER) && ((structure.hitsMax-structure.hits) !=0 );
                }
            })
            if(containersNeedingRepair.length>0 && creep.repair(containers[0]) == ERR_NOT_IN_RANGE){
                creep.moveTo(containers[0], {visualizePathStyle: {stroke: '#ffff00'}});
            }
        }else{
            creep.moveTo(constants.WAIT_COORDINATES.X, constants.WAIT_COORDINATES.Y, {visualizePathStyle: {stroke: '#00ffff'}});
        }
    }

};