const constants = require('constants');

module.exports = {
    run: function(creep) {
        if(creep.store.energy == creep.store.getCapacity()){
            creep.memory.working=true;    
        }
        if(creep.store.energy==0){
            creep.memory.working = false;
        }
        if(!(creep.memory.working) && creep.store.getFreeCapacity() > 0) {
            var containers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER);
                }
            })
            var src = creep.pos.findClosestByPath(containers)
            if(containers[0].store[RESOURCE_ENERGY] < creep.store.getCapacity()){
                console.log('Creep '+creep.name+' is waiting for energy on the container');
                var code = creep.moveTo(constants.WAIT_COORDINATES.X, constants.WAIT_COORDINATES.Y, {visualizePathStyle: {stroke: '#00ffff'}});
                if(code!=0){
                    console.log('Creep not moving, error code: '+code);
                }
            }else if(creep.withdraw(src, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                var code = creep.moveTo(src);
                if(code!=0){
                    console.log('Creep not moving, error code: '+code);
                }
            }
        }else if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            var code = creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ff0000'}});
            if(code!=0){
                console.log('Creep not moving, error code: '+code);
            }
        }
    }
};