"use client";

import React from "react";
import { useState } from "react";

// Custom Button component
export function Button({
  children,
  type = "button",
  className = "",
  onClick,
  disabled,
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

// Custom Input component
export function Input({ className = "", ...props }) {
  return (
    <input
      className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm ${className}`}
      {...props}
    />
  );
}

// Custom Label component
function Label({ htmlFor, children, className = "" }) {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-sm font-medium text-gray-700 ${className}`}
    >
      {children}
    </label>
  );
}

// Custom Card component
function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

// Custom CardHeader component
function CardHeader({ children, className = "" }) {
  return <div className={`p-6 pb-4 ${className}`}>{children}</div>;
}

// Custom CardTitle component
function CardTitle({ children, className = "" }) {
  return (
    <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>
      {children}
    </h3>
  );
}

// Custom CardContent component
function CardContent({ children, className = "" }) {
  return <div className={`p-6 pt-0 ${className}`}>{children}</div>;
}

export function DimensionForm({ onDimensionsSet, currentDimensions }) {
  const [width, setWidth] = useState(
    currentDimensions?.width?.toString() || ""
  );
  const [height, setHeight] = useState(
    currentDimensions?.height?.toString() || ""
  );
  const [errors, setErrors] = useState({});

  const validateDimensions = () => {
    const newErrors = {};

    const widthNum = Number.parseFloat(width);
    const heightNum = Number.parseFloat(height);

    if (!width || isNaN(widthNum) || widthNum <= 0) {
      newErrors.width = "Width must be a positive number";
    } else if (widthNum < 10) {
      newErrors.width = "Minimum width is 10mm";
    } else if (widthNum > 500) {
      newErrors.width = "Maximum width is 500mm";
    }

    if (!height || isNaN(heightNum) || heightNum <= 0) {
      newErrors.height = "Height must be a positive number";
    } else if (heightNum < 10) {
      newErrors.height = "Minimum height is 10mm";
    } else if (heightNum > 500) {
      newErrors.height = "Maximum height is 500mm";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    if (validateDimensions()) {
      onDimensionsSet({
        width: Number.parseFloat(width),
        height: Number.parseFloat(height),
      });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Label Dimensions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="width">Width (mm)</Label>
            <Input
              id="width"
              type="number"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="e.g., 100"
              min="10"
              max="500"
              step="0.1"
            />
            {errors.width && (
              <p className="text-sm text-red-600">{errors.width}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="height">Height (mm)</Label>
            <Input
              id="height"
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="e.g., 60"
              min="10"
              max="500"
              step="0.1"
            />
            {errors.height && (
              <p className="text-sm text-red-600">{errors.height}</p>
            )}
          </div>

          <Button onClick={handleSubmit} className="w-full">
            {currentDimensions ? "Update Dimensions" : "Set Dimensions"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
