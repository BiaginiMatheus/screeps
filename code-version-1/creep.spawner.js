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
         var isEmergencySpawning=false;
        if(hostiles.length>0 && soldiers<constants.MAX.SOLDIER){
            name= 'soldier_'+Game.time;
            if(soldiers==0){
                Game.spawns[constants.SPAWN_NAME].createCreep([TOUGH, MOVE, MOVE, ATTACK], name,{role:constants.ROLE.SOLDIER});
                isEmergencySpawning=true;
            }else{
                Game.spawns[constants.SPAWN_NAME].createCreep([TOUGH,TOUGH, TOUGH, TOUGH, ATTACK, ATTACK, MOVE, MOVE, MOVE], name,{role:constants.ROLE.SOLDIER}); 
                isEmergencySpawning=true;
            }
        }
        for(let i=1; i<=constants.JOBS; i++){
             var amountCreep = _.sum(Game.creeps, (creep) => creep.memory.role == i);
             if(amountCreep == 0){
                console.log("There are no creeps with job "+i+", trying to spawnn a generic one, right now: "+(Game.spawns[constants.SPAWN_NAME].store[RESOURCE_ENERGY]/Game.spawns[constants.SPAWN_NAME].store.getCapacity(RESOURCE_ENERGY))*100+'%');
                name='emergency_'+i+'_'+Game.time;
                Game.spawns[constants.SPAWN_NAME].createCreep([WORK, CARRY, CARRY, MOVE, MOVE, MOVE], name,{role:i});
                isEmergencySpawning=true;
                break;
             }
        }
        if(!isEmergencySpawning){
            if(miners < constants.MAX.MINER){
                name = 'miner_' + Game.time;
                Game.spawns[constants.SPAWN_NAME].createCreep([WORK, CARRY, CARRY, MOVE, MOVE, MOVE], name,{role:constants.ROLE.MINER});
                console.log('Trying to spawn a Miner: '+(Game.spawns[constants.SPAWN_NAME].store[RESOURCE_ENERGY]/Game.spawns[constants.SPAWN_NAME].store.getCapacity(RESOURCE_ENERGY))*100+'%');
            }else if(harvesters < constants.MAX.HARVESTER){
               name = 'harvester_' + Game.time;
               Game.spawns[constants.SPAWN_NAME].createCreep([WORK,CARRY, CARRY, MOVE, MOVE, MOVE], name,{role:constants.ROLE.HARVESTER});
               console.log('Trying to spawn a Harvester: '+(Game.spawns[constants.SPAWN_NAME].store[RESOURCE_ENERGY]/Game.spawns[constants.SPAWN_NAME].store.getCapacity(RESOURCE_ENERGY))*100+'%');
            }else if(upgraders < constants.MAX.UPGRADER){
                name = 'upgrader_' + Game.time;
                Game.spawns[constants.SPAWN_NAME].createCreep([WORK, CARRY, CARRY, MOVE, MOVE, MOVE], name,{role:constants.ROLE.UPGRADER});
                console.log('Trying to spawn a Upgrader: '+(Game.spawns[constants.SPAWN_NAME].store[RESOURCE_ENERGY]/Game.spawns[constants.SPAWN_NAME].store.getCapacity(RESOURCE_ENERGY))*100+'%');
            }else if(builders < constants.MAX.BUILDER){
                name = 'builder_' + Game.time;
                var code = Game.spawns[constants.SPAWN_NAME].createCreep([WORK, WORK, CARRY, MOVE, MOVE], name,{role:constants.ROLE.BUILDER});
                console.log('Trying to spawn a Builder: '+(Game.spawns[constants.SPAWN_NAME].store[RESOURCE_ENERGY]/Game.spawns[constants.SPAWN_NAME].store.getCapacity(RESOURCE_ENERGY))*100+'%');
            }else{
                name = 'default_'+constants.DEFAULT_SPAWN+'_'+ Game.time;
                Game.spawns[constants.SPAWN_NAME].createCreep([WORK, CARRY, CARRY, MOVE, MOVE, MOVE], name,{role:constants.DEFAULT_SPAWN});
                console.log('Trying to spawn a Default: '+(Game.spawns[constants.SPAWN_NAME].store[RESOURCE_ENERGY]/Game.spawns[constants.SPAWN_NAME].store.getCapacity(RESOURCE_ENERGY))*100+'%');
            }   
        }
    }
};