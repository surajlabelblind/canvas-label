// components/droppable-component.jsx

"use client";

import React from "react";
import { Rnd } from "react-rnd";
import { Button } from "./dimension-form";
import {
  IngredientsComponent,
  SKUComponent,
  AddressComponent,
  NutritionTableComponent,
} from "./food-label-component";
import { X } from "lucide-react";

// This function renders the correct content based on the component type
function renderComponentContent(component) {
  const { type, width, height } = component;
  
  
  
  switch (type) {
    case "ingredients": return <IngredientsComponent width={width} height={height} />;
    case "batch-no":
    case "manufacture-date":
    case "expiry-date":
    case "mrp":
    case "net-quantity": return <SKUComponent width={width} height={height} />;
    case "addresses": return <AddressComponent width={width} height={height} />;
    case "nutrition-table": return <NutritionTableComponent width={width} height={height} />;
    default:
      return (
        <div className="text-xs text-center font-medium leading-tight break-words">
          {component.content || "Editable Text"}
        </div>
      );
  }
}

// This is the new, simplified component using react-rnd
export function CanvasItem({ component, onUpdate, onDelete }) {
  return (
    <Rnd
      size={{ width: component.width, height: component.height }}
      position={{ x: component.x, y: component.y }}
      onDragStop={(e, d) => {
        onUpdate(component.id, { x: d.x, y: d.y });
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        onUpdate(component.id, {
          width: +ref.style.width.replace("px", ""),
          height: +ref.style.height.replace("px", ""),
          ...position,
        });
      }}
      minWidth={80}
      minHeight={80}
      bounds="parent"
      className="box-border" // react-rnd applies its own positioning
    >
      {/* Container for content and delete button */}
      <div className="w-full h-full  border-2 border-blue-400 bg-white shadow-sm overflow-hidden">
        {renderComponentContent(component)}
      </div>
      
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent drag from starting on click
          onDelete(component.id);
        }}
        className="absolute -top-2 -right-2 rounded-full flex items-center justify-center w-6 h-6  text-white  text-xs z-40 bg-red-500 hover:bg-red-600"
      >
        <X className="w-3 h-3"/>
      </button>
    </Rnd>
  );
}