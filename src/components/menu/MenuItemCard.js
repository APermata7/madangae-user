// src/components/menu/MenuItemCard.js
import React, { useState } from 'react';

const MenuItemCard = ({ item, onAddToCollection, isInCollection }) => {
  const [showModal, setShowModal] = useState(false);  
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

  const cardHoverStyle = {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
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
    backgroundColor: isInCollection ? '#dc3545' : '#28a745',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9em',
    width: '100%',
    marginBottom: '8px',
    transition: 'background-color 0.2s'
  };

  const buttonHoverStyle = {
    backgroundColor: isInCollection ? '#c82333' : '#218838'
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

  const handleCardClick = (e) => {
    // Don't open modal if clicking on buttons
    if (e.target.tagName === 'BUTTON') {
      return;
    }
    setShowModal(true);
  };

  const handleAddToCollection = (e) => {
    e.stopPropagation();
    onAddToCollection(item._id);
  };

  return (
    <>
      <div 
        style={cardStyle}
        onMouseEnter={(e) => Object.assign(e.currentTarget.style, cardHoverStyle)}
        onMouseLeave={(e) => Object.assign(e.currentTarget.style, cardStyle)}
        onClick={handleCardClick}
      >
        {/* Image */}
        <img 
          src={item.imageUrl || 'https://via.placeholder.com/300x200?text=No+Image'} 
          alt={item.name}
          style={imageStyle}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
          }}
        />
        
        {/* Menu Name */}
        <h3 style={titleStyle}>{item.name}</h3>
        
        {/* Category */}
        <p style={categoryStyle}>Category: {item.category}</p>
        
        {/* Description */}
        <p style={descriptionStyle}>
          {item.description && item.description.length > 80 
            ? `${item.description.substring(0, 80)}...`
            : item.description || 'No description available.'
          }
        </p>
        
        {/* Add to Collection Button */}
        <button 
          style={buttonStyle}
          onMouseEnter={(e) => Object.assign(e.target.style, buttonHoverStyle)}
          onMouseLeave={(e) => Object.assign(e.target.style, buttonStyle)}
          onClick={handleAddToCollection}
          disabled={isInCollection}
        >
          {isInCollection ? 'Already in Collection' : 'Add to Collection'}
        </button>
      </div>

      {/* Detail Modal */}
      {showModal && (
        <div style={modalOverlayStyle} onClick={() => setShowModal(false)}>
          <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ margin: 0, color: '#333' }}>{item.name}</h2>
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
            <img 
              src={item.imageUrl || 'https://via.placeholder.com/400x250?text=No+Image'} 
              alt={item.name}
              style={{
                width: '100%',
                height: '250px',
                objectFit: 'cover',
                borderRadius: '8px',
                marginBottom: '20px'
              }}
            />

            {/* Category and Rating */}
            <div style={{ marginBottom: '16px' }}>
              <p style={{ margin: '0 0 8px 0', fontWeight: 'bold', color: '#666' }}>
                Category: {item.category}
              </p>
              <p style={{ margin: '0', color: '#666' }}>
                Rating: {item.rating || 0}/5 ⭐
              </p>
            </div>

            {/* Description */}
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ color: '#333', marginBottom: '8px' }}>Description</h3>
              <p style={{ lineHeight: '1.6', color: '#555' }}>
                {item.description || 'No description available.'}
              </p>
            </div>

            {/* Ingredients */}
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ color: '#333', marginBottom: '8px' }}>Ingredients</h3>
              {item.ingredients && item.ingredients.length > 0 ? (
                <ul style={{ paddingLeft: '20px' }}>
                  {item.ingredients.map((ingredient, index) => (
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
              {item.tutorial && item.tutorial.length > 0 ? (
                <ol style={{ paddingLeft: '20px' }}>
                  {item.tutorial.map((step, index) => (
                    <li key={index} style={{ marginBottom: '8px', color: '#555', lineHeight: '1.5' }}>
                      {step}
                    </li>
                  ))}
                </ol>
              ) : (
                <p style={{ color: '#888', fontStyle: 'italic' }}>No tutorial available.</p>
              )}
            </div>

            {/* Add to Collection in Modal */}
            <button 
              style={{
                ...buttonStyle,
                marginBottom: 0
              }}
              onMouseEnter={(e) => Object.assign(e.target.style, buttonHoverStyle)}
              onMouseLeave={(e) => Object.assign(e.target.style, buttonStyle)}
              onClick={handleAddToCollection}
              disabled={isInCollection}
            >
              {isInCollection ? 'Already in Collection' : 'Add to Collection'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MenuItemCard;