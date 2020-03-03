import React, {Component} from 'react'
import {connect} from 'react-redux'
import MainActions from '../../actions'
import ReviewCard from '../Review/ReviewCard'
import AppActions from '../../../App/actions'
import Loader from 'react-loader-spinner'

class RestaurantReviews extends Component {

    componentDidMount() { 
        this.props.OpenLoadingScreen();
        this.props.loadRestaurantReviewsEventHandler(this.props.reviews_by_restaurant_name);
    }

    //change the h1 div to red
    render() {
        console.log('restaurantReviews Component')
        return (
            <div className="reviews-content">
                <div className="reviews-header">{this.props.reviews_by_restaurant_name}'s Reviews</div>    
             {console.log('test restaurant reviews')}
             {console.log(this.props.restaurant_reviews)}
             {console.log(this.props.reviews_by_restaurant_name)}

             {this.props.isLoading ? 
                <Loader className="loader" type="Oval" color="Blue"/> :
                this.props.restaurant_reviews.length > 0 ? 
                    <ReviewCard restaurant_reviews={this.props.restaurant_reviews}
                                permission={false}/>
                    : 
                    <h1>{this.props.reviews_by_restaurant_name} doesn't have reviews yet</h1>}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        reviews_by_restaurant_name: state['main'].get('reviews_by_restaurant_name'),
        restaurant_reviews: state['main'].get('restaurant_reviews'),
        isLoading: state['app'].get('isLoading'),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        OpenLoadingScreen: () => {
            dispatch(AppActions.OpenLoadingScreen());
        },
        loadRestaurantReviewsEventHandler: (restaurant_name) => {
            dispatch(MainActions.loadRestaurantReviews(restaurant_name));
        },
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(RestaurantReviews);
