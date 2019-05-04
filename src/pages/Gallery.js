import React from 'react';
import axios from 'axios';
import {  Button } from 'reactstrap';
    import "../App.css"

import Cardy from '../components/Card'
import FilterSearch from '../components/FilterSearch'
import GalleryButton from '../components/GalleryButtons'
import Loader from '../components/Loader'

class Gallery extends React.Component {
    state = {
        category : 'None',
        images : [],
        search : '',
        loading : true,
    }

    componentDidMount()  {
        axios.get('https://aqueous-journey-66824.herokuapp.com/paintings/offer')
        .then(result => {

            for (let i =0;i<result.data.length;i++){
                const { name, description,category,image,id, } = result.data[i]
                this.setState({
                    images: [
                        ...this.state.images,
                        { name, description,category,image,id }
                    ]
                })
            }
            
            this.setState({loading : false})
            
        })
        .catch(error => {    
            console.log('ERROR: ', error)
        })
    }
        
    handleClickModern = () => {
        this.setState({category : 'Modern'})
    }

    handleClickAll = () => {
        this.setState({category : 'None'})
    }

    handleClickRomantic = () => {
        this.setState({category : 'Romantic'})
    }

    handleClickDrawing = () => {
        this.setState({category : 'Drawing'})
    }

    handleClickPhotography = () => {
        this.setState({category : 'Photography'})
    }
       
    updateSearch = (event) => {
        this.setState({search: event.target.value})
    }

    
    render(){
        
        let filteredNames = this.state.images.filter(
            (image) => {
                return image.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
            }
        )
        if(this.state.loading===true){
            return(
                <>
                    <Loader/>
                </>
            )
        }
        else if (this.state.category === "Photography") {
        return (
            <>
            <GalleryButton handleClickModern={this.handleClickModern} handleClickAll={this.handleClickAll} handleClickRomantic={this.handleClickRomantic} handleClickDrawing={this.handleClickDrawing} handleClickPhotography={this.handleClickPhotography}/>
            <FilterSearch category={this.state.category} updateSearch={this.updateSearch} search={this.state.search}/>
                { 
                   filteredNames.map(image => {
                        return(
                            image.category==="Photography"
                            ? 
                            <Cardy key={image.id} image={image}/>    

                            : 
                            ""
                        )
                    }
                    )	
                } 
            </>
            
                
        )
        }
        else if (this.state.category === "Modern") {
            return(
                <>
                <GalleryButton handleClickModern={this.handleClickModern} handleClickAll={this.handleClickAll} handleClickRomantic={this.handleClickRomantic} handleClickDrawing={this.handleClickDrawing} handleClickPhotography={this.handleClickPhotography}/>
                <FilterSearch category={this.state.category} updateSearch={this.updateSearch} search={this.state.search}/>
                { 
                    filteredNames.map(image => {
                        return(
                            image.category==="Modern"
                            ? 
                            <Cardy key={image.id}  image={image}/>
                            : 
                            ""
                        )
                    }
                    )	
                } 
                </>
            )
        }
        else if (this.state.category === "Drawing") {
            return(
                <>
                <div className="button">
                    <Button onClick={this.handleClickAll} color="info" className="butt">All</Button><Button onClick={this.handleClickModern} color="primary" className="butt">Modern</Button><Button onClick={this.handleClickRomantic} color="success" className="butt">Romantic</Button><Button onClick={this.handleClickDrawing} color='warning' className="butt">Drawing</Button><Button onClick={this.handleClickPhotography} color='danger' className="butt">Photography</Button>
                </div>
                <FilterSearch category={this.state.category} updateSearch={this.updateSearch} search={this.state.search}/>
                { 
                    filteredNames.map(image => {
                        return(
                            image.category==="Drawing"
                            ? 
                                <Cardy key={image.id} image={image}/>
                            : 
                            ""
                        )
                    }
                    )	
                } 
                </>
            )
        }

        else if (this.state.category === "Romantic") {
            return(
                <>
                <GalleryButton handleClickModern={this.handleClickModern} handleClickAll={this.handleClickAll} handleClickRomantic={this.handleClickRomantic} handleClickDrawing={this.handleClickDrawing} handleClickPhotography={this.handleClickPhotography}/>
                <FilterSearch category={this.state.category} updateSearch={this.updateSearch} search={this.state.search}/>
                { 
                    filteredNames.map(image => {
                        return(
                            image.category==="Romantic"
                            ? 
                            <Cardy  key={image.id} image={image}/>
                            : 
                            ""
                        )
                    }
                    )	
                } 
                </>
            )
        }

        else{
            return(
                <>
                <GalleryButton handleClickModern={this.handleClickModern} handleClickAll={this.handleClickAll} handleClickRomantic={this.handleClickRomantic} handleClickDrawing={this.handleClickDrawing} handleClickPhotography={this.handleClickPhotography}/>
                <FilterSearch category={this.state.category} updateSearch={this.updateSearch} search={this.state.search}/>
                { 
                    filteredNames.map(image => {
                        return(
                            <Cardy key={image.id} image={image}/>

                        )
                    }
                    )	
                } 
                </>
            )
        }
    }
}
export default Gallery