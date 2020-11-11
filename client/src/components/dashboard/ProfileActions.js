import React from 'react'
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

const ProfileActions = () =>{
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Link to="/edit-profile"><Button variant="contained" color="primary">
                Edit
            </Button></Link>
            
        </div>
    )
}

export default ProfileActions