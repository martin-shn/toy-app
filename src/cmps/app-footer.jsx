// import { showSuccessMsg } from '../services/event-bus.service.js'

import React from 'react'
import { connect } from 'react-redux'


class _AppFooter extends React.Component {

    state = {}

    componentDidMount() { }

    render() {
        return (
            <footer>
                <p>
                    coffeerights 2021
                </p>
            </footer>
        )
    }
}

function mapStateToProps(state){
    return state
}

export const AppFooter = connect(mapStateToProps)(_AppFooter)
