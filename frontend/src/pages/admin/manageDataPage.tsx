import React, { useState } from "react";
import ManageAuthors from "../../components/adminComponents/manageData/ManageAuthors";
import ManagePublishers from "../../components/adminComponents/manageData/ManagePublishers";
import ManageCategories from "../../components/adminComponents/manageData/ManageCategories";
import ManageSubcategories from "../../components/adminComponents/manageData/ManageSubcategories";

const ManageDataPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("authors");

const tabs = [
  { label: "Authors", value: "authors", icon: "🧑‍💼" },
  { label: "Publishers", value: "publishers", icon: "🏢" },
  { label: "Categories", value: "categories", icon: "🗂️" },
  { label: "Subcategories", value: "subcategories", icon: "📁" },
];

  return (
    <div className="p-6">
      <h1 className="md:text-4xl text-2xl font-bold mb-4 text-yellow-300">🗂️ Manage Data</h1>

      <div className="flex space-x-2 my-6 border-b border-gray-600">
        {tabs.map((tab) => (
  <button
    key={tab.value}
    onClick={() => setActiveTab(tab.value)}
    className={`flex items-center gap-1 px-4 py-2 -mb-[1px] border-b-2 font-semibold transition-all duration-200 ${
      activeTab === tab.value
    ? "border-yellow-300 text-yellow-300 font-bold bg-[#1e1e1e] rounded-t-md"
  : "border-transparent text-white hover:text-yellow-200 hover:bg-[#1a1a1a] rounded-t-md"}`}
  >
    <span>{tab.icon}</span>
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
