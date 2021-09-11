export default function ToyPreview({user,toy,history,onRemoveToy}){
    const userAuth = user && (user._id===toy.owner._id || user.isAdmin)
    
    return <tr className="toy-preview" onClick={()=>history.push({pathname:`/toy/${toy._id}`})}>
        <td>
        {userAuth&&<button onClick={(ev)=>onDelete(ev,toy,onRemoveToy)}>Delete</button>}
        </td>
        <td>
        {userAuth&&<button onClick={(ev)=>{
            ev.stopPropagation(); 
            history.push({pathname:`/toy/edit/${toy._id}`})
            }
        }>Edit</button>}
        </td>
        <td>
            {toy.name}
        </td>
        <td>
            {toy.price}
        </td>
        <td>
            {new Date(toy.createdAt).toLocaleString('en-Gb')}
        </td>
        <td>
            {toy.labels.map((label,idx)=><span key={label.value}>{idx===0?label.label:', ' + label.label}</span>)}
        </td>
    </tr>
}

function onDelete(ev,toy,onRemoveToy){
    ev.stopPropagation()
    onRemoveToy(toy)
}
