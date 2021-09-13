// import { showSuccessMsg } from '../services/event-bus.service.js'

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';

import {FacebookShareButton, WhatsappShareButton} from "react-share";
import {FacebookIcon, WhatsappIcon} from "react-share";

class _AppFooter extends React.Component {

    state = {}

    componentDidMount() { }

    render() {
        return (
            <footer className="main-container full" >
                <p>
                    coffeerights 2021
                </p>
                <div className="socials">
                <FacebookShareButton quote="Check out this awsome toy store" url={'toy-app-martin.herokuapp.com'} style={{marginRight:'10px'}}>
                    <FacebookIcon size={30} round/>
                </FacebookShareButton>
                <WhatsappShareButton title="Check out this awsome toy I found" url={`toy-app-martin.herokuapp.com${this.props.location.pathname}`}>
                    <WhatsappIcon size={30} round/>
                </WhatsappShareButton>
                </div>
            </footer>
        )
    }
}

function mapStateToProps(state){
    return state
}

export const AppFooter = connect(mapStateToProps)(withRouter(_AppFooter))
