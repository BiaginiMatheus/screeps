const constants = require('constants')

function callHero(carriers){
    if(carriers==0){
        name = 'carrier_' + Game.time;
        spawnCreep([MOVE, CARRY, MOVE, CARRY, MOVE, CARRY], name,{role:constants.ROLE.CARRIER});
    }else{
        name=='hero';
        spawnCreep([WORK, WORK, CARRY, MOVE], name,{role:constants.ROLE.HERO});
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

function maxSmallPieces(){
    var extensions = Game.rooms[constants.ROOM.MINE].find(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.structureType == STRUCTURE_EXTENSION;
        }
    });
    var totalCapacity=_.sum(extensions,(e) => e.store.getCapacity(RESOURCE_ENERGY))+Game.spawns[constants.SPAWN_NAME].store.getCapacity(RESOURCE_ENERGY);
   return Math.floor(totalCapacity/50);
}

function spawnWorker(name, role){
    var body=[];
    for(let i=0, parts=0;parts<=(maxSmallPieces()-2);i+=2){
        body[i]=MOVE;
        body[i+1]=CARRY;
        parts+=2;
        if(parts<(maxSmallPieces()-3)){
            body[i+2]=WORK;
            body[i+3]=MOVE;
            i+=2;   
            parts+=3;
        }
    }
    spawnCreep(body, name,{role});
}

function spawnCarrier(name, role){
    var body=[];
    for(let i=0;i<maxSmallPieces() && (i+1)<maxSmallPieces();i+=2){
        body[i]=MOVE;
        body[i+1]=CARRY;
    }
    spawnCreep(body, name,{role});
}

function spawnCarrier(name, role, pos){
    var body=[];
    for(let i=0;i<maxSmallPieces() && (i+1)<maxSmallPieces();i+=2){
        body[i]=MOVE;
        body[i+1]=CARRY;
    }
    spawnCreep(body, name, {role, pos});
}

function spawnMiner(name, role){
    var body=[];
    for(let i=0;i<maxSmallPieces()/2 && (i+1)<maxSmallPieces()/2;i++){
        body[i]=WORK;
        if((i+1)<=maxSmallPieces()/2){
            body[i+1]=MOVE;    
        }
    }
    spawnCreep(body, name,{role});
}

function spawnCreep(body, name, mem){
    var code = Game.spawns[constants.SPAWN_NAME].createCreep(body, name,mem);
    if(code==ERR_NOT_ENOUGH_ENERGY){
        var progress = calculateProgress();
        console.log('Spawning a new '+name+', progress: '+progress+'%');
    }
}

function spawnConqueror(){
    var body=[CLAIM, MOVE];
    if(Memory.rooms<2 && maxSmallPieces()>=13){
        name='Star Lord'
        spawnCreep(body, name,{role:constants.ROLE.CONQUEROR}); 
    }
}

module.exports = {
    run: function(){
        var minersAlive = _.sum(Game.creeps, (creep) => (creep.memory.role == constants.ROLE.MINER &&
                                    creep.ticksToLive > constants.TICKS_CLOSER_DEATH));
        var carriers1 = _.sum(Game.creeps, (creep) => (creep.memory.role == constants.ROLE.CARRIER && creep.memory.pos == 0))
        var carriers2 = _.sum(Game.creeps, (creep) => (creep.memory.role == constants.ROLE.CARRIER && creep.memory.pos == 1))
        var carriers3 = _.sum(Game.creeps, (creep) => (creep.memory.role == constants.ROLE.CARRIER && creep.memory.pos == 2))
        var rechargers = _.sum(Game.creeps, (creep) => creep.memory.role == constants.ROLE.RECHARGER);
        var miners = _.sum(Game.creeps, (creep) => creep.memory.role == constants.ROLE.MINER);
        var builders = _.sum(Game.creeps, (creep) => creep.memory.role == constants.ROLE.BUILDER);
        var upgraders = _.sum(Game.creeps, (creep) => creep.memory.role == constants.ROLE.UPGRADER);
        var hostiles = Game.rooms[constants.ROOM.MINE].find(FIND_HOSTILE_CREEPS);
        
        var carriers = carriers1+carriers2+carriers3;
        
        var totalCreeps = carriers+rechargers+miners+builders+upgraders;
        
        console.log("Carriers: "+carriers+'\n'+logCarriers()+
                    "Miners: "+miners+'\n'+
                    "Upgraders: "+upgraders+'\n'+
                    "Builders: "+builders+'\n'+
                    "Rechargers: "+rechargers);
                    
        var containers = Game.rooms[constants.ROOM.MINE].find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER);
            }
        })
        if(hostiles.length>0 && soldiers<constants.MAX.SOLDIER){
            console.log('Hostiles: '+hostiles);
            name= 'soldier_'+Game.time;
            if(soldiers==0){
                spawnCreep([TOUGH, MOVE, MOVE, ATTACK], name,{role:constants.ROLE.SOLDIER});
                return;
            }else{
                spawnCreep([TOUGH,TOUGH, TOUGH, TOUGH, ATTACK, ATTACK, MOVE, MOVE, MOVE], name,{role:constants.ROLE.SOLDIER}); 
                return;
            }
        }
        if(carriers1<1 || minersAlive < 1){
            callHero(carriers1);
            return;
        }
        if(minersAlive < constants.MAX.MINER){
            name = 'miner_' + Game.time;
            spawnMiner(name, constants.ROLE.MINER);
        }else if(carriers1 < constants.MAX.CARRIER.TYPE1 || carriers2 < constants.MAX.CARRIER.TYPE2 || carriers3 < constants.MAX.CARRIER.TYPE3){
            name = 'carrier_' + Game.time;
            spawnCarrier(name, constants.ROLE.CARRIER);
        }else if(rechargers < constants.MAX.RECHARGER){
            name = 'recharger_' + Game.time;
            spawnCarrier(name, constants.ROLE.RECHARGER);
        }else if(builders!=0 && upgraders< constants.MAX.UPGRADER){
            name = 'upgrader_' + Game.time;
            spawnWorker(name, constants.ROLE.UPGRADER);
        }else if(builders<constants.MAX.BUILDER){
            name = 'builder_' + Game.time;
            spawnWorker(name, constants.ROLE.BUILDER);
        }else{
            if(totalCreeps>constants.MAX.TOTAL){
                console.log('The room is full, Gallifrey falls no more');
                return;
            }
            var fillingContainers = _.sum(containers, (container) => container.store[RESOURCE_ENERGY]>(container.store.getCapacity()/4));
            if(fillingContainers>0){
                name = 'default_' + constants.DEFAULT_SPAWN +"_"+Game.time;
                spawnWorker(name, constants.DEFAULT_SPAWN);
            }else{
                name = 'carrier_' + Game.time;
                spawnCarrier(name, constants.ROLE.CARRIER, 1);
            }
        }
    }
};