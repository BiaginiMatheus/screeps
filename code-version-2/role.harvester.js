const constants = require('constants')

const posNextSpawn = new RoomPosition(constants.POS_CLOSER_SPAWN.X,
                                          constants.POS_CLOSER_SPAWN.Y,
                                          constants.ROOM.MINE);

module.exports = {
    
    run: function(creep) {
        var creepAtSpawn;
       
       for(var name in Game.creeps){
          if(Game.creeps[name].pos.isEqualTo(posNextSpawn)){
            creepAtSpawn=Game.creeps[name];
          }
       }
        
        if(creepAtSpawn && 
            creepAtSpawn.memory.role==constants.ROLE.HARVESTER &&
            creep.name!=creepAtSpawn.name &&
            creepAtSpawn.ticksToLive > constants.TICKS_CLOSER_DEATH)
        {
            var containers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 50);
                }
            })
            if(creep.store.energy != creep.store.getCapacity() && containers.length>0 && creep.withdraw(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(containers[0]);
            }else if(creep.store.energy == creep.store.getCapacity()){
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION) &&
                            (structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
                    }
                });
                if(targets.length > 0) {
                    if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#0000FF'}});
                    }
                }
            }
        }else if(creepAtSpawn && creep.name==creepAtSpawn.name){
            if(creep.store.getFreeCapacity() > 0) {
                var source1 = Game.getObjectById(constants.ID.ENERGY_SRC1);
                creep.harvest(source1);
            }
            else {
               creep.transfer(Game.spawns[constants.SPAWN_NAME], RESOURCE_ENERGY);
            }
        }else{
            creep.moveTo(posNextSpawn);
        }
    }
};