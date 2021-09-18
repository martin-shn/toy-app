import PropTypes from 'prop-types';
import UserPreview from './user-preview';

UsersList.propTypes = {
    users: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired,
    onRemoveUser: PropTypes.func.isRequired,
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

export function UsersList({ users, history, onRemoveUser }) {
    return (
        <>
            <div className='user-list' style={{ width: '100%'}}>
                <div style={{ gridColumn:'1'}}>Delete</div>
                <div style={{ gridColumn:'2'}}>Edit</div>
                <div style={{ gridColumn:'3'}}>Name</div>
                <div style={{ gridColumn:'4'}}>Username</div>
                <div style={{ gridColumn:'5'}}>Is Admin</div>
            </div>
            <div className="user-list-container">
                {users.map((user) => (
                    <UserPreview key={user._id} user={user} history={history} onRemoveUser={onRemoveUser} />
                ))}
            </div>
        </>
    );
}
