import PropTypes from 'prop-types';
import ToyPreview from './toy-preview';

ToyList.propTypes = {
    user: PropTypes.object,
    toys: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired,
    onRemoveToy: PropTypes.func.isRequired,
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
};

export function ToyList({ user, toys, history, onRemoveToy }) {
    return (
        <>
            <div className='toy-list' style={{ width: '100%'}}>
                <div style={{ gridColumn:'1'}}>Delete</div>
                <div style={{ gridColumn:'2'}}>Edit</div>
                <div style={{ gridColumn:'3'}}>Name</div>
                <div style={{ gridColumn:'4'}}>Price</div>
                <div style={{ gridColumn:'5'}}>Created at</div>
                <div style={{ gridColumn:'6'}}>Labels</div>
                <div style={{ gridColumn:'7'}}>In Stock?</div>
            </div>
            <div className="toy-list-container">
                {toys.map((toy) => (
                    <ToyPreview key={toy._id} user={user} toy={toy} history={history} onRemoveToy={onRemoveToy} />
                ))}
            </div>
        </>
    );
}
