import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-200 py-6">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} SoftDown. All rights reserved.</p>
      </div>
    </footer>
  );
}
