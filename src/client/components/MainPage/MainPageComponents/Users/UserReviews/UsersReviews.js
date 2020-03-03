import React, {Component} from "react"
import {connect} from "react-redux"
import MainActions from "../../../actions"
import ReviewCard from "../../Review/ReviewCard"
import AppActions from "../../../../App/actions"
import Loader from 'react-loader-spinner'
import './UserReviews.scss'

class UsersReviews extends Component {

    componentDidMount() { 
        this.props.OpenLoadingScreen();
        this.props.loadUserReviewsEventHandler(this.props.reviews_by_user_name);
    }
    //change the h1 div to red
    render() {
        console.log('UsersReviews Component')
        return (
            <div className="reviews-content">
                <div className="reviews-header">{this.props.reviews_by_user_name}'s Reviews</div>    
             {console.log('test user reviews')}
             {console.log(this.props.user_reviews)}
             {this.props.isLoading ? 
                <Loader className="loader" type="Oval" color="Blue"/> :
                this.props.user_reviews.length > 0 ? 
                    <ReviewCard user_reviews={this.props.user_reviews}
                                permission={false}/>
                    : 
                    <h1>{this.props.reviews_by_user_name} doesn't have reviews yet</h1>}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        reviews_by_user_name: state['main'].get('reviews_by_user_name'),
        user_reviews: state['main'].get('user_reviews'),
        isLoading: state['app'].get('isLoading'),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        OpenLoadingScreen: () => {
            dispatch(AppActions.OpenLoadingScreen());
        },
        loadUserReviewsEventHandler: (user_name) => {
            dispatch(MainActions.loadUserReviews(user_name));
        },
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(UsersReviews);
