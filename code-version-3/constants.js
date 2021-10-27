module.exports = Object.freeze({
    ROLE:{
        MINER: 1,
        CARRIER: 2,
        UPGRADER: 3,
        BUILDER: 4,
        SOLDIER: 5,
        HERO: 6
    },
    MAX:{
        MINER: 3,
        CARRIER: {
            TYPE1: 2,
            TYPE2: 5,
            TYPE3: 2
        },
        UPGRADER: 3,
        BUILDER: 2,
        SOLDIER: 2
    },
    ID:{
        SPAWN:'6173664ccfad2826f0d140ee',
        ENERGY_SRC1: '59f1a04182100e1594f366ad',
        ENERGY_SRC2: '59f1a04182100e1594f366ae',
        ENERGY_SRC3: '59f1a04f82100e1594f36836',
        CONTAINER: '6174abcfb44c57192962c9a7'
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
    TICKS_CLOSER_DEATH: 100,
    SPAWN_NAME: 'BiaginiSpawn',
    WAIT_COORDINATES:{
        MINER:{
            X: 24,
            Y: 38
        },
        CARRIER:{
            X:22,
            Y:40
        },
        UPGRADER:{
            X:24,
            Y:26
        },BUILDER:{
            X:35,
            Y:30
        }
    },
    DEFAULT_SPAWN:3
});