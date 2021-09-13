import React from 'react'
import { connect } from 'react-redux'

import { NicePopup } from '../cmps/nice-popup'

// import hero from '../assets/img/hero.jpg'

class _HomePage extends React.Component {
    state = {}

    componentWillUnmount() {
        document.body.className=''
    }
    

    render() {
        document.body.className='home'
        return (
            <section className="home-page main-container">
                <p className="main-para">
                    Welcome to my Toy Store
                </p>
                
                <NicePopup header={<h1>Welcome</h1>} footer='All rights reserved' top='50%' left='50%' bgc='#79a8c5' timeout='5000'>
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
