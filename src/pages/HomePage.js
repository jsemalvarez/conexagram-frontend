import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startGetPhotos } from '../actions/photo'
import { Loading } from '../components/ui/Loading'

import { Navbar } from '../components/ui/Navbar'
import { ListPhotos } from '../components/photos/ListPhotos'

export const HomePage = () => {

    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.ui)
    const { photosTotal, photosPerPage } = useSelector(state => state.photo)
    
    const [nroPage, setNroPage] = useState(1)

    const handlePagination = ( pagina ) => {

        if( pagina > 3 && pagina <= ( Math.ceil(photosTotal/ photosPerPage) - 5 ) ){
            setNroPage( pagina - 2 )
        }else if( pagina < 4 ){
            setNroPage( 1 )
        }else if( pagina > Math.ceil(photosTotal/ photosPerPage) - 5 ){
            setNroPage( Math.ceil(photosTotal/ photosPerPage) - 5 )
        }
        
        dispatch( startGetPhotos( pagina * photosPerPage ) )
    }

    return (
        <>
            <Navbar />
            {
                loading ?
                (
                    <Loading />
                ):(
                    <div className="main-container">
                        
                        <ListPhotos />
                        <div className="pagination">
                            <button className="secondary-button pagination-button" onClick={ () => handlePagination( 1 ) }> { '<<' } </button>
                            <button className="secondary-button pagination-button" onClick={ () => handlePagination( nroPage ) }> { nroPage } </button>
                            <button className="secondary-button pagination-button" onClick={ () => handlePagination( nroPage + 1 ) }> { nroPage + 1 } </button>
                            <button className="secondary-button pagination-button" onClick={ () => handlePagination( nroPage + 2 ) }> { nroPage + 2  } </button>
                            <button className="secondary-button pagination-button" onClick={ () => handlePagination( nroPage + 3 ) }> { nroPage + 3 } </button>
                            <button className="secondary-button pagination-button" onClick={ () => handlePagination( nroPage + 4 ) }> { nroPage + 4 } </button>
                            <button className="secondary-button pagination-button" onClick={ () => handlePagination( Math.ceil( photosTotal/ photosPerPage) - 1 )  }> { '>>' } </button>
                        </div>
                    </div>           
                )
            }

        </>
    )
}
