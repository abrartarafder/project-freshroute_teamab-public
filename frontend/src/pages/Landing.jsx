// LandingPage.jsx
import React from "react";
import AppNavbar from "../components/navbar.jsx"; // adjust path if needed

export default function LandingPage() {
  const handleSearch = (query) => {
    console.log("Search:", query);
  };

  return (
    <>
      <AppNavbar
        cartCount={9}
        userName="John"
        activeKey="home"
        onSearch={handleSearch}
      />


    </>
  );
}