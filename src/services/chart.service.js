
import {toyService} from './toy.service.js'

export function updateChart(){
    return toyService.query()
    .then(toys=>{
        // const toys = this.props.toys
        let inStock=0, outStock=0, onWheels=[], boxGame=[], art=[], baby=[], doll=[], puzzle=[], outdoor=[]
        toys.forEach(toy=>{
            if (toy.inStock) inStock++
            toy.labels.forEach(label=>{
                switch (label.value){
                    case 'on-wheels':
                        onWheels.push(+toy.price||0)
                        break;
                    case 'box-game':
                        boxGame.push(+toy.price||0)
                        break;
                    case 'art':
                        art.push(+toy.price||0)
                        break;
                    case 'baby':
                        baby.push(+toy.price||0)
                        break;
                    case 'doll':
                        doll.push(+toy.price||0)
                        break;
                    case 'puzzle':
                        puzzle.push(+toy.price||0)
                        break;
                    case 'outdoor':
                        outdoor.push(+toy.price||0)
                        break;
                    default:
                }
            })
        })
        toys.forEach(toy=>{if (!toy.inStock) outStock++})

        return {inStock,outStock,
            onWheels:onWheels.reduce((prev,curr)=>prev+curr,0)/onWheels.length, 
            boxGame:boxGame.reduce((prev,curr)=>prev+curr,0)/boxGame.length, 
            art:art.reduce((prev,curr)=>prev+curr,0)/art.length, 
            baby:baby.reduce((prev,curr)=>prev+curr,0)/baby.length, 
            doll:doll.reduce((prev,curr)=>prev+curr,0)/doll.length, 
            puzzle:puzzle.reduce((prev,curr)=>prev+curr,0)/puzzle.length, 
            outdoor:outdoor.reduce((prev,curr)=>prev+curr,0)/outdoor.length
        }
    });

}
