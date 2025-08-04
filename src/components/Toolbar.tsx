import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  MousePointer2,
  Square,
  Circle,
  Type,
  Image,
  Upload,
  Download,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Save,
  Share2
} from "lucide-react";

interface ToolbarProps {
  activeTool: string;
  onToolChange: (tool: string) => void;
  onAction: (action: string) => void;
}

export const Toolbar = ({ activeTool, onToolChange, onAction }: ToolbarProps) => {
  const tools = [
    { id: "select", icon: MousePointer2, label: "Select" },
    { id: "rectangle", icon: Square, label: "Rectangle" },
    { id: "circle", icon: Circle, label: "Circle" },
    { id: "text", icon: Type, label: "Text" },
    { id: "image", icon: Image, label: "Image" },
  ];

  const actions = [
    { id: "upload", icon: Upload, label: "Upload" },
    { id: "undo", icon: Undo, label: "Undo" },
    { id: "redo", icon: Redo, label: "Redo" },
    { id: "zoom-in", icon: ZoomIn, label: "Zoom In" },
    { id: "zoom-out", icon: ZoomOut, label: "Zoom Out" },
    { id: "reset", icon: RotateCcw, label: "Reset View" },
  ];

  const fileActions = [
    { id: "save", icon: Save, label: "Save", variant: "default" as const },
    { id: "download", icon: Download, label: "Export", variant: "outline" as const },
    { id: "share", icon: Share2, label: "Share", variant: "outline" as const },
  ];

  return (
    <Card className="bg-panel-bg border-border shadow-panel">
      <div className="p-3">
        <div className="flex items-center justify-between">
          {/* Tools Section */}
          <div className="flex items-center gap-1">
            {tools.map((tool) => {
              const IconComponent = tool.icon;
              return (
                <Button
                  key={tool.id}
                  size="sm"
                  variant={activeTool === tool.id ? "default" : "ghost"}
                  className={
                    activeTool === tool.id
                      ? "bg-primary hover:bg-primary-hover text-primary-foreground shadow-glow"
                      : "hover:bg-muted/50"
                  }
                  onClick={() => onToolChange(tool.id)}
                  title={tool.label}
                >
                  <IconComponent className="h-4 w-4" />
                </Button>
              );
            })}
          </div>

          <Separator orientation="vertical" className="h-6 bg-border" />

          {/* Actions Section */}
          <div className="flex items-center gap-1">
            {actions.map((action) => {
              const IconComponent = action.icon;
              return (
                <Button
                  key={action.id}
                  size="sm"
                  variant="ghost"
                  className="hover:bg-muted/50"
                  onClick={() => onAction(action.id)}
                  title={action.label}
                >
                  <IconComponent className="h-4 w-4" />
                </Button>
              );
            })}
          </div>

          <Separator orientation="vertical" className="h-6 bg-border" />

          {/* File Actions Section */}
          <div className="flex items-center gap-2">
            {fileActions.map((action) => {
              const IconComponent = action.icon;
              return (
                <Button
                  key={action.id}
                  size="sm"
                  variant={action.variant}
                  className={
                    action.variant === "default"
                      ? "bg-accent hover:bg-accent-hover text-accent-foreground"
                      : "border-border hover:bg-muted/50"
                  }
                  onClick={() => onAction(action.id)}
                >
                  <IconComponent className="h-4 w-4 mr-1" />
                  {action.label}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
};