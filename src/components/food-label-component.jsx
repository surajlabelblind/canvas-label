// food-label-component.jsx
"use client";

import React from "react";

// +++ UPDATED Ingredients Component +++
export function IngredientsComponent({ width, height,id }) {
  // Make font size dynamic based on container width
  const fontSize = Math.max(8, Math.min(16, width / 25)); // Adjust divisor as needed

  console.log("id",id);
  console.log(fontSize,width);
  
  

  return (
    // Use h-full and w-full to fill the container. overflow-auto for safety.
    <div
    id={id}
      className="w-full "
      style={{ fontSize: `${fontSize}px`, lineHeight: '1.4' }}
    >
        <p style={{textAlign: 'justify'}}>
          <span className="font-bold">Ingredients: </span>
          <span>
            Puffed rice (47%), Chickpea flour, Edible Vegetable Oil (Oil, Plain Maida, Milk, Water, Rice),
            Aluminum Caprylate, Milk Powder, Whole, Enzyme-Modified, Mono- And Diglycerides,
            Acetic Acid Esters And Sodium And Calcium Salts, Mono- And Diglycerides,
            Diacetyltartaric Acid Esters
          </span>
        </p>
    </div>
  );
}

// +++ UPDATED SKU Component +++
export function SKUComponent({ width, height }) {
  // A simple scaling approach for font size
  const scale = width / 280; // Original width was 280px
  const fontSize = Math.max(10, 17 * scale);

  return (
    <div
      className="flex flex-col border-[2px] border-[black] w-full h-full p-1"
      style={{ fontSize: `${fontSize}px` }}
    >
      <div className="flex">
        <b className="w-[40%]">Batch No:</b>
        <b className="break-words w-[60%]">123134545</b>
      </div>
      <div className="flex">
        <b className="w-[40%]">Date of Manufacture:</b>
        <b className="w-[60%]">09-03-2025</b>
      </div>
      <div className="flex">
        <b className="w-[40%]">Use By:</b>
        <b className="w-[60%]">10-02-2025</b>
      </div>
      <div className="flex">
        <b className="w-[40%]">Max Retail Price:</b>
        <b className="w-[60%]">$5</b>
      </div>
      <div className="flex">
        <b className="w-[40%]">Unit Price:</b>
        <b className="w-[60%]">$0.05 per g</b>
      </div>
    </div>
  );
}

// +++ UPDATED Address Component +++
export function AddressComponent({ width, height }) {
    const fontSize = Math.max(8, Math.min(14, width / 28));
    return (
        <div className="w-full h-full overflow-auto text-justify" style={{fontSize: `${fontSize}px`, lineHeight: 1.3}}>
            <div>
                <p>
                    <span className="font-bold">Manufactured By : </span>
                    <strong>B3- Bikanervala Foods Pvt Ltd.</strong>, Plot No. 2269-2275, Phase-2, Industrial Area, Rai Sonipat, nagar, Rai Sonipat, Haryana, 131029, India
                    <br />
                    <span>FSSAI Lic No. 10014064000352</span>
                </p>
                <p className="mt-2">
                    <span className="font-bold">Marketed By : </span>
                    <strong>subodh api</strong>, Belapur village, Station main Road, hongkong, Hong Kong
                    <br />
                    <span>FSSAI Lic No. 14527896325468</span>
                </p>
            </div>
        </div>
    );
}


