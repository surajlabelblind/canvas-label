"use client";


import { useDraggable } from "@dnd-kit/core";

export const FOOD_LABEL_COMPONENTS = [
  { type: "food-name", label: "Food Name", category: "Basic Info" },
  { type: "veg-nonveg", label: "Veg/Non-Veg", category: "Basic Info" },
  { type: "milk-logo", label: "Milk Logo", category: "Logos" },
  { type: "brand-logo", label: "Brand Name/Logo", category: "Logos" },
  { type: "flavour", label: "Flavour", category: "Basic Info" },
  { type: "other-info", label: "Other Information", category: "Details" },
  { type: "ingredients", label: "Ingredients", category: "Compliance" },
  { type: "allergens", label: "Allergens", category: "Compliance" },
  { type: "nutrition-table", label: "Nutrition Table", category: "Compliance" },
  { type: "disclaimers", label: "Disclaimers", category: "Legal" },
  { type: "addresses", label: "Addresses", category: "Contact" },
  { type: "consumer-care", label: "Consumer Care Detail", category: "Contact" },
  { type: "net-quantity", label: "Net Quantity", category: "Product Info" },
  { type: "mrp", label: "MRP", category: "Product Info" },
  { type: "batch-no", label: "Batch No", category: "Product Info" },
  {
    type: "manufacture-date",
    label: "Date of Manufacture",
    category: "Product Info",
  },
  { type: "expiry-date", label: "Use By/Expiry", category: "Product Info" },
  {
    type: "storage-instructions",
    label: "Storage Instructions",
    category: "Instructions",
  },
  {
    type: "usage-instructions",
    label: "Usage Instructions",
    category: "Instructions",
  },
  {
    type: "lm-guidelines",
    label: "LM Guidelines/Metrology",
    category: "Legal",
  },
];

const CATEGORIES = Array.from(
  new Set(FOOD_LABEL_COMPONENTS.map((comp) => comp.category))
);

// Custom Card component
export function Card({ children, className = "" }) {
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

// Custom Badge component
function Badge({ children, variant = "default", className = "" }) {
  const baseClasses =
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
  const variantClasses = {
    default: "bg-blue-100 text-blue-800",
    secondary: "bg-gray-100 text-gray-800",
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
}

function DraggableComponent({ type, label }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: type,
    data: { type, label },
  });


  const style = {
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="p-3 bg-white border border-gray-200 rounded-md cursor-move hover:bg-gray-50 hover:border-gray-300 transition-colors"
    >
      <div className="text-sm font-medium text-gray-900">{label}</div>
    </div>
  );
}

export function ComponentLibrary() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Component Library</CardTitle>
        <p className="text-sm text-gray-600">
          Drag components to the canvas to build your label
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {CATEGORIES.map((category) => (
          <div key={category} className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {category}
              </Badge>
            </div>
            <div className="grid gap-2">
              {FOOD_LABEL_COMPONENTS.filter(
                (comp) => comp.category === category
              ).map((component) => (
                <DraggableComponent
                  key={component.type}
                  type={component.type}
                  label={component.label}
                />
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}