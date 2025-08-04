import { useState } from "react";
import { Eye, EyeOff, Lock, Unlock, Trash2, Image, FileText, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface Layer {
  id: string;
  name: string;
  type: "background" | "product" | "design";
  visible: boolean;
  locked: boolean;
  opacity: number;
  imageUrl?: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

interface LayerPanelProps {
  layers: Layer[];
  activeLayerId: string | null;
  onLayerSelect: (layerId: string) => void;
  onLayerToggleVisibility: (layerId: string) => void;
  onLayerToggleLock: (layerId: string) => void;
  onLayerDelete: (layerId: string) => void;
}

const getLayerIcon = (type: Layer["type"]) => {
  switch (type) {
    case "background":
      return FileText;
    case "product":
      return Image;
    case "design":
      return Palette;
    default:
      return FileText;
  }
};

const getLayerColor = (type: Layer["type"]) => {
  switch (type) {
    case "background":
      return "text-accent";
    case "product":
      return "text-primary";
    case "design":
      return "text-secondary";
    default:
      return "text-muted-foreground";
  }
};

export const LayerPanel = ({
  layers,
  activeLayerId,
  onLayerSelect,
  onLayerToggleVisibility,
  onLayerToggleLock,
  onLayerDelete,
}: LayerPanelProps) => {
  return (
    <Card className="bg-panel-bg border-border shadow-panel">
      <div className="p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4">Layers</h3>
        
        <div className="space-y-2">
          {layers.map((layer) => {
            const IconComponent = getLayerIcon(layer.type);
            const iconColor = getLayerColor(layer.type);
            const isActive = layer.id === activeLayerId;
            
            return (
              <div
                key={layer.id}
                className={cn(
                  "flex items-center gap-2 p-3 rounded-md border cursor-pointer transition-all duration-200",
                  isActive
                    ? "bg-primary/20 border-primary/40 shadow-glow"
                    : "bg-workspace border-border hover:bg-muted/30"
                )}
                onClick={() => onLayerSelect(layer.id)}
              >
                <IconComponent className={cn("h-4 w-4", iconColor)} />
                
                <span className={cn(
                  "flex-1 text-sm font-medium",
                  isActive ? "text-primary-foreground" : "text-foreground"
                )}>
                  {layer.name}
                </span>
                
                <div className="flex items-center gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      onLayerToggleVisibility(layer.id);
                    }}
                  >
                    {layer.visible ? (
                      <Eye className="h-3 w-3 text-muted-foreground" />
                    ) : (
                      <EyeOff className="h-3 w-3 text-muted-foreground" />
                    )}
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      onLayerToggleLock(layer.id);
                    }}
                  >
                    {layer.locked ? (
                      <Lock className="h-3 w-3 text-muted-foreground" />
                    ) : (
                      <Unlock className="h-3 w-3 text-muted-foreground" />
                    )}
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0 hover:bg-destructive/20"
                    onClick={(e) => {
                      e.stopPropagation();
                      onLayerDelete(layer.id);
                    }}
                  >
                    <Trash2 className="h-3 w-3 text-destructive" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};