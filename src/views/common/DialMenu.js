import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon'
import { faStethoscope, faFileInvoice, faSyringe, faCalendarAlt, faReceipt, faSignOutAlt, faUsersCog } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  speedDial: {
    position: 'fixed',
    bottom: theme.spacing(1),
    right: theme.spacing(1),
  },
}));

const actions1 = [
  { icon: <Link to="/manage"><FontAwesomeIcon icon={faUsersCog} size="lg"/></Link>, name: '관리자' },
  { icon: <Link to="/login"><FontAwesomeIcon icon={faSignOutAlt} size="lg"/></Link>, name: '로그아웃' },
  { icon: <Link to="/teststate"><FontAwesomeIcon icon={faSyringe} size="lg"/></Link>, name: '검사' },
  { icon: <Link to="/result"><FontAwesomeIcon icon={faFileInvoice} size="lg"/></Link>, name: '검사결과' },
  { icon: <Link to="/diagnosis"><FontAwesomeIcon icon={faStethoscope} size="lg"/></Link>, name: '진료' },
  { icon: <Link to="/reserve"><FontAwesomeIcon icon={faCalendarAlt} size="lg"/></Link>, name: '예약' },
  { icon: <Link to="/receipt"><FontAwesomeIcon icon={faReceipt} size="lg"/></Link>, name: '접수' },
];


const actions2 = [
  { icon: <Link to="/login"><FontAwesomeIcon icon={faSignOutAlt} size="lg"/></Link>, name: '로그아웃' },
  { icon: <Link to="/teststate"><FontAwesomeIcon icon={faSyringe} size="lg"/></Link>, name: '검사' },
  { icon: <Link to="/result"><FontAwesomeIcon icon={faFileInvoice} size="lg"/></Link>, name: '검사결과' },
  { icon: <Link to="/diagnosis"><FontAwesomeIcon icon={faStethoscope} size="lg"/></Link>, name: '진료' },
  { icon: <Link to="/reserve"><FontAwesomeIcon icon={faCalendarAlt} size="lg"/></Link>, name: '예약' },
  { icon: <Link to="/receipt"><FontAwesomeIcon icon={faReceipt} size="lg"/></Link>, name: '접수' },
];

export default function DialMenu(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const globalRole = useSelector((state) => state.authReducer.staff_role);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
    {globalRole === "ROLE_DOCTOR" ?
      <div className={classes.root}>
        <Backdrop open={open} />
        <SpeedDial
          ariaLabel="SpeedDial tooltip example"
          className={classes.speedDial}
          icon={<SpeedDialIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
        >
          {actions1.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              tooltipOpen
            />
          ))}
        </SpeedDial>
      </div>
    :
      <div className={classes.root}>
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        className={classes.speedDial}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions2.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
          />
        ))}
      </SpeedDial>
      </div>      
    }
    </>
  );
}