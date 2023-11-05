
import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
// Array of image objects
const gallery = [
      { id: "image-1", url: "/images/image-25.jpeg" },
      { id: "image-2", url: "/images/image-23.jpeg" },
      { id: "image-3", url: "/images/image-21.jpeg" },
      { id: "image-4", url: "/images/image-22.jpeg" },
      { id: "image-5", url: "/images/image-20.jpeg" },
      { id: "image-6", url: "/images/image-15.jpg" },
      { id: "image-7", url: "/images/image-16.jpg" },
      { id: "image-8", url: "/images/image-13.jpg" },
      { id: "image-9", url: "/images/image-11.png" },
      { id: "image-10", url: "/images/image-18.jpeg" },
      { id: "image-11", url: "/images/image-24.png" },
      { id: "image-8", url: "/images/image-17.JPG" },
      { id: "image-9", url: "/images/image-12.png" },
      { id: "image-10", url: "/images/image-14.jpg" },
      { id: "image-11", url: "/images/image-19.jpeg" },
    
     
    ]

const Gallery = () => {
  const [images, setImages] = useState(gallery);
  const [selectedImages, setSelectedImages] = useState([]);
  const [featureImage, setFeatureImage] = useState(images[0]);
// For image selection
  const handleCheckboxChange = (index) => {
      const isSelected = selectedImages.includes(index);
      let newSelectedImages;
  
      if (isSelected) {
        newSelectedImages = selectedImages.filter((selectedIndex) => selectedIndex !== index);
      } else {
        newSelectedImages = [...selectedImages, index];
      }
  
      setSelectedImages(newSelectedImages);
    };

    const selectedFilesCount = selectedImages.length;

// For image deletion
    const handleDeleteImages = () => {
      const updatedImages = images.filter((_, index) => !selectedImages.includes(index));
      setImages(updatedImages);
      setSelectedImages([]);
    };

    // handle drag-and-drop reordering of images
  const handleDragAndDrop = (result) => {
      if (!result.destination) {
        return; // Dropped outside the list
      }
  
      // Reorder the images based on drag-and-drop
      const reorderedImages = Array.from(images);
      const [reorderedItem] = reorderedImages.splice(result.source.index, 1);
      reorderedImages.splice(result.destination.index, 0, reorderedItem);
  
      // Update state with reordered images 
      setImages(reorderedImages);
      setFeatureImage(reorderedImages[0]);
    };
      return (
           <div>
<div style={{display:'flex' ,alignItems:'center',justifyContent:'space-evenly', margin:'5px' }}>
      <div style={{color:"lightslategrey", fontSize:"20px"}}><strong>Total Selected Files: </strong>{selectedFilesCount}</div>
    <button className="delete-button"  onClick={handleDeleteImages}>Delete</button>
      </div>

      {/* Drag-and-drop context for handling drag events */}         
    <DragDropContext onDragEnd={handleDragAndDrop}>
         {/* Droppable area for images */}
      <Droppable droppableId="images">
        {(provided) => (
<div className="gallery-container" ref={provided.innerRef} {...provided.droppableProps}>
                {images.map((image, index) => (
           // Draggable component representing an image
           <Draggable key={image.id} draggableId={image.id.toString()} index={index}>
           {(provided) => (
             // Image container with drag handle
                  <div
                  ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`gallery-image ${selectedImages.includes(index) ? 'selected' : ''} ${
                        image === featureImage ? 'featured' : ''
                      }`}
                  >
                    <img src={image.url} alt={`Image Index: ${index}`} />
                      {/* For image selection */}
                    <input
                        type="checkbox"
                        checked={selectedImages.includes(index)}
                        onChange={() => handleCheckboxChange(index)}
                      />
                  </div>
            )}
            </Draggable>
          ))}
            {/* Placeholder for dropped items */}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </DragDropContext>
           </div> 
           
      );
};

export default Gallery;
