import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { Button, Container, Grid, TextField } from '@material-ui/core'
import {createProfile} from '../../actions/profileActions'
import {withRouter} from 'react-router-dom'

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

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors: nextProps.errors})
        }
    }

    onSubmit(e){
        e.preventDefault()

        const profileData={
            handle: this.state.handle,
            location: this.state.location,
            bio: this.state.bio,
            education:this.state.education,
            twitter:this.state.twitter,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            instagram:this.state.instagram,
        }

        this.props.createProfile(profileData, this.props.history)

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
                    <form autoComplete="off" onSubmit={this.onSubmit}>
                        <Grid container>
                            <Grid item xs={12}>
                                <TextField 
                                    id="handle" 
                                    label="Handle" 
                                    variant="outlined" 
                                    fullWidth
                                    value={this.state.handle}
                                    onChange={this.onChange}
                                    helperText={errors.handle}
                                    error={errors.handle}
                                />
                            </Grid>
                            <br/><br/><br/>
                            <Grid item xs={12}>
                                <TextField 
                                    id="location" 
                                    label="Location" 
                                    variant="outlined" 
                                    fullWidth
                                    value={this.state.location}
                                    onChange={this.onChange}
                                    helperText={errors.location}
                                    error={errors.location}
                                />
                            </Grid>
                            <br/><br/><br/>
                            <Grid item xs={12}>
                                <TextField 
                                    id="bio" 
                                    label="Bio" 
                                    variant="outlined" 
                                    fullWidth
                                    value={this.state.bio}
                                    onChange={this.onChange}
                                    helperText={errors.bio}
                                    error={errors.bio}
                                />
                            </Grid>
                            <br/><br/><br/>
                            <Grid item xs={12}>
                                <TextField 
                                    id="education" 
                                    label="Education" 
                                    variant="outlined" 
                                    fullWidth
                                    value={this.state.education}
                                    onChange={this.onChange}
                                    helperText={errors.education}
                                    error={errors.education}
                                />
                            </Grid>
                            <br/><br/><br/>
                            <Grid item xs={12}>
                                <TextField 
                                    id="twitter" 
                                    label="Twitter" 
                                    variant="outlined" 
                                    fullWidth
                                    value={this.state.twitter}
                                    onChange={this.onChange}
                                    helperText={errors.twitter}
                                    error={errors.twitter}
                                />
                            </Grid>
                            <br/><br/><br/>
                            <Grid item xs={12}>
                                <TextField 
                                    id="facebook" 
                                    label="Facebook" 
                                    variant="outlined" 
                                    fullWidth
                                    value={this.state.facebook}
                                    onChange={this.onChange}
                                    helperText={errors.facebook}
                                    error={errors.facebook}
                                />
                            </Grid>
                            <br/><br/><br/>
                            <Grid item xs={12}>
                                <TextField 
                                    id="linkedin" 
                                    label="LinkedIn" 
                                    variant="outlined" 
                                    fullWidth
                                    value={this.state.linkedin}
                                    onChange={this.onChange}
                                    helperText={errors.linkedin}
                                    error={errors.linkedin}
                                />
                            </Grid>
                            <br/><br/><br/>
                            <Grid item xs={12}>
                                <TextField 
                                    id="Instagram" 
                                    label="Instagram" 
                                    variant="outlined" 
                                    fullWidth
                                    value={this.state.instagram}
                                    onChange={this.onChange}
                                    helperText={errors.instagram}
                                    error={errors.instagram}
                                />
                            </Grid>
                            <br/><br/><br/><br/>
                        </Grid>  
                        <Button 
                            id="submit"
                            type="submit"
                            color="secondary"
                            variant="contained"
                            style={{marginLeft:"200px"}} 
                            >
                                ADD!
                        </Button>   
                        <br/><br/>                   
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

export default connect(mapStateToProps, {createProfile})(withRouter(CreateProfile))