// src/components/collections/CollectionItemCard.js

import React, { useState } from 'react';

const CollectionItemCard = ({ item, onRemoveFromCollection }) => {
  const [showModal, setShowModal] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [modalImageError, setModalImageError] = useState(false);

  console.log('=== DEBUGGING COLLECTION ITEM ===');
  console.log('Raw item received:', JSON.stringify(item, null, 2));
  console.log('Item type:', typeof item);
  console.log('Item keys:', Object.keys(item || {}));
  
  // Check all possible data locations
  console.log('item.menuItems:', item?.menuItems);
  console.log('item.menuItem:', item?.menuItem);
  console.log('item.menuItemId:', item?.menuItemId);
  console.log('item.data:', item?.data);
  console.log('item.recipe:', item?.recipe);
  
  // More robust data extraction with detailed logging
  let displayData = {};
  
  if (item?.menuItems && Array.isArray(item.menuItems) && item.menuItems.length > 0) {
      displayData = item.menuItems[0];
      console.log('Using menuItems[0]:', displayData);
    } else if (item?.menuItem && typeof item.menuItem === 'object') {
      displayData = item.menuItem;
      console.log('Using menuItem:', displayData);
    } else if (item?.menuItemId && typeof item.menuItemId === 'object') {
      displayData = item.menuItemId;
      console.log('Using menuItemId:', displayData);
    } else if (item?.data && typeof item.data === 'object') {
      displayData = item.data;
      console.log('Using data:', displayData);
    } else if (item?.recipe && typeof item.recipe === 'object') {
      displayData = item.recipe;
      console.log('Using recipe:', displayData);
    } else {
      displayData = item || {};
      console.log('Using item directly:', displayData);
    }

  // Extract display values with comprehensive fallbacks
  const displayName = displayData?.menuItemName || displayData?.name || displayData?.title || displayData?.dishName || 
                     item?.menuItemName || item?.name || item?.title || item?.dishName || 'Unknown Item';
  const displayCategory = displayData?.menuItemCategory || displayData?.category || displayData?.type || 
                         item?.menuItemCategory || item?.category || item?.type || 'N/A';
  const displayDescription = displayData?.menuItemDescription || displayData?.description || displayData?.desc || 
                            item?.menuItemDescription || item?.description || item?.desc || 'No description available.';
  const displayImageUrl = displayData?.menuItemImage || displayData?.imageUrl || displayData?.image || displayData?.photo || displayData?.img || 
                          item?.menuItemImage || item?.imageUrl || item?.image || item?.photo || item?.img;
  const displayIngredients = displayData?.ingredients || item?.ingredients || [];
  const displayTutorial = displayData?.tutorial || displayData?.steps || displayData?.instructions || 
                         item?.tutorial || item?.steps || item?.instructions || [];
  const displayRating = displayData?.rating || item?.rating || 0;

  console.log('=== EXTRACTED VALUES ===');
  console.log('Name:', displayName);
  console.log('Category:', displayCategory);
  console.log('Description:', displayDescription);
  console.log('Image URL:', displayImageUrl);
  console.log('Ingredients:', displayIngredients);
  console.log('Tutorial:', displayTutorial);
  console.log('Rating:', displayRating);
  console.log('=== END DEBUG ===');

  // ... keep existing code (all the style definitions)

  const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    margin: '10px',
    backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    maxWidth: '300px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s'
  };

  const imageStyle = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '4px',
    marginBottom: '12px'
  };

  const titleStyle = {
    fontSize: '1.2em',
    fontWeight: 'bold',
    marginBottom: '8px',
    color: '#333'
  };

  const categoryStyle = {
    fontSize: '0.9em',
    color: '#666',
    marginBottom: '8px',
    fontStyle: 'italic'
  };

  const descriptionStyle = {
    fontSize: '0.9em',
    color: '#555',
    lineHeight: '1.4',
    marginBottom: '16px',
    textAlign: 'left'
  };

  const buttonStyle = {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9em',
    width: '100%',
    transition: 'background-color 0.2s'
  };

  const buttonHoverStyle = {
    backgroundColor: '#c82333'
  };

  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  };

  const modalContentStyle = {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '24px',
    maxWidth: '600px',
    maxHeight: '80vh',
    overflow: 'auto',
    margin: '20px'
  };

  //compiled error solutions
  const placeholderStyle = {
    ...imageStyle,
    backgroundColor: '#f0f0f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#666',
    fontSize: '14px'
  };

