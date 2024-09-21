import React from 'react';
import './Review.css'; // Import your CSS file for styling
import Sneha from "./User_img/S.png"
import Vinod from "./User_img/V.png"
import Bhu from "./User_img/B.png"
import Ash from "./User_img/A.png"
import Md from "./User_img/M.png"
import Dar from "./User_img/D.png"
import Var from "./User_img/V1.png"

const reviews = [
    {
        name: 'Sneha Gowda',
        imgSrc: Sneha,
        content: 'I wanted birthday decor for my 2year baby girl and at last moment I reached out to Ranjith. He really made his work very nice and the decor was too good. My go to option  for decor would be Dot 2 Dot👍',
        stars: 5
    },
    {
        name: 'Vinod Gowda',    
        imgSrc:  Vinod,
        content: 'best price❤️🥰⚡',
        stars: 5
    },
    {
        name: 'Bhumika',
        imgSrc:  Bhu,
        content: "Dot 2 dot events is truly the go-to solution for all your event needs, whether it's a birthday party,get together, wedding,and more. Ranjith the man behind this is the most humble man i worked with his  exceptional humility.... ",
        stars: 5
    }, 
     {
        name: 'Ashu dharana',
        imgSrc:  Ash,
        content: "Excellent service at economical prices we hired him for our house warming ceremony and the flower decor came out so beautiful everyone still remembers.Ranjith is very dedicated n passionate about his work u jus hv to....",
        stars: 5
    }, 
     {
        name: 'Md yaseen Yaseen',
        imgSrc:  Md ,
        content: 'Well Decorated Thanks Dot2Dot Team for wonderful Arrangements',
        stars: 5
    }, 
     {
        name: 'Darshan L',
        imgSrc:  Dar,
        content: "Very well organised team, best part is scheduling the event and maintaining up to mark. Led by a strong leader and very supportive team.",
        stars: 5
    }, 
     {
        name: 'Varun Tharanath',
        imgSrc: Var,
        content: 'Very professional, Ranjith would ensure he would give you an amazing quality in an affordable price. You can blindly trust these guys.',
        stars: 5
    },
];

const Review = () => {
    return (
        <div>
            <h2 className="reviews-heading">Recent Customer Reviews</h2>
            <div className="reviews-container">
                {reviews.map((review, index) => (
                    <div key={index} className="review-card">
                        <img src={review.imgSrc} alt={review.name} className="review-img" />
                        <div className="review-content">
                            <div className="stars">
                                {[...Array(review.stars)].map((_, starIndex) => (
                                    <span key={starIndex} className="star-icon">★</span>
                                ))}
                            </div>
                            <p>{review.content}</p>
                            <p><strong>Posted by:</strong> {review.name}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Review;
