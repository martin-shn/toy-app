import React from 'react'
import { withRouter } from 'react-router-dom';
import { Bar, Pie } from 'react-chartjs-2'; 
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { updateChart } from '../services/chart.service.js';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
  }));

  
function _Dashboard(props){

    const [inStock, setInStock] = React.useState(0);
    const [outStock, setOutStock] = React.useState(0);
    const [onWheels, setOnWheels] = React.useState(0);
    const [boxGame, setBoxGame] = React.useState(0);
    const [art, setArt] = React.useState(0);
    const [baby, setBaby] = React.useState(0);
    const [doll, setDoll] = React.useState(0);
    const [puzzle, setPuzzle] = React.useState(0);
    const [outdoor, setOutdoor] = React.useState(0);

    updateChart()
    .then(({inStock,outStock,onWheels,boxGame,art,baby,doll,puzzle,outdoor} )=>{
        setInStock(inStock)
        setOutStock(outStock)
        setOnWheels(onWheels)
        setBoxGame(boxGame)
        setArt(art)
        setBaby(baby)
        setDoll(doll)
        setPuzzle(puzzle)
        setOutdoor(outdoor) 
    });

    const stockData = {
        labels: ['In stock', 'Out of stock'],
        datasets:[
            {
                label:'In stock',
                data: [inStock, outStock],
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
                label:'Avg. price per category',
                data: [onWheels, boxGame, art, baby, doll, puzzle, outdoor],
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
    
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

    return <Paper className={classes.root}>
        <AppBar position="static" color="default">
        <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
        >
            <Tab label="Qty in stock" />
            <Tab label="Avg. price per category"/>
        </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
                <Pie data={stockData} width={null} height={null} options={{aspectRatio:3}}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Bar data={pricesData} width={null} height={null} options={{aspectRatio:3}}/>
            </TabPanel>
    </Paper>
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


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
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
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

export const Dashboard =  withRouter(_Dashboard);
// export const Dashboard =  connect(mapStateToProps)(withRouter(_Dashboard));
