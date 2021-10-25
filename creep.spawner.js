const constants = require('constants')

module.exports = {
    run: function(){

        var harvesters = _.sum(Game.creeps, (creep) => creep.memory.role == constants.ROLE.HARVESTER);
        var miners = _.sum(Game.creeps, (creep) => creep.memory.role == constants.ROLE.MINER);
        var upgraders = _.sum(Game.creeps, (creep) => creep.memory.role == constants.ROLE.UPGRADER);
        var builders = _.sum(Game.creeps, (creep) => creep.memory.role == constants.ROLE.BUILDER);
        
        console.log("Harvesters: "+harvesters+'\n'+
                    "Miners: "+miners+'\n'+
                    "Upgraders: "+upgraders+'\n'+
                    "Builders: "+builders+'\n');
        
        if(miners < constants.MAX.MINER){
            name = 'miner_' + Game.time;
            var code = Game.spawns[constants.SPAWN_NAME].createCreep([WORK, CARRY, CARRY, MOVE, MOVE, MOVE], name,{role:constants.ROLE.MINER});
        }else if(harvesters < constants.MAX.HARVESTER){
           name = 'harvester_' + Game.time;
           Game.spawns[constants.SPAWN_NAME].createCreep([WORK, CARRY, CARRY, MOVE, MOVE, MOVE], name,{role:constants.ROLE.HARVESTER});
        }else if(upgraders < constants.MAX.UPGRADER){
            name = 'upgrader_' + Game.time;
            Game.spawns[constants.SPAWN_NAME].createCreep([WORK, CARRY, CARRY, CARRY, MOVE, MOVE], name,{role:constants.ROLE.UPGRADER});
        }else if(builders < constants.MAX.BUILDER){
            name = 'builder_' + Game.time;
            Game.spawns[constants.SPAWN_NAME].createCreep([WORK, CARRY, CARRY, MOVE, MOVE, MOVE], name,{role:constants.ROLE.BUILDER});
        }else{
            name = 'default_'+constants.DEFAULT+'_'+ Game.time;
            Game.spawns[constants.SPAWN_NAME].createCreep([WORK, CARRY, CARRY, MOVE, MOVE, MOVE], name,{role:constants.DEFAULT});
        }
    }
};