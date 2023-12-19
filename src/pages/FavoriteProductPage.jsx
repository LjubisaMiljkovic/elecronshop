import React from 'react'
import SingleCardComponents from '../components/SingleCardComponents';
import { useSelector } from 'react-redux';

function FavoriteProductPage() {
    const { favorite } = useSelector(state => state.favoriteStore);

    return (
        <div className='container mx-auto'>
            <div className='flex flex-wrap gap-5'>
                {favorite.map((fav, index) => {
                    return <SingleCardComponents product={fav} />
                })}
            </div>
        </div>
    )
}

export default FavoriteProductPage