import React from 'react'
import { withRouter } from 'react-router-dom';
import { Bar, Pie } from 'react-chartjs-2'; 
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import PropTypes from 'prop-types';
// import { makeStyles } from '@material-ui/core/styles';
import { updateChart } from '../services/chart.service.js';

  
class _Dashboard extends React.Component{
    state={
      inStock:0,
      outStock:0,
      onWheels:0,
      boxGame:0,
      art:0,
      baby:0,
      doll:0,
      puzzle:0, 
      outdoor:0, 
      value:0,
    }

    async componentDidMount() {
      const {inStock,outStock,onWheels,boxGame,art,baby,doll,puzzle,outdoor} = await updateChart()
      this.setState({inStock,outStock,onWheels,boxGame,art,baby,doll,puzzle,outdoor})
    }
    
    
    
    // const [value, setValue] = React.useState(0);

    handleChange = (event, newValue) => {
        this.setState({value:newValue});
    };

    render(){
      const stockData = {
        labels: ['In stock', 'Out of stock'],
        datasets:[
            {
                label:'In stock',
                data: [this.state.inStock, this.state.outStock],
                backgroundColor:[
                    'rgba(255, 99, 132, 0.3)',
                    'rgba(54, 162, 235, 0.3)'],
                borderColor:[
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth:1
            }
        ]
    }

    
    const pricesData = {
        labels: ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor'],
        datasets:[
            {
                // label:'Avg. price per category',
                label:'',
                data: [this.state.onWheels, this.state.boxGame, this.state.art, this.state.baby, this.state.doll, this.state.puzzle, this.state.outdoor],
                backgroundColor:[
                    'rgba(0, 0, 255,0.3)',
                    'rgba(0, 128, 0,0.3)',
                    'rgba(128, 0, 128,0.3)',
                    'rgba(255, 105, 180,0.3)',
                    'rgba(255, 0, 0,0.3)',
                    'rgba(0, 128, 128,0.3)',
                    'rgba(255, 165, 0,0.3)'
                ],
                borderColor:[
                    'rgba(0, 0, 255,1)',
                    'rgba(0, 128, 0,1)',
                    'rgba(128, 0, 128,1)',
                    'rgba(255, 105, 180,1)',
                    'rgba(255, 0, 0,1)',
                    'rgba(0, 128, 128,1)',
                    'rgba(255, 165, 0,1)'
                ],
                borderWidth:1
            }
        ]
    }

      return <Paper className="charts" style={{flexGrow:"1", width: '100%'}}>
        <AppBar position="static" color="default">
        <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
        >
            <Tab label="Qty in stock" />
            <Tab label="Avg. price per category"/>
        </Tabs>
        </AppBar>
        <TabPanel value={this.state.value} index={0}>
                <Pie data={stockData} width={null} height={null} options={{aspectRatio:3}}/>
            </TabPanel>
            <TabPanel value={this.state.value} index={1}>
                <Bar data={pricesData} width={null} height={null} options={{
                  aspectRatio:3,
                  plugins:{
                    legend: {display: false},
                  }
                  }}/>
            </TabPanel>
    </Paper>
  }
}
    

// function mapStateToProps(state){
//     return {
//         inStock: state.toyModule.inStock,
//         outStock: state.toyModule.outStock,
//         onWheels: state.toyModule.onWheels,
//         boxGame: state.toyModule.boxGame,
//         art: state.toyModule.art,
//         baby: state.toyModule.baby,
//         doll: state.toyModule.doll,
//         puzzle: state.toyModule.puzzle,
//         outdoor: state.toyModule.outdoor
//     }
// }


class TabPanel extends React.Component {
  state={
  }
  
  render(){
    const { children, value, index, ...other} = this.props
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            {children}
          </Box>
        )}
      </div>
  )}
}
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

export const Dashboard =  withRouter(_Dashboard);
// export const Dashboard =  connect(mapStateToProps)(withRouter(_Dashboard));
