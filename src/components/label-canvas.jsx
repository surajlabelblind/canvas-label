"use client";

import { useRef } from "react";
import { useDrop } from "react-dnd";
import { Card } from "./component-library";
import { DroppableComponent } from "./droppable-component";

export function LabelCanvas({
  dimensions,
  droppedComponents,
  onDrop,
  onComponentUpdate,
  onComponentDelete,
}) {
  const canvasRef = useRef(null);

  // Convert mm to pixels (assuming 96 DPI: 1mm ≈ 3.78px)
  const mmToPx = (mm) => mm * 3.78;

  const canvasWidth = mmToPx(dimensions.width);
  const canvasHeight = mmToPx(dimensions.height);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "component",
    drop: (item, monitor) => {
      const offset = monitor.getDropResult() || monitor.getClientOffset();
      if (!offset || !canvasRef.current) return;

      const canvasRect = canvasRef.current.getBoundingClientRect();
      const x = offset.x - canvasRect.left;
      const y = offset.y - canvasRect.top;

      // Ensure the component stays within canvas bounds
      const componentWidth = 120;
      const componentHeight = 40;
      const clampedX = Math.max(0, Math.min(x, canvasWidth - componentWidth));
      const clampedY = Math.max(0, Math.min(y, canvasHeight - componentHeight));

      onDrop({
        type: item.type,
        x: clampedX,
        y: clampedY,
        width: componentWidth,
        height: componentHeight,
        content: item.label,
      });
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 text-center">
        <h2 className="text-lg font-semibold text-foreground">
          Label Canvas ({dimensions.width}mm × {dimensions.height}mm)
        </h2>
        <p className="text-sm text-muted-foreground">
          Drag components from the sidebar to design your label
        </p>
      </div>

      <Card className="p-4 bg-white shadow-lg">
        <div
          ref={(node) => {
            drop(node);
            canvasRef.current = node;
          }}
          className={`relative border-2 border-dashed bg-white transition-colors ${
            isOver ? "border-accent bg-accent/5" : "border-border"
          }`}
          style={{
            width: `${canvasWidth}px`,
            height: `${canvasHeight}px`,
            minWidth: "200px",
            minHeight: "150px",
          }}
        >
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(to right, #000 1px, transparent 1px),
                linear-gradient(to bottom, #000 1px, transparent 1px)
              `,
              backgroundSize: "20px 20px",
            }}
          />

          {/* Dropped components */}
          {droppedComponents.map((component) => (
            <DroppableComponent
              key={component.id}
              component={component}
              canvasWidth={canvasWidth}
              canvasHeight={canvasHeight}
              onUpdate={(updates) => onComponentUpdate(component.id, updates)}
              onDelete={() => onComponentDelete(component.id)}
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
