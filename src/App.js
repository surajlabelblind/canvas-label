// App.js

"use client";

import { useRef, useState } from "react";
// ✅ 1. Import DragOverlay from dnd-kit
import { DndContext, DragOverlay } from "@dnd-kit/core";

import { DimensionForm } from "./components/dimension-form";
// ✅ 2. Export and import FOOD_LABEL_COMPONENTS to find the dragged item's data
import { ComponentLibrary, FOOD_LABEL_COMPONENTS } from "./components/component-library";
import { LabelCanvas } from "./components/label-canvas";
import {jsPDF} from "jspdf";



// A simple component to render the preview of the item being dragged
function ComponentPreview({ label }) {
  return (
    <div className="p-3 bg-white border-2 border-blue-400 rounded-md shadow-lg">
      <div className="text-sm font-medium text-gray-900">{label}</div>
    </div>
  );
}

export default function FoodLabelMaker() {
  const [dimensions, setDimensions] = useState(null);
  const [droppedComponents, setDroppedComponents] = useState([]);
  // ✅ 3. Add state to track the ID of the component being dragged
  const [activeId, setActiveId] = useState(null);
  const canvasContainerRef = useRef(null);
  const [dragStartOffset, setDragStartOffset] = useState(null);

  const handleDrop = (component, position) => {
    const getDefaultDimensions = (type) => {
      // ... (this function is unchanged)
      switch (type) {
        case "nutrition-table": return { width: 400, height: 650 };
        case "ingredients": return { width: 300, height: 80 };
        case "addresses": return { width: 350, height: 200 };
        case "batch-no":
        case "manufacture-date":
        case "expiry-date":
        case "mrp":
        case "net-quantity": return { width: 280, height: 140 };
        default: return { width: 120, height: 40 };
      }
    };
    const dimensions = getDefaultDimensions(component.type);
    const newComponent = {
      ...component,
      ...dimensions,
      x: position.x,
      y: position.y,
      id: `${component.type}-${Date.now()}`,
    };
    setDroppedComponents((prev) => [...prev, newComponent]);
  };

  // ✅ 4. Add a handleDragStart function to set the activeId
  function handleDragStart(event) {
    
    setActiveId(event.active.id);

   
  }

  // ✅ 5. Simplify and correct the handleDragEnd logic
  function handleDragEnd(event) {
  const { active, over } = event;
  setActiveId(null); // Clear active state

  // Check if the drop was valid and that we have the necessary data
  if (
    over &&
    over.id === 'canvas-droppable-area' &&
    active.rect.current.translated && // This contains the final overlay position
    canvasContainerRef.current
  ) {
    const canvas = document.getElementById('canvas-droppable-area');
    if (!canvas) return;

    const scrollableContainer = canvasContainerRef.current;
    const canvasRect = canvas.getBoundingClientRect();
    
    // Get the final absolute position of the drag overlay
    const overlayRect = active.rect.current.translated;

    // Calculate the overlay's top-left corner relative to the canvas,
    // accounting for how much the container has been scrolled.
    const dropX = overlayRect.left - canvasRect.left + scrollableContainer.scrollLeft;
    const dropY = overlayRect.top - canvasRect.top + scrollableContainer.scrollTop;

    handleDrop(
      { type: active.data.current?.type, content: active.data.current?.label },
      { x: dropX, y: dropY }
    );
  }
}

  const handleComponentUpdate = (id, updates) => {
    setDroppedComponents((prev) =>
      prev.map((comp) => (comp.id === id ? { ...comp, ...updates } : comp))
    );
  };

  const handleComponentDelete = (id) => {
    setDroppedComponents((prev) => prev.filter((comp) => comp.id !== id));
  };

 const handleExportPDF = async () => {
  // You might want a loading state for better UX
  // const [isLoading, setIsLoading] = useState(false);
  // setIsLoading(true);

  if (!dimensions || droppedComponents.length === 0) {
    alert("Please add components to the canvas before exporting.");
    // setIsLoading(false);
    return;
  }

  try {
    // 1. Send the component and dimension data to your server's endpoint
    const response = await fetch('http://localhost:4000/generate-pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ droppedComponents, dimensions }),
    });

    if (!response.ok) {
      // If the server responded with an error, handle it
      throw new Error(`Server error: ${response.statusText}`);
    }

    // 2. The server will respond with the PDF file data as a "blob"
    const pdfBlob = await response.blob();

    // 3. Create a temporary URL for the blob and trigger a download
    const url = window.URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'food-label.pdf'); // or any other filename
    
    // Append to the DOM, click, and then remove
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);

    // Clean up the temporary URL
    window.URL.revokeObjectURL(url);

  } catch (error) {
    console.error("Failed to generate PDF:", error);
    alert("Failed to generate PDF. Please check the console for details.");
  } finally {
    // setIsLoading(false);
  }
}

console.log(droppedComponents);


  // ✅ 6. Find the full component data for the preview in the overlay
  const activeComponentData = activeId ? FOOD_LABEL_COMPONENTS.find(c => c.type === activeId) : null;

  return (
    // ✅ 7. Wrap the ENTIRE application in DndContext
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card px-6 py-4">
          <h1 className="text-2xl font-bold text-foreground">Food Label Maker</h1>
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
          <div ref={canvasContainerRef} className="flex-1 bg-muted p-6 overflow-auto">
            {dimensions ? (
              <LabelCanvas
                dimensions={dimensions}
                droppedComponents={droppedComponents}
                onComponentUpdate={handleComponentUpdate}
                onComponentDelete={handleComponentDelete}
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                {/* ... your empty state SVG and text ... */}
              </div>
            )}
          </div>
        </div>

        {/* ✅ Add the export button here */}
            {dimensions && (
              <button onClick={handleExportPDF} className="bg-green-600 hover:bg-green-700">
                Export as PDF
              </button>
            )}
      </div>

      {/* ✅ 8. Add the DragOverlay component to render the preview */}
      <DragOverlay>
        {activeId && activeComponentData ? (
          <ComponentPreview label={activeComponentData.label} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}