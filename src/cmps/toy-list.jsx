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
    // const userAuth = user && user.isAdmin
    return (
        <>
            <div className="toy-list-container">
                {toys.map((toy) => (
                    <ToyPreview key={toy._id} user={user} toy={toy} history={history} onRemoveToy={onRemoveToy} />
                ))}
            </div>
        </>
    );
}
