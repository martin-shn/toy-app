import React from 'react'
import { connect } from 'react-redux'

// import logo from '../assets/img/logo.png'

class _HomePage extends React.Component {
    state = {}

    render() {
        return (
            <section>
                <p>
                    Welcome to my Toy Store
                </p>
            </section >
        )
    }
}

function mapStateToProps(state) {
    return state
}

export const HomePage = connect(mapStateToProps)(_HomePage)
