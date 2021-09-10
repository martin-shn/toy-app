export default function ToyPreview({user,toy,history,onRemoveToy}){
    const userAuth = user && (user._id===toy.owner._id || user.isAdmin)
    const sortBy = new URLSearchParams(window.location.search).get('sortBy')
    return <tr className="toy-preview" onClick={()=>history.push({pathname:`/toy/${toy._id}`,
    search:sortBy?'sortBy='+sortBy:''})}>
        <td>
        {userAuth&&<button onClick={(ev)=>onDelete(ev,toy._id,onRemoveToy)}>Delete</button>}
        </td>
        <td>
        {userAuth&&<button onClick={(ev)=>{
            ev.stopPropagation(); 
            history.push({pathname:`/toy/edit/${toy._id}`,search:sortBy?'sortBy='+sortBy:''})
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

function onDelete(ev,toyId,onRemoveToy){
    ev.stopPropagation()
    onRemoveToy(toyId)
}
