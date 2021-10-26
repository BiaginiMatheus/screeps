const constants = require('constants')

module.exports.canGoRestrictedArea = () => {
        var count=0;
        var isAtSrc=false;
        for(let name in Game.creeps){
            if(Game.creeps[name].pos.x==constants.RESTRICTED_AREA.X_SRC && Game.creeps[name].pos.y==constants.RESTRICTED_AREA.Y_SRC){
                isAtSrc=true;;
            }
            for(let i=constants.RESTRICTED_AREA.X1; i<constants.RESTRICTED_AREA.X2; i++){
                for(let j=constants.RESTRICTED_AREA.Y1; j<constants.RESTRICTED_AREA.Y2; j++){
                    if(Game.creeps[name].pos.x==i && Game.creeps[name].pos.y==j){
                        count++;
                    }
                }
            }   
        }
        if(isAtSrc && count>constants.RESTRICTED_AREA.LIMIT){
            console.log('Creeps with restriction can\'t move right now');
            return false;
        }else{
            return true;
        }
};

module.exports.freePassage = () => {
    var count=0;
    for(let name in Game.creeps){
        if(Game.creeps[name].pos.x==constants.EXIT_PATH.X1 && Game.creeps[name].pos.y==constants.EXIT_PATH.Y1){
            Game.creeps[name].moveTo(constants.EXIT_PATH.FREE_X1, constants.EXIT_PATH.FREE_Y1);
        }else if(Game.creeps[name].pos.x==constants.EXIT_PATH.X2 && Game.creeps[name].pos.y==constants.EXIT_PATH.Y2){
            Game.creeps[name].moveTo(constants.EXIT_PATH.FREE_X2, constants.EXIT_PATH.FREE_Y2);
        }
    }
};