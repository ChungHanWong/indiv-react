import React from 'react';
import axios from 'axios';
import {  Button } from 'reactstrap';
    import "../App.css"

import Cardy from '../components/Card'
import FilterSearch from '../components/FilterSearch'
import GalleryButton from '../components/GalleryButtons'

class Gallery extends React.Component {
    state = {
        category : 'None',
        images : [],
        search : '',
    }

    componentDidMount()  {
        axios.get('http://127.0.0.1:5000/paintings/offer')
        .then(result => {
            
            for (let i =0;i<result.data.length;i++){
                let newName = result.data[i].name
                let description = result.data[i].description
                let category = result.data[i].category
                let image = result.data[i].image
                let id = result.data[i].id
                let obj = {}
                obj['name'] = newName
                obj['category'] = category
                obj['description'] = description
                obj['image'] = image
                obj['id'] = id
                
                let newnew= this.state.images
                newnew.push(obj)
            
                this.setState({
                    images : newnew,
                })
            }
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
                return image.name.toLowerCase().indexOf(this.state.search) !== -1
            }
        )
        if (this.state.category === "Photography") {
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