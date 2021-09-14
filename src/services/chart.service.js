
import {toyService} from './toy.service.js'

export async function updateChart(){
    try{
        const toys = await toyService.query()
        let inStock=0, outStock=0, onWheels=[], boxGame=[], art=[], baby=[], doll=[], puzzle=[], outdoor=[]
        toys.forEach(toy=>{
            (toy.inStock) ? inStock++ : outStock++
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

        return {inStock,outStock,
            onWheels:onWheels.reduce((prev,curr)=>prev+curr,0)/onWheels.length, 
            boxGame:boxGame.reduce((prev,curr)=>prev+curr,0)/boxGame.length, 
            art:art.reduce((prev,curr)=>prev+curr,0)/art.length, 
            baby:baby.reduce((prev,curr)=>prev+curr,0)/baby.length, 
            doll:doll.reduce((prev,curr)=>prev+curr,0)/doll.length, 
            puzzle:puzzle.reduce((prev,curr)=>prev+curr,0)/puzzle.length, 
            outdoor:outdoor.reduce((prev,curr)=>prev+curr,0)/outdoor.length
        }
    }catch(err){
        console.log('Cannot query toys for dashboard');
    }
}
