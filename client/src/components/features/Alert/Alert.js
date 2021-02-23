import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import {AlertContext} from '../../../context/alertContext';
import styles from './Alert.module.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const Alerts = () => {
  const classes = useStyles();
  const alertCont = useContext(AlertContext);
  return (
    <>
      {alertCont.alert.isVisible &&
      <div className={`${classes.root} ${styles.root}`}>
        {alertCont.alert.type === 'danger' &&
        <Alert variant="filled" severity="error">
          {alertCont.alert.text}
        </Alert>
        }
        {alertCont.alert.type === 'warning' &&
        <Alert variant="filled" severity="warning">
          {alertCont.alert.text}
        </Alert>
        }
        {alertCont.alert.type === 'success' &&
        <Alert variant="filled" severity="success">
          {alertCont.alert.text}
        </Alert>
        }
      </div>
      }
    </>
  );
};

export default Alerts;
