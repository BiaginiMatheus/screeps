# screeps
Code used in the game Screeps as a challenge for the German company, Fleetster. The challenge was to reach level 4 with a good strategy and code.

## Code Version 0

Strategy: One creep stays still on a fixed spot, close to the spawner (harvester) and when he is a low life, another harvester will spawn to replace him. 
The remaining creeps (builder and upgrader), will withdraw energy from a container, while the miner will refill it.

Problems: 

````
-Only one creep can access the spawn and the source at a time.
-If the harvester dies, evertbody dies.
````
Advantages:
````
-Simpler
-More creeps working
````

## Code version 1
    
Strategy: Bigger creeps making use of one extension.
Miners will mine both energies sources in the room and carry them to the container, while all other creeps, including harvester, will use energy from there.
If the container is empty, they will harvest directly from the source.
Was added some checking for a maximum of 5 creeps close to the sources, because they were getting stuck and blocking each other.

Problem:
````
-Slow solution to upgrade the room controller.
-Too many creeps "waiting"
```` 

Advantages:
````
-Use of bigger creeps
-Completely stable, running for more than 24h without problems or interfering
````

## Code version 2
Strategy: Almost the same as the code version 0, but with some improvements.
One harvester while is waiting, keeps refilling the extension with energy from the container, but when the main harvester is low, he takes over and goes to his place.

Problem:
````
-Only one creep can access the spawn and the source at a time.
-Using only small creeps, even though the room has one extension
-Sometimes it needed interference or it would take much time to respawn a harvester.
```` 

Advantages:
````
-Faster
-Almost as stable as version 1
````