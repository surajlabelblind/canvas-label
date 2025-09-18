"use client";

import { useDroppable } from "@dnd-kit/core";
import { Card } from "./component-library";
import { CanvasItem } from "./droppable-component"; // Import the new component

export function LabelCanvas({
  dimensions,
  droppedComponents,
  onComponentUpdate,
  onComponentDelete,
}) {

  console.log("droppedComponents", droppedComponents);
  
  // Convert mm to pixels
  const mmToPx = (mm) => mm * 3.78;
  const canvasWidth = mmToPx(dimensions.width);
  const canvasHeight = mmToPx(dimensions.height);

  // Set up the canvas as a droppable area for Dnd Kit
  const { setNodeRef } = useDroppable({
    id: 'canvas-droppable-area',
  });

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 text-center">
        <h2 className="text-lg font-semibold">
          Label Canvas ({dimensions.width}mm × {dimensions.height}mm)
        </h2>
        <p className="text-sm text-gray-500">
          Drag components from the sidebar to design your label
        </p>
      </div>

      <Card className="p-4 bg-white shadow-lg">
        <div
          id="canvas-droppable-area" // Give it an ID to calculate drop position
          ref={setNodeRef} // Use the ref from Dnd Kit
          className="relative bg-white border-2 border-dashed"
          style={{
            width: `${canvasWidth}px`,
            height: `${canvasHeight}px`,
          }}
        >
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
              backgroundSize: "20px 20px",
            }}
          />

          {/* Dropped components now use CanvasItem */}
          {droppedComponents.map((component) => (
            <CanvasItem
              key={component.id}
              component={component}
              onUpdate={onComponentUpdate}
              onDelete={onComponentDelete}
            />
          ))}

          {/* Empty state */}
          {droppedComponents.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-muted flex items-center justify-center">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
                <p className="text-sm">Drop components here</p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}