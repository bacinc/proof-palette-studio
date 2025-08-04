import { useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";

interface CanvasProps {
  width?: number;
  height?: number;
  className?: string;
}

export const Canvas = ({ width = 800, height = 600, className }: CanvasProps) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  return (
    <Card className="flex-1 bg-canvas-bg border-border shadow-panel overflow-hidden">
      <div className="p-6 h-full flex items-center justify-center">
        <div
          ref={canvasRef}
          className="relative bg-background rounded-lg shadow-elegant border border-border"
          style={{ width, height }}
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
          
          {/* Sample content - this would be replaced with actual layer rendering */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-32 h-32 bg-gradient-primary rounded-full mx-auto opacity-50" />
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-48 mx-auto" />
                <div className="h-3 bg-muted rounded w-32 mx-auto" />
              </div>
            </div>
          </div>
          
          {/* Layer indicators */}
          <div className="absolute top-4 left-4">
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-accent rounded-full" title="Background Layer" />
              <div className="w-3 h-3 bg-primary rounded-full" title="Product Layer" />
              <div className="w-3 h-3 bg-secondary rounded-full" title="Design Layer" />
            </div>
          </div>
          
          {/* Selection handles would appear here for selected elements */}
          <div className="absolute top-20 left-20 w-16 h-16 border-2 border-primary border-dashed rounded opacity-0 hover:opacity-100 transition-opacity">
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-primary rounded-full" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-primary rounded-full" />
            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-primary rounded-full" />
          </div>
        </div>
      </div>
    </Card>
  );
};