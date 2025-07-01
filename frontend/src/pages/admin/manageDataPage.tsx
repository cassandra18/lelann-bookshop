import React, { useState } from "react";
import ManageAuthors from "../../components/adminComponents/manageData/ManageAuthors";
import ManagePublishers from "../../components/adminComponents/manageData/ManagePublishers";
import ManageCategories from "../../components/adminComponents/manageData/ManageCategories";
import ManageSubcategories from "../../components/adminComponents/manageData/ManageSubcategories";

const ManageDataPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("authors");

  const tabs = [
    { label: "Authors", value: "authors" },
    { label: "Publishers", value: "publishers" },
    { label: "Categories", value: "categories" },
    { label: "Subcategories", value: "subcategories" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Data</h1>

      <div className="flex space-x-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-4 py-2 rounded ${
              activeTab === tab.value
                ? "bg-[#ffea00] text-black font-semibold"
                : "bg-gray-700 text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div>
        {activeTab === "authors" && <ManageAuthors />}
        {activeTab === "publishers" && <ManagePublishers />}
        {activeTab === "categories" && <ManageCategories />}
        {activeTab === "subcategories" && <ManageSubcategories />}
      </div>
    </div>
  );
};

export default ManageDataPage;
