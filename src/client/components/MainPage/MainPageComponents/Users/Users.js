import React, {Component} from "react";
import {connect} from "react-redux";
import MainActions from "../../actions";
import './Users.scss'
import UserCard from "../GenericComponents/UserCard";
import SearchBar from "../GenericComponents/SearchBar";
import Loader from "react-loader-spinner";
import ClearIcon from '@material-ui/icons/Clear';
//todo: if no user found print no user found
class Users extends Component {

    constructor(props) {
        super(props);
        this.timeout = 0;
    }

    doSearch(searchBy, event) {
        var searchText = event.target.value; // this is the search text
        this.props.setSearchField(searchBy, searchText);

        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            console.log('call backend!!!!');
            this.props.loadUserProfilesEventHandler(this.props.search_by_name_value, this.props.search_by_location_value);
        }, 600);
    }

    componentDidMount() {
        this.props.loadUserProfilesEventHandler(this.props.search_by_name_value, this.props.search_by_location_value);
    }

    render() {

        console.log("test user profiles", this.props.user_profiles);
        console.log("props are: ", this.props);
        return (
            <div className="users-page">
                <div className="users-searchbars">
                    <SearchBar placeholder={'Search by name'}
                               onChange={(event) => this.doSearch('name', event)}
                               defaultValue={this.props.search_by_name_value}
                               isIconDisplayed={false}
                    />
                    <div className="border" />
                    <SearchBar placeholder={'Search by location'}
                               onChange={(event) => this.doSearch('location', event)}
                               defaultValue={this.props.search_by_location_value}
                               isIconDisplayed={true}
                    />
                </div>
                {this.props.user_profiles.length > 0 ? 
                    <div className="grid-user">
                        {this.props.user_profiles.map((user, index) => (
                                <UserCard user={user} key={index} className="grid-user-item"/>
                            )
                        )}
                    </div>
                    :
                    <div className="user-search-text">The username you are looking for does not exist</div> 
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user_profiles: state['main'].get('user_profiles'),
        search_by_name_value: state['main'].get('search_by_name_value'),
        search_by_location_value: state['main'].get('search_by_location_value'),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadUserProfilesEventHandler: (name, location) => {
            dispatch(MainActions.loadUserProfiles(name, location));
        },

        setSearchField: (searchBy, value) =>
            dispatch(MainActions.setSearchField(searchBy, value))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Users);
