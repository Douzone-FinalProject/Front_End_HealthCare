import React from 'react';
import { Pie } from 'react-chartjs-2';

function PieChart3(props) {



const options = {
  maintainAspectRatio: false,
  responsive: false,
  legend: {
    position: 'center',
    labels: {
      boxWidth: 1
    }
  }
}

let A = props.aTypeBlood;
let B = props.bTypeBlood;
let AB = props.abTypeBlood;
let O = props.oTypeBlood;
let RH_A = props.rh_aTypeBlood;
let RH_B = props.rh_bTypeBlood;
let RH_AB = props.rh_abTypeBlood;
let RH_O = props.rh_oTypeBlood;


const data = {
  labels: ['A', 'B', 'AB', 'O', 'Rh-A', 'Rh-B', 'Rh-AB', 'Rh-O'],
  datasets: [
    {
      label: '# of Votes',
      data: [A, B, AB, O, RH_A, RH_B, RH_AB, RH_O],
      backgroundColor: [
        '#e03131',
        '#ffa94d',
        '#ffd43b',
        '#37b24d',
        '#4c6ef5',
        '#5f3dc4',
        '#cc5de8',
        '#ffa8a8',
      ],
      borderColor: [
        '#e03131',
        '#ffa94d',
        '#ffd43b',
        '#37b24d',
        '#4c6ef5',
        '#5f3dc4',
        '#cc5de8',
        '#ffa8a8',
      ],
      borderWidth: 1
      
    },
  ],
};


  return(
  
      <Pie data={data} options={options} height={null}
      width={null} />
    
  );
}
export default PieChart3;