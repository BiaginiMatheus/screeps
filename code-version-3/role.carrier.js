const constants = require('constants');
const utils = require('creep.utils');
const roleUpgrader = require('role.upgrader');

const resPos1 = new RoomPosition(constants.POS_RES.SRC1.X, constants.POS_RES.SRC1.Y, constants.ROOM.MINE);
const resPos2 = new RoomPosition(constants.POS_RES.SRC2.X, constants.POS_RES.SRC2.Y, constants.ROOM.MINE);
const resPos3 = new RoomPosition(constants.POS_RES.SRC3.X, constants.POS_RES.SRC3.Y, constants.ROOM.RIGHT);

const minePos1 = new RoomPosition(constants.POS_MINE.SRC1.X, constants.POS_MINE.SRC1.Y, constants.ROOM.MINE);
const minePos2 = new RoomPosition(constants.POS_MINE.SRC2.X, constants.POS_MINE.SRC2.Y, constants.ROOM.MINE);
const minePos3 = new RoomPosition(constants.POS_MINE.SRC3.X, constants.POS_MINE.SRC3.Y, constants.ROOM.RIGHT);

const waitPos = new RoomPosition(constants.WAIT_COORDINATES.MINER.X, constants.WAIT_COORDINATES.MINER.Y, constants.ROOM.MINE);

const spawn = Game.spawns[constants.SPAWN_NAME];

function canAssign(creeps, i){
    switch(i){
        case 0:
            if(creeps<constants.MAX.CARRIER.TYPE1){
                return true;
            }
            break;
        case 1:
            if(creeps<constants.MAX.CARRIER.TYPE2){
                return true;
            }  
            break;
        case 2:
            if(creeps<constants.MAX.CARRIER.TYPE3){
                return true;
            }  
            break;
        default:
            return false;
    }
}

function failsafe(creep){
    var miners = _.sum(Game.creeps, (creep) => creep.memory.role == constants.ROLE.MINER);
    if(miners==0){
        var containers = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER &&
                        structure.store[RESOURCE_ENERGY]>0);
            }
        })
        if(containers!=null && creep.withdraw(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            var code = creep.moveTo(containers[0]);
        }
    }
}

module.exports = {
    run: function(creep){
        if(creep.memory.pos==undefined){ 
            let sameCreep
            for(var i=0;i<3;i++){
                var creepsWithPosition = _.sum(Game.creeps, (c) => (c.memory.role == constants.ROLE.CARRIER) &&
                                                c.memory.pos!=undefined && c.memory.pos==i);
                if(canAssign(creepsWithPosition, i)){
                    console.log('New harvester type '+i+' assigned');
                    creep.memory.pos=i;   
                    return;
                }
            }
            creep.moveTo()
            console.log("Creep "+creep.name+" is waiting for somewhere to harvest");
            return;
        }
        creep = utils.isWorking(creep);
        var containers = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER) && (structure.store[RESOURCE_ENERGY] < structure.storeCapacity);
            }
        });
        var spawnAndExtensions = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });
        const mining =[[resPos1, spawnAndExtensions], [resPos2, containers], [minePos3, containers]];
        if(!creep.memory.working && utils.freePathToSpawn(creep)){
            var dropped = creep.room.find(FIND_DROPPED_RESOURCES,{
                filter: (resource) => {
                    return (resource.pos.isEqualTo(mining[creep.memory.pos][0]));
                }
            });
            if(dropped!=null && dropped.length>0) {
                if(creep.pickup(dropped[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(mining[creep.memory.pos][0], {visualizePathStyle: {stroke: '#ffff00'}});
                }
            }else if((dropped==null || dropped.length==0) && creep.memory.pos==2){
                console.log('Creep '+creep.name+' is going to grab ressources on the other room')
                if(utils.freePathToSpawn(creep)){
                    creep.moveTo(mining[creep.memory.pos][0])
                }
            }else{
               var dropped = creep.room.find(FIND_DROPPED_RESOURCES);
                if(dropped!=null && dropped.length>0 && creep.pickup(dropped[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(dropped[0], {visualizePathStyle: {stroke: '#aaff00'}});
                }else{
                    failsafe(creep);
                    if(creep.pos.isEqualTo(minePos1) || creep.pos.isEqualTo(minePos1)){
                        creep.moveTo(resPos2)
                    }
                }
            }
        }else if(creep.transfer((mining[creep.memory.pos][1])[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
            creep.moveTo((mining[creep.memory.pos][1])[0]);
        }else{
            if(creep.room.name==constants.ROOM.RIGHT){
                creep.moveTo(waitPos)
            }else{
                console.log('Something went werong with'+creep.name);
            }
        }
    }
};