import React from "react";

interface Props {
  formData: any;
  handleChange: (e: React.ChangeEvent<any>) => void;
  categories: any[];
  subcategories: any[];
}

export function BookFormFields({ formData, handleChange, categories, subcategories }: Props) {
  return (
    <>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
      />

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
      />

      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
      />

      <select name="categoryId" value={formData.categoryId} onChange={handleChange}>
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <select name="subcategoryId" value={formData.subcategoryId} onChange={handleChange}>
        <option value="">Select Subcategory</option>
        {subcategories.map((sub) => (
          <option key={sub.id} value={sub.id}>
            {sub.name}
          </option>
        ))}
      </select>

      <input
        type="file"
        name="coverImage"
        accept="image/*"
        onChange={handleChange}
      />
    </>
  );
}