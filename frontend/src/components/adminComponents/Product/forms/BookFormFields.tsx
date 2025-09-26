import React from "react";
import { BookFormData } from "../../../types/BookTypes";
import MultiSelectDropdown from "./MultipleSelectDropDown";

interface Props {
  formData: BookFormData;
  handleChange: (e: React.ChangeEvent<any>) => void;
  categories: any[];
  filteredSubcategories: any[];
  authors: any[];
  publishers: any[];
}

const inputStyle = "border border-slate-500 bg-slate-900 text-white rounded-lg px-3 py-2 w-full focus:border-white";


export function BookFormFields({
  formData,
  handleChange,
  categories,
  filteredSubcategories,
  authors,
  publishers,
}: Props) {

  const handleMultiSelectChange = (selectedIds: string[]) => {
    // This calls the parent component's state update logic
    handleChange({
      target: {
        name: "subcategory_ids",
        value: selectedIds,
        type: "select-multiple",
      },
    } as React.ChangeEvent<any>);
  };

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
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        className={inputStyle}
      />
      <input
        type="number"
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
      <input
        type="text"
        name="company"
        value={formData.company || ""}
        onChange={handleChange}
        placeholder="Company"
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
      <input
        type="text"
        name="format"
        value={formData.format || ""}
        onChange={handleChange}
        placeholder="Format (optional)"
        className={inputStyle}
      />
      <input
        type="text"
        name="isbn"
        value={formData.isbn || ""}
        onChange={handleChange}
        placeholder="ISBN (optional)"
        className={inputStyle}
      />
      <input
        type="text"
        name="language"
        value={formData.language || ""}
        onChange={handleChange}
        placeholder="Language (optional)"
        className={inputStyle}
      />
            <input
        type="number"
        name="yearPublished"
        value={formData.yearPublished || ""}
        onChange={handleChange}
        placeholder="Year Published (optional)"
        className={inputStyle}
      />
      <input
        type="number"
        name="stock"
        value={formData.stock || ""}
        onChange={handleChange}
        placeholder="Stock (optional)"
        className={inputStyle}
      />
      <input
        type="text"
        name="curriculum"
        value={formData.curriculum || ""}
        onChange={handleChange}
        placeholder="Curriculum (optional)"
        className={inputStyle}
      />
      <input
        type="text"
        name="level"
        value={formData.level || ""}
        onChange={handleChange}
        placeholder="Level (optional)"
        className={inputStyle}
      />
      <select
        name="category_id"
        value={formData.category_id || ""}
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

      <MultiSelectDropdown
        label="Subcategories"
        options={filteredSubcategories}
        selectedValues={formData.subcategory_ids}
        onChange={handleMultiSelectChange}
      />

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
