import PropTypes from 'prop-types'
import ToyPreview from './toy-preview'

ToyList.propTypes={
    user:PropTypes.object,
    toys:PropTypes.array.isRequired,
    history:PropTypes.object.isRequired,
    onRemoveToy:PropTypes.func.isRequired,
    // user(props, propName, component){
    //     if(!(propName in props)){
    //         return new Error(`missing ${propName}`)
    //     }
    // },
    // toys(props, propName, component){
    //     if(!(propName in props)){
    //         return new Error(`missing ${propName}`)
    //     }
    // },
    // history(props, propName, component){
    //     if(!(propName in props)){
    //         return new Error(`missing ${propName}`)
    //     }
    // },
    // onRemoveToy(props, propName, component){
    //     if(!(propName in props)){
    //         return new Error(`missing ${propName}`)
    //     }
    // }
}

export function ToyList({user,toys,history,onRemoveToy}){
    return <table className="toy-list" style={{width:'100%',borderSpacing:'0'}}>
        <thead>
            <tr>
                <td style={{width:'1px',whiteSpace:'nowrap',padding:'2px 10px'}}>Delete</td>
                <td style={{width:'1px',whiteSpace:'nowrap',padding:'2px 10px'}}>Edit</td>
                <td style={{width:'1px',whiteSpace:'nowrap',padding:'2px 10px'}}>Name</td>
                <td style={{width:'1px',whiteSpace:'nowrap',padding:'2px 10px'}}>Price</td>
                <td style={{width:'1px',whiteSpace:'nowrap',padding:'2px 10px'}}>Created at</td>
                <td>Labels</td>
                <td style={{width:'1px',whiteSpace:'nowrap',padding:'2px 10px'}}>In Stock?</td>
            </tr>
        </thead>
        <tbody>
            {toys.map(toy=><ToyPreview key={toy._id} user={user} toy={toy} history={history} onRemoveToy={onRemoveToy}/>)}
        </tbody>
        </table>
}
