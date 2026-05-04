"use client";

import { useState } from 'react';

export default function ApplyButton() {
  const [loading, setLoading] = useState(false);

  const handleApply = () => {
    setLoading(true);
    setTimeout(() => {
      alert("Application submitted!");
      setLoading(false);
    }, 1000);
  };

  return (
    <button 
      onClick={handleApply}
      disabled={loading}
      aria-label="Apply for this job"
      className="px-6 py-3 bg-[#1f4a7c] text-white font-semibold rounded-lg shadow hover:bg-[#16365c] transition-colors disabled:opacity-50 cursor-pointer"
    >
      {loading ? 'Processing...' : 'Apply Now'}
    </button>
  );
}
