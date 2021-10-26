const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleMiner = require('role.miner');
const roleBuilder = require('role.builder');

const spawner = require('creep.spawner');

const constants = require('constants')


module.exports.loop = function () {
    var lessLife = [1500, 'none'];
    for(let name in Game.creeps) {
        var creep = Game.creeps[name];
        switch(creep.memory.role){
            case constants.ROLE.HARVESTER:
                roleHarvester.run(creep);
                break;
            case constants.ROLE.MINER:
                roleMiner.run(creep);
                break;
            case constants.ROLE.UPGRADER:
                 roleUpgrader.run(creep);
                break;
            case constants.ROLE.BUILDER:
                roleBuilder.run(creep);
                break;
            case constants.ROLE.SOLDIER:
                roleMiner.run(creep);
                break;
            case constants.ROLE.HEALER:
                roleMiner.run(creep);
                break;
            default:
                console.log("Creep "+creep.name+" not working, role: "+creep.memory.role);
        }
        if(lessLife[0]>creep.ticksToLive){
            lessLife[0]=creep.ticksToLive;
            lessLife[1]=name;
        }
    }
    if(!creep){
        Game.spawns[constants.SPAWN_NAME].createCreep([WORK, CARRY, MOVE, MOVE], 'the-choosen-one',{role:1});
    }else{
        spawner.run();
        var containers = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER);
            }
        })
        containers.forEach(container => console.log('Container capacity: '+container.store[RESOURCE_ENERGY]));
        console.log('Creep '+lessLife[1]+' is the closer to death, with '+lessLife[0]+' ticks remaining');
        console.log('Room controller at '+(100*Game.rooms[constants.ROOM.MINE].controller.progress/(135000))+'% to the next level');
        console.log('=====================================================================================');
    }
}