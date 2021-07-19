import { Pie } from 'react-chartjs-2';

function PieChart(props) {
  
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

  let ready = props.ready;
  let treatment = props.treatment;
  let inspection = props.inspection;
  let payment = props.payment;
  
  const data = {
    
  
    labels: ['대기', '진료중', '검사중', '수납전'],
    datasets: [
      {
        label: '# of Votes',
        data: [ready , treatment, inspection, payment],
        backgroundColor: [
          '#c5f6fa',
          '#96f2d7',
          '#ffec99',
          '#eebefa',
        ],
        borderColor: [
          '#c5f6fa',
          '#96f2d7',
          '#ffec99',
          '#eebefa',
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

export default PieChart;