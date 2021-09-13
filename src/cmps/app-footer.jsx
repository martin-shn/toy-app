// import { showSuccessMsg } from '../services/event-bus.service.js'

import React from 'react'
import { connect } from 'react-redux'

import {FacebookShareButton, WhatsappShareButton} from "react-share";
import {FacebookIcon, WhatsappIcon} from "react-share";

class _AppFooter extends React.Component {

    state = {}

    componentDidMount() { }

    render() {
        return (
            <footer style={{paddingBottom:'40px'}}>
                <p>
                    coffeerights 2021
                </p>
                <FacebookShareButton quote="Check out this awsome toy I found" url={window.location.href} style={{marginRight:'10px'}}>
                    <FacebookIcon size={30} round/>
                </FacebookShareButton>
                <WhatsappShareButton title="Check out this awsome toy I found" url={window.location.href}>
                    <WhatsappIcon size={30} round/>
                </WhatsappShareButton>
            </footer>
        )
    }
}

function mapStateToProps(state){
    return state
}

export const AppFooter = connect(mapStateToProps)(_AppFooter)
