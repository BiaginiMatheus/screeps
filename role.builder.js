module.exports = {
    run: function(creep){
        if(creep.store.energy == creep.store.getCapacity()){
            creep.memory.working=true;    
        }
        if(creep.store.energy==0){
            creep.memory.working = false;
        }
        if(!(creep.memory.working) && creep.store.getFreeCapacity() > 0) {
            var containers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER) && (structure.store[RESOURCE_ENERGY] > 0);
                }
            })
            var src = creep.pos.findClosestByPath(containers)
            if(creep.withdraw(src, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(src);
            }
        }else{
            var containersNeedingRepair = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER) && ((structure.hitsMax-structure.hits)!=0);
                }
            })
            if(containersNeedingRepair.length && creep.repair(containersNeedingRepair[0]) == ERR_NOT_IN_RANGE){
                creep.moveTo(containersNeedingRepair[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }else{
                var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                if(targets.length) {
                    if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }   
            }
        }
    }
};