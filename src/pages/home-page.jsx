import React from 'react'
import { connect } from 'react-redux'

import { NicePopup } from '../cmps/nice-popup'

// import logo from '../assets/img/logo.png'

class _HomePage extends React.Component {
    state = {}

    render() {
        return (
            <section>
                <p>
                    Welcome to my Toy Store
                </p>
                
                <NicePopup header={<h1>Welcome</h1>} footer='All rights reserved' top='50%' left='50%' bgc='#7a9aa5' timeout='5000'>
                    Feel free to use this app,<br/>
                    navigate in the upper menu<br/>
                    and don't forget to register.
                    <hr/>
                    Press ESC to close this window
                </NicePopup>
            </section >
        )
    }
}

function mapStateToProps(state) {
    return state
}

export const HomePage = connect(mapStateToProps)(_HomePage)
