# BobDrowss

Bob Ross brought the joy of painting to common people, those who enjoys certaint kind of oil paintings of natural landscapes, but were too shy for trying by themselves.
This is a small toy to recreate that calm and happy place of Ross's tv show.

## Functional description
An interactive site where users can paint trough easily selecting elements and modificators to put them on a canvas.
Additionally each graphical element added, also take part on a moody sountrack.
Both audio and graphic elements use premade assets, and are arranged randomly to the composition; also as "a composition", therane is an interdependency in wich a new element modifies the way previous performs. 
As a fun part, all objects includes a _happy_ version, to spice the mix.

## Available objects and their modificators
--- first version:
- objects:
    - tree
    - cloud
    - hill
- modifiers:
    - happy
    - large
    - small

--- full version:
- tree        -   piano
- land        -   bass
- hills       -   wind
- river       -   harp
- clouds      -   chimes
- cabin       -   drums
- bushes      -   tymbal


## Notes on implementation
Due this projects born as an excersice from a direct provocation from Karen Palacio at her "Looking for meaning in computational art" workshop, there are some implementation restrictions, at least for an initial version:
- ToneJS for sounds
- Direct vainilla canvas API, no p5 or anything else 

To allow interdependence between objects there are common global variables used and affected by every object, like landheight, brightness, rythm

## Change&Back log
### Version 0.1
- Basic page layout
- 3 objects x 3 mods
- Music uses 3 samplers that loads 3 mods each

### Backlog
- dynamic selectors
- A trestle background or a bob's show still
- An undo button
- A "layer" list of elements to remove them, modify them or rearranged
- A visual representation of the sound
- Maybe a FFT that animates objects/props
