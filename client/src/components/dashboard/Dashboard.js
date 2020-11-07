import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getCurrentProfile} from '../../actions/profileActions'
import Spinner from '../Spinner'
import {Button, Container} from '@material-ui/core'
import {Link} from 'react-router-dom'


class Dashboard extends Component {
    componentDidMount(){
        this.props.getCurrentProfile()
    }
    render() {
        const {user} = this.props.auth
        const {profile, loading} = this.props.profile

        let dashboardContent

        if(profile ===null || loading){
            dashboardContent = <Spinner/>
        } else{
            //Check if logged in for 1st time
            if(Object.keys(profile).length > 0){
                dashboardContent = <h4>TODO : DISPLAYED!</h4>
            } else{
                //User is logged in but no profile
                dashboardContent = (
                    <Container maxWidth="xs">
                        <div>
                            <h4>WELCOME!!! {user.first_name}</h4>
                            <p>You have not Yet setup your Profile yet! Setup One!</p>
                            <Button variant="outlined" color="primary" size="large">
                                <Link to="/create-profile">
                                    Create
                                </Link>
                            </Button>

                        </div>
                    </Container>
                )
            }
        }

        return (
            <Container>
                <div className="dashboard">
                    <h1><Container maxWidth="xs">Dashboard</Container></h1>
                    {dashboardContent}
                </div>
            </Container>
        )
    }
}

Dashboard.propTypes ={
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps, {getCurrentProfile})(Dashboard)