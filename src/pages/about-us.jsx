import React from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { blue } from '@material-ui/core/colors';
// import PropTypes from 'prop-types'

// import { CSSTransitionGroup } from 'react-transition-group'

// import {utilService} from '../services/util.service'
// import { NicePopup } from '../cmps/nice-popup'

class _AboutUs extends React.Component {
    state = {
        center: {
            lat: 32.109333,
            lng: 34.855499
        },
        isInfoWindowOn : false,
        infoIdx:0,
        branches:[
            {name:'Haifa', pos:{lat:32.794044, lng:34.989571}, openingHours:'Sun-Thu: 8:00-17:00, Fri:8:00-13:00', tel:'04-8457415'},
            {name:'Beer-sheva', pos:{lat:31.25181, lng:34.7913}, openingHours:'Sun-Thu: 9:00-18:00, Fri:9:00-14:00', tel:'08-6748514'},
            {name:'Afula', pos:{lat:32.60907, lng:35.2892}, openingHours:'Sun-Thu: 8:30-19:00, Fri:10:00-16:00', tel:'04-6645120'},
            {name:'Jerusalem', pos:{lat:31.771959, lng:35.217018}, openingHours:'Sun-Thu: 9:30-20:00', tel:'02-4005147'},
        ]
    }
    
    onMapClicked = (props, map, ev) => {
        console.log('props', props);
        console.log('map', map);
        console.log('ev', ev);
        this.setState({ center: { lat: ev.latLng.lat(), lng: ev.latLng.lng() } })
    }

    onMarkerClicked=(idx)=>{
        this.setState({isInfoWindowOn: true, infoIdx:idx, center:this.state.branches[idx].pos})
    }

    onInfoWindowClose=()=>{
        this.setState({isInfoWindowOn: false}) 
    }

    style = {
        width: '80%',
        height: '300px',
        position: 'relative',
        margin: '0 auto'
    }

    render() {
        return (
            <section>
                <h3 style={{textAlign:'center'}}>Our branches</h3>

                <ButtonGroup variant="contained" style={{display:'flex', justifyContent: 'center', boxShadow: 'none', marginBottom:'5px'}}>
                    {this.state.branches.map((branch,idx)=><Button key={idx} style={{ color:blue[600], backgroundColor:blue[100]}} onClick={()=>this.onMarkerClicked(idx)}>{branch.name} branch</Button>)}
                </ButtonGroup>
                {/* <MyErrorBoundary> */}
                    <Map
                        containerStyle={this.style}
                        google={this.props.google}
                        zoom={6}
                        initialCenter={this.state.center}
                        onClick={this.onMapClicked}
                        center={this.state.center}
                        data={this.state.branches}
                    >

                        {/* <Marker
                            position={this.state.center}
                            name={'Current location'} 
                            onClick={this.onMarkerClicked}
                        /> */}
                        {this.state.branches.map((branch,idx)=><Marker key={idx} position={branch.pos} name={branch.name} onClick={()=>this.onMarkerClicked(idx)}/>)}

                        <InfoWindow 
                            onClose={this.onInfoWindowClose}
                            position={this.state.branches[this.state.infoIdx].pos}
                            options={{
                                pixelOffset: new window.google.maps.Size(0, -30)
                              }}
                            visible={this.state.isInfoWindowOn}
                        >
                        <div>
                            <h5 style={{margin:'0'}}>{this.state.branches[this.state.infoIdx].name} branch</h5>
                            <p style={{margin:'5px 0'}}>Opening hours:<br/>
                            {this.state.branches[this.state.infoIdx].openingHours}
                            <hr/>
                            Tel: {this.state.branches[this.state.infoIdx].tel}
                            </p>
                        </div>
                        </InfoWindow>
                    </Map>

                {/* </MyErrorBoundary> */}

            </section>
        )
    }
}


// class MyErrorBoundary extends React.Component {
//     state = { error: null, errorInfo: null };
    
//     componentDidCatch(error, errorInfo) {
//         // Catch errors in children and re-render with error message
//         // Note: in development the error is still presented on screen and you need to ESC to see the fallback UI
//         this.setState({
//             error,
//             errorInfo
//         })
//         // TODO: Log error to an error reporting service
//         // logger.report(error)
//     }
//     render() {
//         if (this.state.errorInfo) {
//             // Error path
//             return (
//                 <div>
//                     <h2>Something went wrong.</h2>
                    
//                     <details style={{ whiteSpace: 'pre-wrap' }}>
//                         {this.state.error && this.state.error.toString()}
//                         <br />
//                         {this.state.errorInfo.componentStack}
//                     </details>
//                 </div>
//             );
//         }
//         // Normally, just render children
//         return this.props.children;
//     }
// }


/* <SplitPane
        left={
            <Contacts />
        }
        right={
            <Projects />
        } /> */


// function FancyBox(props) {
    //         return <div className="fancy-box">
    //             <button style={{ float: 'right' }} onClick={props.onClose}>x</button>
    //             {props.children}
    //         </div>
    //     }
    
    // FancyBox.propTypes = {
        //     onClose: PropTypes.func.isRequired
        // }
    
        // function Contacts() {
            //     return <section style={{ height: '50vh', backgroundColor: 'pink' }}>
            //         <h2>Contacts</h2>
            //     </section>
            // }
            // function Projects() {
                //     const [projs, setProjs] = useState(['Puki Proj', 'Muki Proj'])
                //     // const projList = projs.map((proj, idx) => (
                    //     //     <div className="proj-preview" key={proj} onClick={(ev) => {
                        //     //         ev.stopPropagation();
    //     //         setProjs(projs.filter(p => p !== proj))
    //     //     }}>
    //     //       {proj}
    //     //     </div>
    //     //   ));
    //     return <section style={{ height: '50vh', backgroundColor: 'lightblue' }}>
    //         <h2>Projects</h2>
    //         {/* <CSSTransitionGroup transitionName="example" transitionEnterTimeout={500}
    //             transitionLeaveTimeout={300}>
    //             {projList}
//         </CSSTransitionGroup> */}
//         <button onClick={ev => {
    //             ev.stopPropagation();
    //             setProjs([...projs, 'Babu Proj' + Date.now() % 100])
    //         }}>Add</button>
    //     </section >
    // }
    
    // function SplitPane(props) {
    
        //     const [width, setWidth] = useState(30)
    
        //     if (false && width === 60) {
            //         throw new Error('Projects cannot load')
            //     }
            //     return (
                //         <div className="split-pane" style={{
                    //             display: 'flex'
                    //         }}>
                    //             <div style={{ width: width + '%' }} onClick={() => {
                        //                 if (width + 10 <= 100) setWidth(width + 10)
                        //             }}>
                        //                 {props.left}
                        //             </div>
                        //             <div style={{ flex: 1 }} onClick={() => {
                            //                 if (width > 10) setWidth(width - 10)
                            //             }}>
    //                 {props.right}
    //             </div>
    //         </div>
    //     )
    // }
    // onTellMeMore = () =>{
    //     console.log('Telling you more');
    // }


    export const AboutUs = GoogleApiWrapper({
        apiKey: ('AIzaSyBJt1HJ2UX7AlXY9pgE_f3VQena2BBVFVg')
    })(_AboutUs)
