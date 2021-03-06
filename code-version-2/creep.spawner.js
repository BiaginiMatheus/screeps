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
        if(harvesters < constants.MAX.HARVESTER){
           if(harvesters==0){
               name = 'harvester_' + Game.time;
               console.log("spawning a harvester")
               Game.spawns[constants.SPAWN_NAME].createCreep([WORK, WORK, CARRY, MOVE], name,{role:constants.ROLE.HARVESTER});
               return;
           }
           for(var name in Game.creeps){
              if(Game.creeps[name].memory.role==constants.ROLE.HARVESTER){
                var harvester=Game.creeps[name];
              }
           }
           if(harvester.ticksToLive<1000){
               console.log("spawning a 2nd harvester")
               name = 'harvester_' + Game.time;
               Game.spawns[constants.SPAWN_NAME].createCreep([WORK, WORK, CARRY, MOVE], name,{role:constants.ROLE.HARVESTER});
           }
        }
        for(let i=1; i<=constants.JOBS; i++){
             var amountCreep = _.sum(Game.creeps, (creep) => creep.memory.role == i);
             if(amountCreep == 0){
                console.log("There are no creeps with job "+i+", trying to spawnn a generic one, right now");
                var name='emergency_'+Game.time
                Game.spawns[constants.SPAWN_NAME].createCreep([WORK, CARRY, MOVE, MOVE], name,{role:i});
             }
        }
        if(miners < constants.MAX.MINER){
            name = 'miner_' + Game.time;
            var code = Game.spawns[constants.SPAWN_NAME].createCreep([WORK, CARRY, MOVE, MOVE], name,{role:constants.ROLE.MINER});
        }else if(upgraders < constants.MAX.UPGRADER){
            name = 'upgrader_' + Game.time;
            Game.spawns[constants.SPAWN_NAME].createCreep([WORK, CARRY, CARRY, MOVE], name,{role:constants.ROLE.UPGRADER});
        }else if(builders < constants.MAX.BUILDER){
            name = 'builder_' + Game.time;
            Game.spawns[constants.SPAWN_NAME].createCreep([WORK, CARRY, MOVE, MOVE], name,{role:constants.ROLE.BUILDER});
        }else{
            name = 'upgrader_' + Game.time;
            Game.spawns[constants.SPAWN_NAME].createCreep([WORK, CARRY, MOVE, MOVE], name,{role:constants.ROLE.UPGRADER});
        }
    }

};