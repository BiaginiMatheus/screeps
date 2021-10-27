const constants = require('constants')

const minePos1 = new RoomPosition(constants.POS_MINE.SRC1.X, constants.POS_MINE.SRC1.Y, constants.ROOM.MINE);
const minePos2 = new RoomPosition(constants.POS_MINE.SRC2.X, constants.POS_MINE.SRC2.Y, constants.ROOM.MINE);

const waitPos = new RoomPosition(constants.WAIT_COORDINATES.CARRIER.X, constants.WAIT_COORDINATES.CARRIER.Y, constants.ROOM.MINE);

module.exports.freePathToSpawn = (creep) => {
    var miners = _.sum(Game.creeps, (creep) => creep.memory.role==constants.ROLE.MINER);
    var minersMining = _.sum(Game.creeps, (creep) => (creep.memory.role==constants.ROLE.MINER && 
                                                    (creep.pos.isEqualTo(minePos1) || creep.pos.isEqualTo(minePos2))));
    if(isAtSpawnZone(creep) && 
        ((minersMining<2 && miners>constants.MAX.MINER) || 
        Game.spawns[constants.SPAWN_NAME].spawning)){
        creep.moveTo(waitPos);
        return false;
    }
    return true;
};

function isAtSpawnZone(creep){
    return (creep.pos.x>Game.spawns[constants.SPAWN_NAME].pos.x-1 &&
            creep.pos.x<Game.spawns[constants.SPAWN_NAME].pos.x+8 &&
            creep.pos.y>Game.spawns[constants.SPAWN_NAME].pos.y-1 &&
            creep.pos.y<Game.spawns[constants.SPAWN_NAME].pos.y+3)
    
}

module.exports.isWorking = (creep) => {
    if(creep.store.energy == creep.store.getCapacity()){
        creep.memory.working=true;    
    }
    if(creep.store.energy==0){
        creep.memory.working = false;
    }
    return creep;
};