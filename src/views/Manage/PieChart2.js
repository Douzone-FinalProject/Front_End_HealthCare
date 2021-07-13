import React from 'react';
import { Pie } from 'react-chartjs-2';


function PieChart2(props) {


const options = {
  maintainAspectRatio: false,
  responsive: false,
  legend: {
    position: 'right',
    labels: {
      boxWidth: 1
    }
  }
}

let staff = props.staffCounts;
let disableStaff = props.disableStaffCounts;

const data = {
  labels: ['직원', '휴먼'],
  datasets: [
    {
      label: '# of Votes',
      data: [staff, disableStaff],
      backgroundColor: [
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
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
export default PieChart2;