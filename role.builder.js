const constants = require('constants')

module.exports = {
    run: function(creep){
        if(creep.store.energy == creep.store.getCapacity()){
            creep.memory.working=true;    
        }
        if(creep.store.energy==0){
            creep.memory.working = false;
        }
        if(!(creep.memory.working) && creep.store.getFreeCapacity() > 0) {
            const target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
            if(target) {
            if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
                }
            }else{
                var containers = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER);
                    }
                })
                var src = creep.pos.findClosestByPath(containers)
                if(containers[0].store[RESOURCE_ENERGY] < creep.store.getCapacity()){
                    creep.moveTo(constants.WAIT_COORDINATES.X, constants.WAIT_COORDINATES.Y, {visualizePathStyle: {stroke: '#00ffff'}});
                    console.log('Creep '+creep.name+' is waiting for energy on the container');
                }else if(creep.withdraw(src, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(src);
                }
            }
        }else{
            var constructionsNeedingRepair = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return ((structure.structureType == STRUCTURE_CONTAINER) || (structure.structureType == STRUCTURE_ROAD))&&
                    ((structure.hitsMax-structure.hits)!=0);
                }
            })
            if(constructionsNeedingRepair.length && creep.repair(constructionsNeedingRepair[0]) == ERR_NOT_IN_RANGE){
                creep.moveTo(constructionsNeedingRepair[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }else{
                var target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
                if(target) {
                    if(creep.build(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }   
            }
        }
    }
};