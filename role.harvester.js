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
            creep.moveTo(constants.WAIT_POSITION.X, constants.WAIT_POSITION.Y);
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