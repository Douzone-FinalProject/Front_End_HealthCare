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

  let receipt = props.receiptCount2;
  let test = props.testCount2;
  let medicinePres = props.medicinePres2;
  
  const data = {
    
  
    labels: ['진료', '검사', '약 처방'],
    datasets: [
      {
        label: '# of Votes',
        data: [receipt , test, medicinePres],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
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