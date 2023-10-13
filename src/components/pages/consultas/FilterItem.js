import React from 'react';

export default function FilterItem({ title, children }) {
  return (
    <div id={`filtro ${title}`}>
      <div className="mb-3">
        <span className="font-bold text-gray-600 text-xl">{title}</span>
        <div className="divider mt-2" />
      </div>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}