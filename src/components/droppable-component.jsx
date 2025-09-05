"use client";

import React from "react";

import { useState, useRef } from "react";
import { Button, Input } from "./dimension-form";


export function DroppableComponent({
  component,
  canvasWidth,
  canvasHeight,
  onUpdate,
  onDelete,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(component.content || "");
  const dragRef = useRef();

  const handleMouseDown = (e) => {
    if (isEditing) return;

    setIsDragging(true);
    dragRef.current = {
      startX: component.x,
      startY: component.y,
      startMouseX: e.clientX,
      startMouseY: e.clientY,
    };

    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !dragRef.current) return;

    const deltaX = e.clientX - dragRef.current.startMouseX;
    const deltaY = e.clientY - dragRef.current.startMouseY;

    const newX = Math.max(
      0,
      Math.min(dragRef.current.startX + deltaX, canvasWidth - component.width)
    );
    const newY = Math.max(
      0,
      Math.min(dragRef.current.startY + deltaY, canvasHeight - component.height)
    );

    onUpdate({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    dragRef.current = undefined;
  };

  // Add global mouse event listeners
  if (typeof window !== "undefined") {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }
  }

  const handleDoubleClick = () => {
    setIsEditing(true);
    setEditContent(component.content || "");
  };

  const handleSaveEdit = () => {
    onUpdate({ content: editContent });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditContent(component.content || "");
    setIsEditing(false);
  };

  return (
    <div
      className={`absolute border-2 bg-white shadow-sm transition-all ${
        isDragging
          ? "border-accent shadow-md z-10"
          : "border-border hover:border-accent"
      } ${isEditing ? "z-20" : ""}`}
      style={{
        left: `${component.x}px`,
        top: `${component.y}px`,
        width: `${component.width}px`,
        height: `${component.height}px`,
        cursor: isDragging ? "grabbing" : "grab",
      }}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
    >
      {/* Delete button */}
      <Button
        size="sm"
        variant="destructive"
        className="absolute -top-2 -right-2 w-6 h-6 p-0 rounded-full text-xs z-10"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      >
        ×
      </Button>

      {/* Content */}
      <div className="p-2 h-full flex items-center justify-center">
        {isEditing ? (
          <div className="w-full space-y-2">
            <Input
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="text-xs h-6"
              autoFocus
            />
            <div className="flex gap-1">
              <Button
                size="sm"
                onClick={handleSaveEdit}
                className="h-5 text-xs px-2"
              >
                Save
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleCancelEdit}
                className="h-5 text-xs px-2 bg-transparent"
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-xs text-center text-foreground font-medium leading-tight">
            {component.content}
          </div>
        )}
      </div>
    </div>
  );
}
