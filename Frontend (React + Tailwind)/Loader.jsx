
import React from "react";

export default function Loader({ size = 6 }) {
  return (
    <div className={`inline-block animate-spin rounded-full border-4 border-t-transparent border-gray-300`} style={{ width: `${size}rem`, height: `${size}rem` }} />
  );
}
