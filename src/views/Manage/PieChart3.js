import React from 'react';
import { Pie } from 'react-chartjs-2';

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
const data = {
  labels: ['A', 'B', 'AB', 'O', 'Rh-A', 'Rh-B', 'Rh-AB', 'Rh-O'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 5, 11, 2, 4, 1, 1],
      backgroundColor: [
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        '#ffa8a8',
        '#eebefa',
        '#a5d8ff',
        '#96f2d7',
        '#ffe066',
        '#868e96',
      ],
      borderColor: [
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        '#ffa8a8',
        '#eebefa',
        '#a5d8ff',
        '#96f2d7',
        '#ffe066',
        '#868e96',
      ],
      borderWidth: 1
      
    },
  ],
};

const PieChart3 = () => (
 
    
    <Pie data={data} options={options} height={null}
    width={null} />
  
);

export default PieChart3;