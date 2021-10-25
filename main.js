const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleMiner = require('role.miner');
const roleBuilder = require('role.builder');

const spawner = require('creep.spawner');

const constants = require('constants')


module.exports.loop = function () {
    
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
    }
    spawner.run();
}