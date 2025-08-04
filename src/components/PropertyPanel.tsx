import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, RotateCw, FlipHorizontal, FlipVertical } from "lucide-react";

interface PropertyPanelProps {
  activeLayerType: "background" | "product" | "design" | null;
}

export const PropertyPanel = ({ activeLayerType }: PropertyPanelProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 100, height: 100 });
  const [rotation, setRotation] = useState(0);
  const [opacity, setOpacity] = useState(100);

  if (!activeLayerType) {
    return (
      <Card className="bg-panel-bg border-border shadow-panel">
        <div className="p-6 text-center">
          <p className="text-muted-foreground">Select a layer to edit properties</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-panel-bg border-border shadow-panel">
      <div className="p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4 capitalize">
          {activeLayerType} Properties
        </h3>
        
        <Tabs defaultValue="transform" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-workspace">
            <TabsTrigger value="transform" className="text-xs">Transform</TabsTrigger>
            <TabsTrigger value="content" className="text-xs">Content</TabsTrigger>
          </TabsList>
          
          <TabsContent value="transform" className="space-y-4 mt-4">
            {/* Position */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">Position</Label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs text-muted-foreground">X</Label>
                  <Input
                    type="number"
                    value={position.x}
                    onChange={(e) => setPosition(prev => ({ ...prev, x: Number(e.target.value) }))}
                    className="bg-input border-border text-foreground"
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Y</Label>
                  <Input
                    type="number"
                    value={position.y}
                    onChange={(e) => setPosition(prev => ({ ...prev, y: Number(e.target.value) }))}
                    className="bg-input border-border text-foreground"
                  />
                </div>
              </div>
            </div>

            {/* Size */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">Size</Label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs text-muted-foreground">Width</Label>
                  <Input
                    type="number"
                    value={size.width}
                    onChange={(e) => setSize(prev => ({ ...prev, width: Number(e.target.value) }))}
                    className="bg-input border-border text-foreground"
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Height</Label>
                  <Input
                    type="number"
                    value={size.height}
                    onChange={(e) => setSize(prev => ({ ...prev, height: Number(e.target.value) }))}
                    className="bg-input border-border text-foreground"
                  />
                </div>
              </div>
            </div>

            {/* Rotation */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">Rotation</Label>
              <div className="flex items-center gap-2">
                <Slider
                  value={[rotation]}
                  onValueChange={(value) => setRotation(value[0])}
                  max={360}
                  min={-360}
                  step={1}
                  className="flex-1"
                />
                <span className="text-xs text-muted-foreground w-12">{rotation}°</span>
              </div>
            </div>

            {/* Opacity */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">Opacity</Label>
              <div className="flex items-center gap-2">
                <Slider
                  value={[opacity]}
                  onValueChange={(value) => setOpacity(value[0])}
                  max={100}
                  min={0}
                  step={1}
                  className="flex-1"
                />
                <span className="text-xs text-muted-foreground w-12">{opacity}%</span>
              </div>
            </div>

            <Separator className="bg-border" />

            {/* Transform Actions */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">Actions</Label>
              <div className="grid grid-cols-3 gap-2">
                <Button size="sm" variant="outline" className="border-border">
                  <RotateCw className="h-3 w-3" />
                </Button>
                <Button size="sm" variant="outline" className="border-border">
                  <FlipHorizontal className="h-3 w-3" />
                </Button>
                <Button size="sm" variant="outline" className="border-border">
                  <FlipVertical className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="content" className="space-y-4 mt-4">
            {activeLayerType === "background" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">Background Type</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button size="sm" variant="outline" className="border-border">Color</Button>
                    <Button size="sm" variant="outline" className="border-border">Image</Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">Business Info</Label>
                  <Input 
                    placeholder="Company Name"
                    className="bg-input border-border text-foreground"
                  />
                  <Input 
                    placeholder="Tagline"
                    className="bg-input border-border text-foreground"
                  />
                </div>
              </div>
            )}

            {activeLayerType === "product" && (
              <div className="space-y-4">
                <Button className="w-full bg-accent hover:bg-accent-hover text-accent-foreground">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Product Image
                </Button>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">Product Type</Label>
                  <Input 
                    placeholder="T-Shirt, Mug, etc."
                    className="bg-input border-border text-foreground"
                  />
                </div>
              </div>
            )}

            {activeLayerType === "design" && (
              <div className="space-y-4">
                <Button className="w-full bg-secondary hover:bg-secondary-hover text-secondary-foreground">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Logo/Design
                </Button>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">Placement</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button size="sm" variant="outline" className="border-border">Front</Button>
                    <Button size="sm" variant="outline" className="border-border">Back</Button>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  );
};