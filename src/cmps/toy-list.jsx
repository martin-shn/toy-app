import ToyPreview from './toy-preview'

export function ToyList({user,toys,history,onRemoveToy}){
    return <table>
        <thead>
            <tr>
                <td>Delete</td>
                <td>Edit</td>
                <td>Name</td>
                <td>Price</td>
                <td>Created at</td>
                <td>Labels</td>
            </tr>
        </thead>
        <tbody>
            {toys.map(toy=><ToyPreview key={toy._id} user={user} toy={toy} history={history} onRemoveToy={onRemoveToy}/>)}
        </tbody>
        </table>
}
