module.exports = Object.freeze({
    ROLE:{
        MINER: 1,
        CARRIER: 2,
        UPGRADER: 3,
        BUILDER: 4,
        SOLDIER: 5,
        RECHARGER: 6,
        HERO: 7,
        CONQUEROR:8
    },
    MAX:{
        MINER: 3,
        CARRIER: {
            TYPE1: 3,
            TYPE2: 4,
            TYPE3: 3
        },
        UPGRADER: 6,
        BUILDER: 4,
        SOLDIER: 2,
        RECHARGER: 2,
        TOTAL: 35
    },
    ID:{
        SPAWN:'6173664ccfad2826f0d140ee',
        ENERGY_SRC1: '59f1a04182100e1594f366ad',
        ENERGY_SRC2: '59f1a04182100e1594f366ae',
        ENERGY_SRC3: '59f1a04f82100e1594f36836',
        CONTAINER: '6174abcfb44c57192962c9a7'
    },
    OTHER_CONTROLLER:{
        X:17,
        Y:23
    },
    POS_MINE:{
        SRC1:{
            X:23,
            Y:36
        },
        SRC2:{
            X:24,
            Y:36
        },SRC3:{
            X:5,
            Y:25
        }
    },POS_RES:{
        SRC1:{
            X:22,
            Y:37
        },
        SRC2:{
            X:25,
            Y:37
        },SRC3:{
            X:5,
            Y:26
        }
    },
    ROOM:{
        MINE:'W43N37',
        RIGHT:'W42N37'
    },
    TICKS_CLOSER_DEATH: 50,
    SPAWN_NAME: 'BiaginiSpawn',
    WAIT_COORDINATES:{
        MINER:{
            X: 24,
            Y: 38
        },
        CARRIER:{
            X:25,
            Y:41
        },
        UPGRADER:{
            X:24,
            Y:26
        },BUILDER:{
            X:35,
            Y:30
        }
    },
    MAX_PROX_SPAWN: 5,
    DEFAULT_SPAWN:3
});