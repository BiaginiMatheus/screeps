module.exports = {
    run:function(creep){
        var hostile = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
        if(hostile && creep.attack(hostile)==ERR_NOT_IN_RANGE){
            creep.moveTo(hostile, {visualizePathStyle: {stroke: '#00FF00'}});
        }else{
            var walls = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return ((structure.structureType == STRUCTURE_WALL) && structure.owner!='fleetster_11');
                }
            });
            if(creep.attack(walls) == ERR_NOT_IN_RANGE){
                creep.moveTo(walls, {visualizePathStyle: {stroke: '#ff0000'}});
            }else{
                creep.say('I am 🚧')
            }
            if(!walls){
                const posNextSpawn = new RoomPosition(constants.POS_CLOSER_SPAWN.X,
                                          constants.POS_CLOSER_SPAWN.Y,
                                          constants.ROOM.MINE);
            }
        }
    }
};