//event handlers and renderimage
  const handleCardClick = (e) => {
    if (e.target.tagName === 'BUTTON') {
      return;
    }
    setShowModal(true);
  };

  const handleRemoveFromCollection = (e) => {
    e.stopPropagation();
    onRemoveFromCollection(item._id || item.id);
  };

  const handleImageError = () => {
    console.log('Image failed to load:', displayImageUrl);
    setImageError(true);
  };

  const handleModalImageError = () => {
    console.log('Modal image failed to load:', displayImageUrl);
    setModalImageError(true);
  };

  const renderImage = (isModal = false) => {
    const hasValidUrl = displayImageUrl && displayImageUrl.trim() !== '';
    const hasError = isModal ? modalImageError : imageError;
    
    if (!hasValidUrl || hasError) {
      return (
        <div style={isModal ? { ...placeholderStyle, height: '250px' } : placeholderStyle}>
          No Image Available
        </div>
      );
    }

    return (
      <img 
        src={displayImageUrl} 
        alt={displayName}
        style={isModal ? { ...imageStyle, height: '250px' } : imageStyle}
        onError={isModal ? handleModalImageError : handleImageError}
        onLoad={() => {
          console.log('Image loaded successfully:', displayImageUrl);
        }}
      />
    );
  };
//

  return (
    <>
      <div 
        style={cardStyle}
        onClick={handleCardClick}
      >
        {/* Image with proper error handling */}
        {renderImage(false)}
        
        {/* Menu Name */}
        <h3 style={titleStyle}>{displayName}</h3>
        
        {/* Category */}
        <p style={categoryStyle}>Category: {displayCategory}</p>
        
        {/* Description */}
        <p style={descriptionStyle}>
          {displayDescription && displayDescription.length > 80 
            ? `${displayDescription.substring(0, 80)}...`
            : displayDescription
          }
        </p>
        
        {/* Remove from Collection Button */}
        <button 
          style={buttonStyle}
          onMouseEnter={(e) => Object.assign(e.target.style, buttonHoverStyle)}
          onMouseLeave={(e) => Object.assign(e.target.style, buttonStyle)}
          onClick={handleRemoveFromCollection}
        >
          Remove from Collection
        </button>
      </div>

      {/* ... keep existing code (modal implementation) */}
      {showModal && (
        <div style={modalOverlayStyle} onClick={() => setShowModal(false)}>
          <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ margin: 0, color: '#333' }}>{displayName}</h2>
              <button 
                onClick={() => setShowModal(false)}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  fontSize: '24px', 
                  cursor: 'pointer',
                  color: '#666'
                }}
              >
                ×
              </button>
            </div>

            {/* Image */}
             {renderImage(true)}

            {/* Category and Rating */}
            <div style={{ marginBottom: '16px' }}>
              <p style={{ margin: '0 0 8px 0', fontWeight: 'bold', color: '#666' }}>
                Category: {displayCategory}
              </p>
              <p style={{ margin: '0', color: '#666' }}>
                Rating: {displayRating}/5 ⭐
              </p>
            </div>

            {/* Description */}
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ color: '#333', marginBottom: '8px' }}>Description</h3>
              <p style={{ lineHeight: '1.6', color: '#555' }}>
                {displayDescription}
              </p>
            </div>

            {/* Ingredients */}
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ color: '#333', marginBottom: '8px' }}>Ingredients</h3>
              {displayIngredients && displayIngredients.length > 0 ? (
                <ul style={{ paddingLeft: '20px' }}>
                  {displayIngredients.map((ingredient, index) => (
                    <li key={index} style={{ marginBottom: '4px', color: '#555' }}>
                      {ingredient}
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ color: '#888', fontStyle: 'italic' }}>No ingredients listed.</p>
              )}
            </div>

            {/* Tutorial */}
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ color: '#333', marginBottom: '8px' }}>How to Make</h3>
              {displayTutorial && displayTutorial.length > 0 ? (
                <ol style={{ paddingLeft: '20px' }}>
                  {displayTutorial.map((step, index) => (
                    <li key={index} style={{ marginBottom: '8px', color: '#555', lineHeight: '1.5' }}>
                      {step}
                    </li>
                  ))}
                </ol>
              ) : (
                <p style={{ color: '#888', fontStyle: 'italic' }}>No tutorial available.</p>
              )}
            </div>

            {/* Remove from Collection in Modal */}
            <button 
              style={{
                ...buttonStyle,
                marginBottom: 0
              }}
              onMouseEnter={(e) => Object.assign(e.target.style, buttonHoverStyle)}
              onMouseLeave={(e) => Object.assign(e.target.style, buttonStyle)}
              onClick={handleRemoveFromCollection}
            >
              Remove from Collection
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CollectionItemCard;