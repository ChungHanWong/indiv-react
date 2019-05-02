import React from 'react';
import { Button } from 'reactstrap';

const GalleryButton = ({handleClickAll,handleClickDrawing,handleClickModern,handleClickPhotography,handleClickRomantic}) => {
    return(
        <>
            <div className="button">
                <Button onClick={handleClickAll} color="info" className="butt">All</Button>
                <Button onClick={handleClickModern} color="primary" className="butt">Modern</Button>
                <Button onClick={handleClickRomantic} color="success" className="butt">Romantic</Button>
                <Button onClick={handleClickDrawing} color='warning' className="butt">Drawing</Button>
                <Button onClick={handleClickPhotography} color='danger' className="butt">Photography</Button>
            </div>

        </>
        
    )
}

export default GalleryButton