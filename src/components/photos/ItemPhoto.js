import React from 'react'

export const ItemPhoto = ({id, title, url}) => {
    return (
        <div className="image-card" key={ id }>
            <img src={ url } alt={ title } />    
            <div className="image-info">
                { title }
            </div>
        </div>
    )
}
