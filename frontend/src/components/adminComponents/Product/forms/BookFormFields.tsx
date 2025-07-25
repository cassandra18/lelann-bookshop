import React from "react";
import { BookFormData } from "../../../types/BookTypes";

interface Props {
  formData: BookFormData;
  handleChange: (e: React.ChangeEvent<any>) => void;
  categories: any[];
  subcategories: any[];
  authors: any[];
  publishers: any[];
}

const inputStyle = "border bg-gray-300 text-gray-700 rounded px-3 py-2 w-full focus:outline-none";


export function BookFormFields({
  formData,
  handleChange,
  categories,
  subcategories,
  authors,
  publishers,
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <h1 className="col-span-1 md:col-span-2 md:text-3xl text-2xl text-yellow-300">📚 Product Information</h1>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Product Name"
        className={inputStyle}
      />
      <input
        type="text"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
        className={inputStyle}
      />
      <input
        type="text"
        name="oldPrice"
        value={formData.oldPrice || ""}
        onChange={handleChange}
        placeholder="Old Price (optional)"
        className={inputStyle}
      />
      <input
        type="text"
        name="subject"
        value={formData.subject || ""}
        onChange={handleChange}
        placeholder="Subject (optional)"
        className={inputStyle}
      />
      <select
        name="condition"
        value={formData.condition}
        onChange={handleChange}
        className={inputStyle}
      >
        <option value="NEW">New</option>
        <option value="USED">Used</option>
        <option value="USED_GOOD">Used - Good</option>
        <option value="USED_VERY_GOOD">Used - Very Good</option>
        <option value="USED_ACCEPTABLE">Used - Acceptable</option>
      </select>

      <select
        name="categoryId"
        value={formData.categoryId || ""}
        onChange={handleChange}
        className={inputStyle}
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <select
        name="subcategoryId"
        value={formData.subcategoryId || ""}
        onChange={handleChange}
        className={inputStyle}
      >
        <option value="">Select Subcategory</option>
        {subcategories.map((sub) => (
          <option key={sub.id} value={sub.id}>
            {sub.name}
          </option>
        ))}
      </select>

      <select
        name="author_id"
        value={formData.author_id || ""}
        onChange={handleChange}
        className={inputStyle}
      >
        <option value="">Select Author</option>
        {authors.map((author) => (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        ))}
      </select>

      <select
        name="publisher_id"
        value={formData.publisher_id || ""}
        onChange={handleChange}
        className={inputStyle}
      >
        <option value="">Select Publisher</option>
        {publishers.map((publisher) => (
          <option key={publisher.id} value={publisher.id}>
            {publisher.name}
          </option>
        ))}
      </select>

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        className={`${inputStyle} col-span-1 md:col-span-2 h-24`}
      />

      <div className="col-span-1 md:col-span-2 space-y-2">
        <label className="block">
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
          />
          <span className="ml-2">Featured</span>
        </label>
        <label className="block">
          <input
            type="checkbox"
            name="bestseller"
            checked={formData.bestseller}
            onChange={handleChange}
          />
          <span className="ml-2">Bestseller</span>
        </label>
        <label className="block">
          <input
            type="checkbox"
            name="newarrival"
            checked={formData.newarrival}
            onChange={handleChange}
          />
          <span className="ml-2">New Arrival</span>
        </label>
        <label className="block">
          <input
            type="checkbox"
            name="promotion"
            checked={formData.promotion}
            onChange={handleChange}
          />
          <span className="ml-2">Promotion</span>
        </label>
        <label className="block">
          <input
            type="checkbox"
            name="wishlist"
            checked={formData.wishlist}
            onChange={handleChange}
          />
          <span className="ml-2">Wishlist</span>
        </label>
      </div>

      <div className="col-span-1 md:col-span-2">
        <input
          type="file"
          name="image"
          onChange={handleChange}
          className=""
        />
      </div>
    </div>
  );
}