export function NutritionTableComponent({ width, height }) {
  console.log("width",width);
  console.log("height",height);
  
  // Define the original, natural dimensions of your component.
  // I've estimated the height from your code.
  const baseWidth = 400;
  const baseHeight = 650;

    const scaleX = width / baseWidth;
  const scaleY = height / baseHeight;

  const style = {
    // ✅ 2. Apply both scaleX and scaleY to the transform property
    transform: `scale(${scaleX}, ${scaleY})`,
    transformOrigin: 'top left',
    width: `${baseWidth}px`,
    height: `${baseHeight}px`,
  };

  return (
    <div style={style} >
        {/* The content below is the same as before. No changes needed here. */}
        {/* It will now scale beautifully within the container. */}
        <div className="bg-white border-[2px] border-black  w-full">
            <div className="border-b border-gray-400  ">
                <h1 className="font-[900] text-[42px] leading-[48px] w-full text-center whitespace-nowrap">
                    Nutrition Facts
                </h1>
            </div>
            {/* ... Rest of your original nutrition table JSX ... */}
            <div className="border-b-[12px] border-black pb-1 my-2">
      <div className="text-[larger] leading-[12px]">10 servings per container</div>
      <div className="flex justify-between items-baseline">
        <span className="text-lg font-[900]">Serving size</span>
        <span className="text-lg font-[900]">1/3 cups (10 g)</span>
      </div>
    </div>
    <div className="border-b-[7px] border-black">
      <div className="flex justify-between items-end mb-1">
        <div className="flex flex-col">
          <span className="font-bold leading-[15px] tracking-[1px]">Amount per serving</span>
          <span className="text-[32px] leading-[32px] font-black">Calories</span>
        </div>
        <div className="text-right">
          <span className="text-4xl font-black">50</span>
        </div>
      </div>
    </div>
    <div className="text-[14px] text-right font-extrabold py-[2px] border-b border-gray-400">% Daily Value*</div>
    <div className="space-y-0">
      <div className="flex justify-between items-center border-b border-gray-400 py-[1px]">
        <span className="text-[15px] font-extrabold">Total Fat <span className="font-normal">2g</span></span>
        <span className="text-[15px] font-extrabold">3%</span>
      </div>
      <div className="flex justify-between items-center border-b border-gray-400 py-[1px] pl-5">
        <span className="text-[14px]">Saturated Fat 1g</span>
        <span className="text-[14px] font-extrabold">5%</span>
      </div>
      <div className="flex justify-between items-center border-b border-gray-400 py-[1px] pl-5">
        <span className="text-[14px]"><span className="italic">Trans </span>Fat 0g</span>
        <span className="text-sm"></span>
      </div>
      <div className="flex justify-between items-center border-b border-gray-400 py-[1px]">
        <span className="text-[15px] font-extrabold">Cholesterol <span className="font-normal">0mg</span></span>
        <span className="text-[15px] font-extrabold">0%</span>
      </div>
      <div className="flex justify-between items-center border-b border-gray-400 py-[1px]">
        <span className="text-[15px] font-extrabold">Sodium <span className="font-normal">55mg</span></span>
        <span className="text-[15px] font-extrabold">2%</span>
      </div>
      <div className="flex justify-between items-center border-b border-gray-400 py-[1px]">
        <span className="text-[15px] font-extrabold">Total Carbohydrate <span className="font-normal">5g</span></span>
        <span className="text-[15px] font-extrabold">2%</span>
      </div>
      <div className="flex justify-between items-center border-b border-gray-400 py-[1px] pl-5">
        <span className="text-[14px]">Dietary Fiber 1g</span>
        <span className="text-[14px] font-extrabold">4%</span>
      </div>
      <div className="flex justify-between items-center py-[1px] pl-5">
        <span className="text-[14px]">Total Sugars &lt; 1g</span>
      </div>
      <div className="flex justify-end">
        <div className="border-b border-gray-400 w-[88%]"></div>
      </div>
      <div className="flex justify-between items-center border-b border-gray-400 py-[1px] pl-[42px]">
        <span className="text-[14px]">Includes 0g Added Sugars</span>
        <span className="text-[14px] font-extrabold">0%</span>
      </div>
      <div className="flex justify-between items-center border-b-[12px] border-black py-[1px]">
        <span className="text-[15px] font-extrabold">Protein <span className="font-normal">1g</span></span>
        <span className="text-[15px] font-extrabold"></span>
      </div>
      <div className="">
        <div className="flex justify-between items-center border-b border-gray-400 py-[1px]">
          <span className="text-[14px]">Vitamin D 0.2mcg</span>
          <span className="text-[14px]">0%</span>
        </div>
        <div className="flex justify-between items-center border-b border-gray-400 py-[1px]">
          <span className="text-[14px]">Calcium 0mg</span>
          <span className="text-[14px]">0%</span>
        </div>
        <div className="flex justify-between items-center border-b border-gray-400 py-[1px]">
          <span className="text-[14px]">Iron 1.4mg</span>
          <span className="text-[14px]">8%</span>
        </div>
        <div className="flex justify-between items-center border-b-[7px] border-black py-[1px]">
          <span className="text-[14px]">Potassium 0mg</span>
          <span className="text-[14px]">0%</span>
        </div>
      </div>
    </div>
    <div className="text-xs leading-tight pt-1">
      <span className="font-medium">*</span> The % Daily Value (DV) tells you how much a nutrient in a
      serving of food contributes to a daily diet. 2,000 calories a day is used for general nutrition advice.
    </div>
        </div>
    </div>
  );
}