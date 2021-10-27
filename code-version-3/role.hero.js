const constants = require('constants')
const utils = require('creep.utils');

module.exports = {
    
    run: function(creep) {
        var harvesters = _.sum(Game.creeps, (creep) => creep.memory.role == constants.ROLE.HARVESTER);
        if(harvesters>0){
            creep.memory.role=constants.ROLE.MINER;
        }
        if(creep.store.getFreeCapacity() > 0) {
            var src = Game.getObjectById(constants.ID.ENERGY_SRC1)
            if(creep.harvest(src) == ERR_NOT_IN_RANGE){
                creep.moveTo(src);
            }
        }
        else{
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            }); 
           var code = creep.transfer(targets[0], RESOURCE_ENERGY);
           if(code==ERR_NOT_IN_RANGE){
               creep.moveTo(targets[0]);
           }
           if(code==ERR_FULL){
               creep.drop(RESOURCE_ENERGY);
           }
        }
    }
};