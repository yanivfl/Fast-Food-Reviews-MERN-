import React, {Component} from 'react'
import {connect} from 'react-redux'
import MainActions from '../../../actions'
import AppActions from '../../../../App/actions'
import UserCard from '../../GenericComponents/UserCard'
import SearchBar from '../../GenericComponents/SearchBar'
import Loader from 'react-loader-spinner'
import './UsersInfo.scss'

class UsersInfo extends Component {

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
        this.props.OpenLoadingScreen();
        this.props.loadUserProfilesEventHandler(this.props.search_by_name_value, this.props.search_by_location_value);
    }

    render() {
        console.log("test is loading: ", this.props.isLoading);
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
                {this.props.isLoading ? 
                    <Loader className="loader" type="Oval" color="Blue"/> :
                    this.props.user_profiles.length > 0 ? 
                        <div className="grid-user">
                            {this.props.user_profiles.map((user, index) => (
                                    <UserCard history={this.props.history}
                                            setReviews={(user_name) => this.props.setReviewsByUsername(user_name)} //CHANGE TO SERACH
                                            user={user} 
                                            key={index}
                                            className="grid-user-item"/>
                                )
                            )}
                        </div>
                        :
                        <div className="user-search-text">Username does not exist</div> 
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state['app'].get('isLoading'),
        user_profiles: state['main'].get('user_profiles'),
        search_by_name_value: state['main'].get('search_by_name_value'),
        search_by_location_value: state['main'].get('search_by_location_value'),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        OpenLoadingScreen: () => {
            dispatch(AppActions.OpenLoadingScreen());
        },
        loadUserProfilesEventHandler: (name, location) => {
            dispatch(MainActions.loadUserProfiles(name, location));
        },
        setSearchField: (searchBy, value) => {
            dispatch(MainActions.setSearchField(searchBy, value));
        },
        setReviewsByUsername: (user_name) => {
            dispatch(MainActions.setReviewsByUsername(user_name))
        },
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(UsersInfo);
