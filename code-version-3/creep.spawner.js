const constants = require('constants')

function callHero(carriers){
    if(carriers==0){
        name = 'carrier_' + Game.time;
        Game.spawns[constants.SPAWN_NAME].createCreep([MOVE, CARRY, MOVE, CARRY, MOVE, CARRY], name,{role:constants.ROLE.CARRIER});
    }else{
        name=='hero';
        Game.spawns[constants.SPAWN_NAME].createCreep([WORK, WORK, CARRY, MOVE], name,{role:constants.ROLE.HERO});
    }
}

function calculateProgress(){
    var extensions = Game.rooms[constants.ROOM.MINE].find(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.structureType == STRUCTURE_EXTENSION;
        }
    });
    var totalEnergy=_.sum(extensions,(e) => e.store[RESOURCE_ENERGY])+Game.spawns[constants.SPAWN_NAME].store[RESOURCE_ENERGY];
    var totalCapacity=_.sum(extensions,(e) => e.store.getCapacity(RESOURCE_ENERGY))+Game.spawns[constants.SPAWN_NAME].store.getCapacity(RESOURCE_ENERGY);
    
    return ((totalEnergy/totalCapacity)*100).toFixed(2);
}

function logCarriers(){
    var creepType='';
    for(i=0;i<3;i++){
        creepType+= '\tCarrier type '+i+': '+_.sum(Game.creeps, (creep) => (creep.memory.role == constants.ROLE.CARRIER && creep.memory.pos == i))+'\n';
    }
    return creepType;
}

module.exports = {
    run: function(){
        var minersAlive = _.sum(Game.creeps, (creep) => (creep.memory.role == constants.ROLE.MINER &&
                                    creep.ticksToLive > constants.TICKS_CLOSER_DEATH));
        var carriers = _.sum(Game.creeps, (creep) => creep.memory.role == constants.ROLE.CARRIER);
        var rechargers = _.sum(Game.creeps, (creep) => creep.memory.role == constants.ROLE.RECHARGER);
        var miners = _.sum(Game.creeps, (creep) => creep.memory.role == constants.ROLE.MINER);
        var builders = _.sum(Game.creeps, (creep) => creep.memory.role == constants.ROLE.BUILDER);
        var upgraders = _.sum(Game.creeps, (creep) => creep.memory.role == constants.ROLE.UPGRADER);
        
        console.log("Carriers: "+carriers+'\n'+logCarriers()+
                    "Miners: "+miners+'\n'+
                    "Upgraders: "+upgraders+'\n'+
                    "Builders: "+builders+'\n'+
                    "Rechargers: "+rechargers+'\n');
        var hostiles = Game.rooms[constants.ROOM.MINE].find(FIND_HOSTILE_CREEPS);
        var containers = Game.rooms[constants.ROOM.MINE].find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER);
            }
        })
        if(hostiles.length>0 && soldiers<constants.MAX.SOLDIER){
            name= 'soldier_'+Game.time;
            if(soldiers==0){
                Game.spawns[constants.SPAWN_NAME].createCreep([TOUGH, MOVE, MOVE, ATTACK], name,{role:constants.ROLE.SOLDIER});
                return;
            }else{
                Game.spawns[constants.SPAWN_NAME].createCreep([TOUGH,TOUGH, TOUGH, TOUGH, ATTACK, ATTACK, MOVE, MOVE, MOVE], name,{role:constants.ROLE.SOLDIER}); 
                return;
            }
        }
        if(carriers<1 || minersAlive < 1){
            callHero(carriers);
            return;
        }
        if(minersAlive < constants.MAX.MINER){
            name = 'miner_' + Game.time;
            var code = Game.spawns[constants.SPAWN_NAME].createCreep([WORK, WORK, WORK, WORK, MOVE], name,{role:constants.ROLE.MINER});
            if(code==ERR_NOT_ENOUGH_ENERGY){
                var progress = calculateProgress();
                console.log('Spawning a new miner, error code: '+code+' progress: '+progress+'%');
            }
        }else if(carriers < (constants.MAX.CARRIER.TYPE1+constants.MAX.CARRIER.TYPE2+constants.MAX.CARRIER.TYPE3)){
            name = 'carrier_' + Game.time;
            var code = Game.spawns[constants.SPAWN_NAME].createCreep([MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY], name,{role:constants.ROLE.CARRIER});
            if(code==ERR_NOT_ENOUGH_ENERGY){
                var progress = calculateProgress();
                console.log('Spawning a new carrier, error code: '+code+' progress: '+progress+'%');
            }
        }else if(rechargers < constants.MAX.RECHARGER){
            name = 'recharger_' + Game.time;
            var code = Game.spawns[constants.SPAWN_NAME].createCreep([MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY], name,{role:constants.ROLE.RECHARGER});
            if(code==ERR_NOT_ENOUGH_ENERGY){
                var progress = calculateProgress();
                console.log('Spawning a new recharger, error code: '+code+' progress: '+progress+'%');
            }
        }else if(builders!=0 && upgraders< constants.MAX.UPGRADER){
            name = 'upgrader_' + Game.time;
            var code = Game.spawns[constants.SPAWN_NAME].createCreep([MOVE, CARRY, MOVE, CARRY, WORK, MOVE, CARRY, WORK, MOVE], name,{role:constants.ROLE.UPGRADER});
            if(code==ERR_NOT_ENOUGH_ENERGY){
                var progress = calculateProgress();
                console.log('Spawning a new upgrader, error code: '+code+' progress: '+progress+'%');
            }
        }else if(builders<constants.MAX.BUILDER){
            name = 'builder_' + Game.time;
            var code = Game.spawns[constants.SPAWN_NAME].createCreep([MOVE, CARRY, MOVE, CARRY, WORK, MOVE, CARRY, WORK, MOVE], name,{role:constants.ROLE.BUILDER});
            if(code==ERR_NOT_ENOUGH_ENERGY){
                var progress = calculateProgress();
                console.log('Spawning a new builder, error code: '+code+' progress: '+progress+'%');
            }
        }else{
            var fillingContainers = _.sum(containers, (container) => container.store[RESOURCE_ENERGY]>(container.store.getCapacity()/3));
            if(fillingContainers>0){
                name = 'default_' + constants.DEFAULT_SPAWN +"_"+Game.time;
                Game.spawns[constants.SPAWN_NAME].createCreep([MOVE, CARRY, MOVE, CARRY, WORK, MOVE, CARRY, WORK, MOVE], name,{role:constants.DEFAULT_SPAWN});    
            }else{
                name = 'carrier_' + Game.time;
                Game.spawns[constants.SPAWN_NAME].createCreep([MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY], name,{role:constants.ROLE.CARRIER, pos:1});
            }
            
        }

    }

};