import React from 'react'
import {Link} from 'react-router-dom'
import {isLoggedIn} from '../redux/userReducer'
import {logoutUser} from '../redux/userReducer'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'


const Nav = (props) => {
    const isLoggedIn = props.userReducer
    return (
        <div>

            {isLoggedIn ?
            <nav>
                <ul>
                    <li><Link to='/'>HOME</Link></li>
                    <li><Link to='/'>MY ACCOUNT</Link></li>
                    <li><Link to='/auth'>LOGOUT</Link></li>
                </ul>
            </nav>
            :
            <nav>
                <ul>

                    <li><Link to='/'>HOME</Link></li>
                    <li><Link to='/auth'>Sign In</Link></li>
                </ul>
            </nav>}
        </div>
           
    )
}
const mapStateToProps = reduxState => reduxState
export default connect(mapStateToProps, {logoutUser})(withRouter(Nav))