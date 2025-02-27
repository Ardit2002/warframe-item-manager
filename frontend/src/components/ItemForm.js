import React, { useState, useEffect } from 'react';

const ItemForm = ({ onSubmit, editingItem }) => {
    const [item, setItem] = useState({ name: '', description: '', price: '' });

    useEffect(() => {
        if (editingItem) setItem(editingItem);
    }, [editingItem]);

    const handleChange = (e) => {
        setItem({ ...item, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(item);
        setItem({ name: '', description: '', price: '' });
    };

    return (
        <form onSubmit={handleSubmit} className="my-4">
            <input name="name" value={item.name} onChange={handleChange} placeholder="Name" />
            <input name="description" value={item.description} onChange={handleChange} placeholder="Description" />
            <input name="price" value={item.price} onChange={handleChange} placeholder="Price" type="number" />
            <button type="submit">{editingItem ? 'Update' : 'Add'} Item</button>
        </form>
    );
};

export default ItemForm;
