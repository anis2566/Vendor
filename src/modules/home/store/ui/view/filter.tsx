"use client";

import VariantColorSelector, {
  ColorVariantItem,
} from "@/components/commerce-ui/variant-color-selector";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const variants: ColorVariantItem[] = [
  { color: "#000000", id: "color-black", label: "Black", value: "black" },
  { color: "#FFFFFF", id: "color-white", label: "White", value: "white" },
  { color: "#FF0000", id: "color-red", label: "Red", value: "red" },
  { color: "#0000FF", id: "color-blue", label: "Blue", value: "blue" },
  { color: "#00FF00", id: "color-green", label: "Green", value: "green" },
  { color: "#FFFF00", id: "color-yellow", label: "Yellow", value: "yellow" },
  { color: "#800080", id: "color-purple", label: "Purple", value: "purple" },
];

export const Filter = () => {
  const [selectedColor, setSelectedColor] = useState("black");

  return (
    <div className="p-3 space-y-4">
      <div>
        <h1 className="text-xl font-semibold">Filter</h1>
        <p className="text-sm text-muted-foreground">
          Narrow down store search
        </p>
      </div>
      <Accordion type="single" collapsible>
        <AccordionItem value="category">
          <AccordionTrigger>Category</AccordionTrigger>
          <AccordionContent className="space-y-2">
            <div className="flex items-center gap-3">
              <Checkbox id="category-1" />
              <Label htmlFor="category-1">Category 1</Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id="category-2" />
              <Label htmlFor="category-2">Category 2</Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id="category-3" />
              <Label htmlFor="category-3">Category 3</Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id="category-4" />
              <Label htmlFor="category-4">Category 4</Label>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="brand">
          <AccordionTrigger>Brand</AccordionTrigger>
          <AccordionContent className="space-y-2">
            <div className="flex items-center gap-3">
              <Checkbox id="brand-1" />
              <Label htmlFor="brand-1">Brand 1</Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id="brand-2" />
              <Label htmlFor="brand-2">Brand 2</Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id="brand-3" />
              <Label htmlFor="brand-3">Brand 3</Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id="brand-4" />
              <Label htmlFor="brand-4">Brand 4</Label>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="size">
          <AccordionTrigger>Size</AccordionTrigger>
          <AccordionContent className="space-y-2">
            <div className="flex items-center gap-3">
              <Checkbox id="size-1" />
              <Label htmlFor="size-1">Size 1</Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id="size-2" />
              <Label htmlFor="size-2">Size 2</Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id="size-3" />
              <Label htmlFor="size-3">Size 3</Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id="size-4" />
              <Label htmlFor="size-4">Size 4</Label>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="color">
          <AccordionTrigger>Color</AccordionTrigger>
          <AccordionContent className="space-y-2">
            <div className="p-3">
              <VariantColorSelector
                value={selectedColor}
                onValueChange={setSelectedColor}
                variants={variants}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
