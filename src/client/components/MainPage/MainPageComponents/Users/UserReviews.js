import React, {Component} from "react"
import {connect} from "react-redux"
import MainActions from "../../actions"
import ReviewCard from "../Review/ReviewCard"
import './UserReviews.scss'

class UserReviews extends Component {

    componentDidMount() {
        this.props.loadUserReviewsEventHandler(this.props.user_name);
    }
    //todo: fix buffer to url in reducer
    //change the h1 div to red
    render() {
        return (
            <div className="reviews-content">
                <div className="reviews-header">Manage your Reviews</div>    
             {console.log('test user reviews')}
             {console.log(this.props.user_reviews)}
             {this.props.user_reviews.length > 0 ? 
             <ReviewCard user_reviews={this.props.user_reviews}
                         onDelete={(review_id) => this.props.deleteReviewEventHandler(review_id)}/> : 
             <h1>You dont have Reviews yet</h1>}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user_name: state['login'].get('user_name'),
        user_reviews: state['main'].get('user_reviews'),

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadUserReviewsEventHandler: (user_name) => {
            dispatch(MainActions.loadUserReviews(user_name));
        },
        deleteReviewEventHandler: (review_id) => {
            console.log('test review id' + review_id);
            dispatch(MainActions.deleteReview(review_id));
        },
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(UserReviews);
