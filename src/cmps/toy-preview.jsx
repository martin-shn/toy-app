import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import { green } from '@material-ui/core/colors';

export default function ToyPreview({user,toy,history,onRemoveToy}){
    const userAuth = user && (user._id===toy.owner._id || user.isAdmin)
    
    return <tr className="toy-preview" onClick={()=>history.push({pathname:`/toy/${toy._id}`})}>
        <td style={{width:'1px',whiteSpace:'nowrap',padding:'2px 10px'}}>
        {userAuth&&<button onClick={(ev)=>onDelete(ev,toy,onRemoveToy)}>Delete</button>}
        </td>
        <td style={{width:'1px',whiteSpace:'nowrap',padding:'2px 10px'}}>
        {userAuth&&<button onClick={(ev)=>{
            ev.stopPropagation(); 
            history.push({pathname:`/toy/edit/${toy._id}`})
            }
        }>Edit</button>}
        </td>
        <td style={{width:'1px',whiteSpace:'nowrap',padding:'2px 10px'}}>
            {toy.name}
        </td>
        <td style={{width:'1px',whiteSpace:'nowrap',padding:'2px 10px'}}>
            {toy.price}
        </td>
        <td style={{width:'1px',whiteSpace:'nowrap',padding:'2px 10px'}}>
            {new Date(toy.createdAt).toLocaleString('en-Gb')}
        </td>
        <td>
            {toy.labels.map((label,idx)=><span key={label.value}>{idx===0?label.label:', ' + label.label}</span>)}
        </td>
        <td style={{width:'1px',whiteSpace:'nowrap',padding:'2px 10px',textAlign:'center'}}>
            {toy.inStock?<CheckCircleIcon style={{color:green[500]}}/>:<CancelIcon color='secondary'/>}
        </td>
    </tr>
}

function onDelete(ev,toy,onRemoveToy){
    ev.stopPropagation()
    onRemoveToy(toy)
}
