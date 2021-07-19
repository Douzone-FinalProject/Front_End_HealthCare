import React from 'react';
import Modal from "react-modal";
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';

const customStyles = {
  content: {
      width: '50vh',
      height: '24em',
      top: '50%',
      left: '44%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: '0px',
  },
};

function BmiDisplay(props){
  return (
    <div className={"bmi-result alert " + props.alertClass}>
      <div>{ props.bmi || '--.-' } { props.label }</div>
    </div>
  )
}

// BMI 맥박 혈압 알려주는 모달 
Modal.setAppElement('body');
const PatientModal = (props) => {
    const patient = props.patient;

    // #-------BMI-------#
    const calculateBMI = () => {
      if (patient.patient_weight && patient.patient_height){
        var height = patient.patient_height;
        let weight = patient.patient_weight;
        var bmi = weight / (height * height) * 10000;
        return bmi;
      }
    }
  
    const getBMIResults = (bmi) => {
      let bmiResults = {
        label: '',
        alertClass: '',
      };
      
      if (bmi < 18.5){
        bmiResults.label = '저체중';
        bmiResults.alertClass = 'alert-danger';
      } 
      else if (bmi <= 24.9) {
        bmiResults.label = '정상체중';
        bmiResults.alertClass = 'alert-success';
      }
      else if (bmi <= 29.9){
        bmiResults.label = '경도비만';
        bmiResults.alertClass = 'alert-warning';
      }
      else if (bmi >= 30) {
        bmiResults.label = '중등도비반';
        bmiResults.alertClass = 'alert-danger';
      } else {
        bmiResults.label = 'BMI';
        bmiResults.alertClass = 'alert-primary';
      }
  
      return bmiResults;
    }
  
    // BMI 
    let bmi = calculateBMI();
    let results = getBMIResults(bmi);

    
  return (
    <>
    <Modal
      isOpen={props.modalIsOpen}
      onRequestClose={props.closeModal}
      contentLabel="Patient Info Modal"
      style={customStyles}      
    >
    <div className="p-4">
     <div className="mt-4">
            <TextField disabled label="혈액형"  name="patient_blood_type" value={patient.patient_blood_type ||''}/>
            <TextField disabled label="맥박" name="patient_pulse" value={patient.patient_pulse ||''}/>    
          </div>
          <div className="m-1" style={{fontSize:"1.2em", color:"red"}}>
              {(patient.patient_pulse === '' || patient.patient_pulse === 0 || patient.patient_pulse === undefined)? ''
                :(patient.patient_pulse < 50 ? '**서맥입니다.'
                 :( patient.patient_pulse < 100 ? <span style={{color:"blue"}}>**정상맥박 입니다</span> :'**빈맥입니다.')
                )}
          </div>
          <div className="d-flex">
            <div className="ml-1 d-flex-col">
              <Input
                  name="patient_height"  value={patient.patient_height ||''} disabled
                  endAdornment={<InputAdornment position="end">cm</InputAdornment>}/>
              <FormHelperText >신장</FormHelperText>
            </div>
            <div className="ml-5 d-flex-col">
              <Input
                  name="patient_weight"  value={patient.patient_weight ||''} disabled
                  endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
              />
              <FormHelperText>Weight</FormHelperText>
            </div>
          </div>
          <div className="m-1" style={{fontSize:"1.2em", color:"blue"}}>
            <BmiDisplay bmi={bmi} label={results.label} alertClass={results.alertClass} />
          </div>

          <div className="d-flex">
            <div className="ml-1 d-flex-col">
              <Input
                  name="patient_max_bp" value={patient.patient_max_bp ||''} disabled
                  endAdornment={<InputAdornment position="end">mmHg</InputAdornment>}/>
              <FormHelperText >최고혈압</FormHelperText>
            </div>
            <div className="ml-4 d-flex-col">
              <Input
                  name="patient_min_bp" value={patient.patient_min_bp ||''} disabled
                  endAdornment={<InputAdornment position="end">mmHg</InputAdornment>}
              />
              <FormHelperText>최저혈압</FormHelperText>
            </div>
          </div>
          <div className="m-1" style={{fontSize:"1.2em", color:"red"}}>
              {( patient.patient_max_bp !== '' && patient.patient_max_bp !== 0 &&
                  patient.patient_min_bp !== '' && patient.patient_min_bp !== 0) 
                &&
                ((patient.patient_max_bp <= 90 && patient.patient_min_bp < 60) ? '**저혈압 기준수치'
                  :
                  ((patient.patient_max_bp < 120 && patient.patient_min_bp < 80)?<span style={{color:'blue'}}>'**혈압 정상수치'</span>
                      :
                    ((patient.patient_max_bp > 140 && patient.patient_min_bp > 90)?'**고혈압 기준수치'
                        :
                      ((patient.patient_max_bp >= 120 && patient.patient_min_bp >= 80) ? '**고혈압 주의단계'
                          :
                          ((patient.patient_max_bp <= 90 && patient.patient_min_bp < 60) ? '**저혈압 기준수치':'')
                      )
                )))}
          </div>
    </div>
    </Modal>
    </>
  );
};

export default PatientModal;
