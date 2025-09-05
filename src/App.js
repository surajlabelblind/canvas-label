"use client";

import { useState } from "react";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DimensionForm } from "./components/dimension-form";
import { ComponentLibrary } from "./components/component-library";
import { LabelCanvas } from "./components/label-canvas";

export default function FoodLabelMaker() {
  const [dimensions, setDimensions] = useState(null);
  const [droppedComponents, setDroppedComponents] = useState([]);

  const handleDrop = (component) => {
    const newComponent = {
      ...component,
      id: `${component.type}-${Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 9)}`,
    };
    setDroppedComponents((prev) => [...prev, newComponent]);
  };

  const handleComponentUpdate = (id, updates) => {
    setDroppedComponents((prev) =>
      prev.map((comp) => (comp.id === id ? { ...comp, ...updates } : comp))
    );
  };

  const handleComponentDelete = (id) => {
    setDroppedComponents((prev) => prev.filter((comp) => comp.id !== id));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card px-6 py-4">
          <h1 className="text-2xl font-bold text-foreground">
            Food Label Maker
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Create custom food labels with drag and drop components
          </p>
        </header>

        <div className="flex h-[calc(100vh-80px)]">
          {/* Sidebar */}
          <div className="w-80 border-r border-border bg-sidebar overflow-y-auto">
            <div className="p-4 space-y-6">
              <DimensionForm
                onDimensionsSet={setDimensions}
                currentDimensions={dimensions}
              />

              {dimensions && <ComponentLibrary />}
            </div>
          </div>

          {/* Canvas Area */}
          <div className="flex-1 bg-muted p-6 overflow-auto">
            {dimensions ? (
              <LabelCanvas
                dimensions={dimensions}
                droppedComponents={droppedComponents}
                onDrop={handleDrop}
                onComponentUpdate={handleComponentUpdate}
                onComponentDelete={handleComponentDelete}
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted-foreground/10 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-muted-foreground"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    Set Label Dimensions
                  </h3>
                  <p className="text-muted-foreground">
                    Enter the width and height to start designing your food
                    label
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
