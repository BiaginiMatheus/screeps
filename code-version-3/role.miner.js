const constants = require('constants');
const utils = require('creep.utils');

const src1 = Game.getObjectById(constants.ID.ENERGY_SRC1);
const src2 = Game.getObjectById(constants.ID.ENERGY_SRC2);
const src3 = Game.getObjectById(constants.ID.ENERGY_SRC3);

const minePos1 = new RoomPosition(constants.POS_MINE.SRC1.X, constants.POS_MINE.SRC1.Y, constants.ROOM.MINE);
const minePos2 = new RoomPosition(constants.POS_MINE.SRC2.X, constants.POS_MINE.SRC2.Y, constants.ROOM.MINE);
const minePos3 = new RoomPosition(constants.POS_MINE.SRC3.X, constants.POS_MINE.SRC3.Y, constants.ROOM.RIGHT);

const waitPos = new RoomPosition(constants.WAIT_COORDINATES.MINER.X, constants.WAIT_COORDINATES.MINER.Y, constants.ROOM.MINE);

module.exports = {
    run: function(creep){
        if(creep.memory.pos==undefined){ 
            for(var i=0;i<3;i++){
                var creepsWithPosition = _.sum(Game.creeps, (c) => (c.memory.role == constants.ROLE.MINER) &&
                                                c.memory.pos!=undefined && c.memory.pos==i);
                if(creepsWithPosition<Math.floor(constants.MAX.MINER/3)){
                    creep.memory.pos=i;
                    return;
                }
            }
            creep.moveTo(waitPos)
            console.log("Creep "+creep.name+" is waiting for somewhere to mine");
            return;
        }
        const mining = [[minePos1, src1],[minePos2, src2],[minePos3, src3]];
        if(creep.harvest(mining[creep.memory.pos][1]) == ERR_NOT_IN_RANGE ||
            creep.pos.isEqualTo(mining[creep.memory.pos][0])) {
            creep.moveTo(mining[creep.memory.pos][0]);
        }else if(creep.harvest(mining[creep.memory.pos][1]==ERR_INVALID_TARGET)){
            creep.moveTo(mining[creep.memory.pos][0]);
        }
    }
};