import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { Container, Grid, TextField } from '@material-ui/core'


class CreateProfile extends Component {
    constructor(props){
        super(props)  
        this.state={
            handle: '',
            location: '',
            bio: '',
            education:'',
            twitter:'',
            facebook: '',
            linkedin: '',
            instagram:'',
            errors: {}
        }     
        
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(e){
        e.preventDefault()

        console.log('submit')
    }

    onChange(e){
        this.setState({[e.target.id]: e.target.value})
    }

    render() {
        const {errors} = this.state
        return (
            <Container maxWidth="sm"
                style={{
                    marginTop: "30px",
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <div>
                    <form>
                        <Grid container>
                            <Grid item xs={12}>
                                <TextField 
                                    id="outlined-basic" 
                                    label="Outlined" 
                                    variant="outlined" 
                                />
                            </Grid>
                        </Grid>                        
                    </form>
                </div>
            </Container>
        )
    }
}

CreateProfile.propTypes ={
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
    profile: state.profile,
    errors: state.errors
})

export default connect(mapStateToProps)(CreateProfile)