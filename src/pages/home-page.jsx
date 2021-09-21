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
                
                <NicePopup header={<h1>NOTICE</h1>} footer={<small>Press ESC to close this window</small>} top='50%' left='50%' bgc='#ffdf00' timeout='5000'>
                    All orders are shipped <br/> within 2 business days.<br/><br/>
                    <b>FREE SHIPPING FOR LIMITED TIME</b>
                    
                </NicePopup>
            </section >
        )
    }
}

function mapStateToProps(state) {
    return state
}

export const HomePage = connect(mapStateToProps)(_HomePage)
