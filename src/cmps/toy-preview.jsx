import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import { green } from '@material-ui/core/colors';

export default function ToyPreview({user,toy,history,onRemoveToy}){
    const userAuth = user && user.isAdmin
    
    return <div className="toy-preview" onClick={()=>history.push({pathname:`/toy/${toy._id}`})}>
        <div className='delete'>
        {userAuth&&<button onClick={(ev)=>onDelete(ev,toy,onRemoveToy)}>Delete</button>}
        </div>
        <div className='edit'>
        {userAuth&&<button onClick={(ev)=>{
            ev.stopPropagation(); 
            history.push({pathname:`/toy/edit/${toy._id}`})
            }
        }>Edit</button>}
        </div>
        <img alt="Toy img" src={toy.imgUrl?toy.imgUrl:`https://robohash.org/${toy.name}?set=set4`} />
        <div className='name'>
            {toy.name}
        </div>
        <div className='price'>
            {toy.price.toFixed(2)}$
        </div>
        <div className="labels">
            <h6>{toy.labels.map(label=><label key={label.value} className={label.value}>{label.label}</label>)}</h6>
        </div>
        <div className='instock'>
            {toy.inStock?<CheckCircleIcon style={{color:green[500]}}/>:<CancelIcon color='secondary'/>}
        </div>
    </div>
}

function onDelete(ev,toy,onRemoveToy){
    ev.stopPropagation()
    onRemoveToy(toy)
}
