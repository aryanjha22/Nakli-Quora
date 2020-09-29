import React from 'react'
import {Container, Grid, Typography,TextField, Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import welcome from '../../components/welcome.jpg'
import pen from '../../components/pen.jpg'
import {Link} from 'react-router-dom'



const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '35ch'
        },
        flex:1
    },
    welcome:{
        marginRight:"100px",
        marginTop:"135px",
        fontSize:"20px"
    },
    login:{
        flex:1,
        marginRight:"10px"
    },
    right: {
        marginLeft: 'auto',
        marginTop:"50px"
        
        },
    background: {
        backgroundImage:`url(${pen})`,
        minWidth: "100%",
        position: "fixed",
        minHeight: "89%",
        backgroundSize: "cover",
        backgroundPosition: "center"

    }
    }));



export default function Landing() {
    const classes = useStyles();
    return (        
        <div className={classes.background}>
            <Container>
                <Grid container alignItems="center">
                    <Grid xs={6} sm={3}>
                        <img src={welcome} className={classes.welcome} alt=""></img>
                    </Grid>
                    
                    <Grid className={classes.right} borderColor="primary.main" xs={6} sm={3}>
                        <Typography><h1>Login</h1></Typography>
                        <form className={classes.root} noValidate autoComplete="off">  
                            <TextField id="outlined-basic" label="Email" variant="outlined"/>
                            <br/>
                            <TextField id="outlined-basic" label="Password" variant="outlined" />
                        </form>
                        <br/>
                        <Grid xs={6} sm={3}>
                            <Button size="large" color="primary" variant="contained" style={{marginRight:"20px"}}>
                                Login
                            </Button>
                        </Grid>
                        <br/>
                        <a href="#">Forget Password?</a>
                        <br/>
                        <Link to="/register">Not a User yet? Sign Up</Link>
                    </Grid>
                </Grid> 
            </Container>
        </div>
    )
}