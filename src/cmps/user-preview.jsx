import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import { green } from '@material-ui/core/colors';

export default function UserPreview({user,history,onRemoveUser}){
    return <div className="user-preview" onClick={()=>history.push({pathname:`/user/${user._id}`})}>
        <div className='delete'>
            <button onClick={(ev)=>onDelete(ev,user,onRemoveUser)}>Delete</button>
        </div>
        <div className='edit'>
            <button onClick={(ev)=>{
                ev.stopPropagation(); 
                history.push({pathname:`/user/edit/${user._id}`})
                }
            }>Edit</button>
        </div>
        <div className='name'>
            {user.fullname}
        </div>
        <div className='username'>
            {user.username}
        </div>
        <div className='is-admin'>
            {user.isAdmin?<CheckCircleIcon style={{color:green[500]}}/>:<CancelIcon color='secondary'/>}
        </div>
    </div>
}

function onDelete(ev,user,onRemoveUser){
    ev.stopPropagation()
    onRemoveUser(user)
}
