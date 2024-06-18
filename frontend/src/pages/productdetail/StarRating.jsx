/* import React from 'react';

import { FaStar, FaStarHalfAlt, FaRegStar  } from "react-icons/fa";

const StarRating = ({ rating }) => {
    const fullStar = Math.floor(rating / 2);
    const halfStar = rating % 2 >= 1 ? 1 : 0;
    const emptyStars = 5 - fullStar - halfStar;

    return (
        <div className='star-rating'>
            {Array(fullStar)
            .fill()
            .map((_, index) => (
                < FaStar />
            ))}
            {halfStar === 1 && <FaStarHalfAlt />}
            {Array(emptyStars)
            .fill()
            .map((_, index) => (
                <FaRegStar />
            ))}
            </div>
    );
};

export default StarRating; */


/* import React from "react";
import { GiSkull, GiSkullCrossedBones } from "react-icons/gi";

const StarRating = ({ rating }) => {
    const fullSkulls = Math.floor(rating / 2);
    const halfSkull = rating % 2 >= 1 ? 1 : 0;
    const emptySkulls = 5 - fullSkulls - halfSkull;

            return (
                <div className='star-rating'>
                  {Array(fullSkulls)
                    .fill()
                    .map((_, index) => (
                      <GiSkull key={index} />
                    ))}
                  {halfSkull === 1 && <GiSkullCrossedBones />}
                  {Array(emptySkulls)
                    .fill()
                    .map((_, index) => (
                      <GiSkullCrossedBones key={index} />
                    ))}
                </div>
    );
};

export default StarRating; */


import React from "react";
import { WiMoonFull, WiMoonNew, WiMoonAltFirstQuarter } from "react-icons/wi";



const StarRating = ({ rating }) => {
    const fullMoon = Math.floor(rating / 2);
    const halfMoon = rating % 2 >= 1 ? 1 : 0;
    const emptyMoon = 5 - fullMoon - halfMoon;

            return (
                <div className='star-rating'>
                {Array(fullMoon)
                    .fill()
                    .map((_, index) => (
                        <WiMoonFull key={index} />                    
                    ))}
                {halfMoon === 1 && <WiMoonAltFirstQuarter key="halfMoon" />}
                {Array(emptyMoon)
                    .fill()
                    .map((_, index) => (
                      <WiMoonNew key={index} />
                    ))}
                </div>
    );
};

export default StarRating;


