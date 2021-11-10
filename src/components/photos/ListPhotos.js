import React from 'react'
import { useSelector } from 'react-redux'
import { ItemPhoto } from './ItemPhoto'

export const ListPhotos = () => {

    const { photos } = useSelector(state => state.photo)

    return (
        <div className="images-container">

            {
                photos.map( photo =>(
                    <ItemPhoto {...photo} />
                ))
            }

        </div>
    )
}
