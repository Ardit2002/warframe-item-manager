import React from 'react';

const ItemList = ({ items, onDelete, onEdit }) => {
    return (
        <div>
            <h2 className="text-2xl font-bold my-4">Warframe Items</h2>
            <ul>
                {items.map(item => (
                    <li key={item._id} className="border p-3 my-2 flex justify-between items-center">
                        <div>
                            <strong>{item.name}</strong> - {item.description} - ${item.price}
                        </div>
                        <div>
                            <button 
                                onClick={() => onEdit(item)} 
                                className="bg-blue-500 text-white px-3 py-1 mx-2"
                            >
                                Edit
                            </button>
                            <button 
                                onClick={() => onDelete(item._id)} 
                                className="bg-red-500 text-white px-3 py-1"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ItemList;
