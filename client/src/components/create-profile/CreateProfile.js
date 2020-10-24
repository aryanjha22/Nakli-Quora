import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'


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
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        const {errors} = this.state
        return (
            <div>
                
            </div>
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