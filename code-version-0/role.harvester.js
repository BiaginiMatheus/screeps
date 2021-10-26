const constants = require('constants')
const utils = require('creep.utils');


const posNextSpawn = new RoomPosition(constants.POS_CLOSER_SPAWN.X,
                                          constants.POS_CLOSER_SPAWN.Y,
                                          constants.ROOM.MINE);

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
            if(containers[0].store[RESOURCE_ENERGY] < creep.store.getCapacity()*1.5){
                var energySrc = creep.pos.findClosestByRange(FIND_SOURCES);
                if(creep.harvest(energySrc) == ERR_NOT_IN_RANGE) {
                    if(utils.canGoRestrictedArea()){
                        var code = creep.moveTo(energySrc);
                        console.log('Creep '+creep.name+' is going to harvest from the source');
                        if(code!=0){
                            console.log('Creep not moving, error code: '+code);
                        }
                    }else{
                        utils.freePassage();
                    }
                }
            }else if(creep.withdraw(src, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                var code = creep.moveTo(src);
                if(code!=0){
                    console.log('Creep not moving, error code: '+code);
                }
            }
        }else{
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    var code = creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#0000FF'}});
                    if(code!=0){
                        console.log('Creep not moving, error code: '+code);
                    }   
                }
            }
        }
    }
};