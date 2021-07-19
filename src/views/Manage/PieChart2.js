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
  labels: ['활성화', '비활성화'],
  datasets: [
    {
      label: '# of Votes',
      data: [staff, disableStaff],
      backgroundColor: [
        '#e9ecef',
        '#343a40',
      ],
      borderColor: [
        '#e9ecef',
        '#343a40',
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