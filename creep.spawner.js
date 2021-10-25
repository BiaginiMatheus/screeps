const constants = require('constants')

module.exports = {
    run: function(){

        var harvesters = _.sum(Game.creeps, (creep) => creep.memory.role == constants.ROLE.HARVESTER);
        var miners = _.sum(Game.creeps, (creep) => creep.memory.role == constants.ROLE.MINER);
        var upgraders = _.sum(Game.creeps, (creep) => creep.memory.role == constants.ROLE.UPGRADER);
        var builders = _.sum(Game.creeps, (creep) => creep.memory.role == constants.ROLE.BUILDER);
        var soldiers = _.sum(Game.creeps, (creep) => creep.memory.role == constants.ROLE.SOLDIER);
        
        console.log("Harvesters: "+harvesters+'\n'+
                    "Miners: "+miners+'\n'+
                    "Upgraders: "+upgraders+'\n'+
                    "Builders: "+builders+'\n');
        var hostiles = Game.rooms[constants.ROOM.MINE].find(FIND_HOSTILE_CREEPS);
        if(hostiles.length>0 && soldiers<constants.MAX.SOLDIER){
            name= 'soldier_'+Game.time;
            if(soldiers==0){
                Game.spawns[constants.SPAWN_NAME].createCreep([TOUGH, MOVE, MOVE, ATTACK], name,{role:constants.ROLE.SOLDIER});
            }else{
                Game.spawns[constants.SPAWN_NAME].createCreep([TOUGH,TOUGH, TOUGH, TOUGH, ATTACK, ATTACK, MOVE, MOVE, MOVE], name,{role:constants.ROLE.SOLDIER});   
            }
        }
        if(miners < constants.MAX.MINER){
            name = 'miner_' + Game.time;
            Game.spawns[constants.SPAWN_NAME].createCreep([WORK, CARRY, CARRY, MOVE, MOVE, MOVE], name,{role:constants.ROLE.MINER});
        }else if(harvesters < constants.MAX.HARVESTER){
           name = 'harvester_' + Game.time;
           Game.spawns[constants.SPAWN_NAME].createCreep([WORK,CARRY, CARRY, MOVE, MOVE, MOVE], name,{role:constants.ROLE.HARVESTER});
        }else if(upgraders < constants.MAX.UPGRADER){
            name = 'upgrader_' + Game.time;
            Game.spawns[constants.SPAWN_NAME].createCreep([WORK, CARRY, CARRY, MOVE, MOVE, MOVE], name,{role:constants.ROLE.UPGRADER});
        }else if(builders < constants.MAX.BUILDER){
            name = 'builder_' + Game.time;
            Game.spawns[constants.SPAWN_NAME].createCreep([WORK, CARRY, CARRY, MOVE, MOVE, MOVE], name,{role:constants.ROLE.BUILDER});
        }else{
            name = 'default_'+constants.DEFAULT_SPAWN+'_'+ Game.time;
            Game.spawns[constants.SPAWN_NAME].createCreep([WORK, CARRY, CARRY, MOVE, MOVE, MOVE], name,{role:constants.DEFAULT_SPAWN});
        }
    }
};