import { useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";

interface CanvasLayer {
  id: string;
  type: "background" | "product" | "design";
  visible: boolean;
  imageUrl?: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  opacity: number;
}

interface CanvasProps {
  layers: CanvasLayer[];
  activeLayerId: string | null;
  className?: string;
}

export const Canvas = ({ layers, activeLayerId, className }: CanvasProps) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  
  // Proof dimensions: 17" x 11" at 96 DPI = 1632 x 1056 pixels
  const proofWidth = 680; // Scaled down for display
  const proofHeight = 440; // Scaled down for display

  return (
    <Card className="flex-1 bg-canvas-bg border-border shadow-panel overflow-hidden">
      <div className="p-6 h-full flex items-center justify-center">
        <div
          ref={canvasRef}
          className="relative bg-background rounded-lg shadow-elegant border border-border"
          style={{ width: proofWidth, height: proofHeight }}
        >
          {/* Grid overlay for alignment */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
                linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}
          />
          
          {/* Render layers */}
          {layers.map((layer) => {
            if (!layer.visible) return null;
            
            return (
              <div
                key={layer.id}
                className={`absolute border-2 transition-all ${
                  activeLayerId === layer.id ? 'border-primary border-dashed' : 'border-transparent'
                }`}
                style={{
                  left: layer.position.x,
                  top: layer.position.y,
                  width: layer.size.width,
                  height: layer.size.height,
                  opacity: layer.opacity / 100,
                }}
              >
                {layer.imageUrl ? (
                  <img
                    src={layer.imageUrl}
                    alt={`Layer ${layer.id}`}
                    className="w-full h-full object-cover rounded"
                    draggable={false}
                  />
                ) : (
                  <div className="w-full h-full bg-muted/50 rounded flex items-center justify-center text-muted-foreground text-xs">
                    {layer.type === "background" && "Business Background"}
                    {layer.type === "product" && "Product Photo"}
                    {layer.type === "design" && "Logo/Design"}
                  </div>
                )}
                
                {/* Selection handles */}
                {activeLayerId === layer.id && (
                  <>
                    <div className="absolute -top-1 -left-1 w-2 h-2 bg-primary rounded-full" />
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-primary rounded-full" />
                    <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-primary rounded-full" />
                  </>
                )}
              </div>
            );
          })}
          
          {/* Layer indicators */}
          <div className="absolute top-4 left-4">
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-accent rounded-full" title="Background Layer" />
              <div className="w-3 h-3 bg-primary rounded-full" title="Product Layer" />
              <div className="w-3 h-3 bg-secondary rounded-full" title="Design Layer" />
            </div>
          </div>
          
          {/* Proof dimensions indicator */}
          <div className="absolute bottom-2 right-2 bg-background/90 px-2 py-1 rounded text-xs text-muted-foreground">
            17" × 11"
          </div>
        </div>
      </div>
    </Card>
  );
};