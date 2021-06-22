import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon'
import { faStethoscope, faFileInvoice, faSyringe, faCalendarAlt, faReceipt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  speedDial: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const actions = [
  { icon: <Link to="/"><FontAwesomeIcon icon={faSignOutAlt} size="lg"/></Link>, name: '로그아웃' },
  { icon: <Link to="/teststate"><FontAwesomeIcon icon={faSyringe} size="lg"/></Link>, name: '검사' },
  { icon: <Link to="/result"><FontAwesomeIcon icon={faFileInvoice} size="lg"/></Link>, name: '검사결과' },
  { icon: <Link to="/diagnosis"><FontAwesomeIcon icon={faStethoscope} size="lg"/></Link>, name: '진료' },
  { icon: <Link to="/reserve"><FontAwesomeIcon icon={faCalendarAlt} size="lg"/></Link>, name: '예약' },
  { icon: <Link to="/receipt"><FontAwesomeIcon icon={faReceipt} size="lg"/></Link>, name: '접수' },
];

export default function DialMenu(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
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
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
          />
        ))}
      </SpeedDial>
    </div>
  );
}