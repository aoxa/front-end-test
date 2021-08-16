import {NavLink} from 'reactstrap';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';

const Logout = (props) => {
    return (
        <NavLink href="#" onClick={props.logout} >
            Logout
            </NavLink>
    );
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(mapStateToProps, {logout})(Logout)