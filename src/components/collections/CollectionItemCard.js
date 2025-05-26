// src/components/collections/CollectionItemCard.js
import React from 'react';

const CollectionItemCard = ({ item, onRemoveFromCollection }) => {
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
    flexGrow: 1,
  };

  const buttonStyle = {
    backgroundColor: '#dc3545', /* Red for remove */
    color: 'white',
    padding: '8px 12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px',
  };

  return (
    <div style={cardStyle}>
      <img src={item.menuItem?.imageUrl || 'https://via.placeholder.com/150'} alt={item.menuItem?.name} style={imageStyle} />
      <h3 style={titleStyle}>{item.menuItem?.name || 'Unknown Item'}</h3>
      <p style={descriptionStyle}>{item.menuItem?.description || 'No description available.'}</p>
      <p>Category: {item.menuItem?.category || 'N/A'}</p>
      <p>Price: ${item.menuItem?.price ? item.menuItem.price.toFixed(2) : 'N/A'}</p>
      <button onClick={() => onRemoveFromCollection(item._id)} style={buttonStyle}>
        Remove from Collection
      </button>
    </div>
  );
};

export default CollectionItemCard;