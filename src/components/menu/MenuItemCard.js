// src/components/menu/MenuItemCard.js
import React from 'react';

const MenuItemCard = ({ item, onAddToCollection }) => {
  const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px',
    margin: '10px',
    width: '250px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };

  const imageStyle = {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '4px',
    marginBottom: '10px',
  };

  const titleStyle = {
    fontSize: '1.2em',
    fontWeight: 'bold',
    marginBottom: '5px',
  };

  const descriptionStyle = {
    fontSize: '0.9em',
    color: '#666',
    marginBottom: '10px',
    flexGrow: 1, /* Allows description to take up available space */
  };

  const buttonStyle = {
    backgroundColor: '#28a745',
    color: 'white',
    padding: '8px 12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px', /* Ensure button is spaced from description */
  };

  return (
    <div style={cardStyle}>
      <img src={item.imageUrl || 'https://via.placeholder.com/150'} alt={item.name} style={imageStyle} />
      <h3 style={titleStyle}>{item.name}</h3>
      <p style={descriptionStyle}>{item.description}</p>
      <p>Category: {item.category}</p>
      <p>Price: ${item.price ? item.price.toFixed(2) : 'N/A'}</p>
      <button onClick={() => onAddToCollection(item._id)} style={buttonStyle}>
        Add to Collection
      </button>
    </div>
  );
};

export default MenuItemCard;