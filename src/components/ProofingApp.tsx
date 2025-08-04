import { useState } from "react";
import { LayerPanel, Layer } from "./LayerPanel";
import { Canvas } from "./Canvas";
import { PropertyPanel } from "./PropertyPanel";
import { Toolbar } from "./Toolbar";
import { toast } from "sonner";

const initialLayers: Layer[] = [
  {
    id: "background-1",
    name: "Business Background",
    type: "background",
    visible: true,
    locked: false,
    opacity: 100,
  },
  {
    id: "product-1",
    name: "Product Photo",
    type: "product",
    visible: true,
    locked: false,
    opacity: 100,
  },
  {
    id: "design-1",
    name: "Front Logo",
    type: "design",
    visible: true,
    locked: false,
    opacity: 100,
  },
];

export const ProofingApp = () => {
  const [layers, setLayers] = useState<Layer[]>(initialLayers);
  const [activeLayerId, setActiveLayerId] = useState<string | null>("background-1");
  const [activeTool, setActiveTool] = useState("select");

  const activeLayer = layers.find(layer => layer.id === activeLayerId);

  const handleLayerSelect = (layerId: string) => {
    setActiveLayerId(layerId);
    toast(`Selected ${layers.find(l => l.id === layerId)?.name}`);
  };

  const handleLayerToggleVisibility = (layerId: string) => {
    setLayers(prev =>
      prev.map(layer =>
        layer.id === layerId
          ? { ...layer, visible: !layer.visible }
          : layer
      )
    );
  };

  const handleLayerToggleLock = (layerId: string) => {
    setLayers(prev =>
      prev.map(layer =>
        layer.id === layerId
          ? { ...layer, locked: !layer.locked }
          : layer
      )
    );
  };

  const handleLayerDelete = (layerId: string) => {
    const layer = layers.find(l => l.id === layerId);
    if (layer) {
      setLayers(prev => prev.filter(l => l.id !== layerId));
      if (activeLayerId === layerId) {
        setActiveLayerId(null);
      }
      toast(`Deleted ${layer.name}`);
    }
  };

  const handleToolChange = (tool: string) => {
    setActiveTool(tool);
    toast(`Switched to ${tool} tool`);
  };

  const handleAction = (action: string) => {
    switch (action) {
      case "save":
        toast("Project saved successfully!");
        break;
      case "download":
        toast("Exporting proof...");
        break;
      case "share":
        toast("Generating share link...");
        break;
      case "upload":
        toast("Opening file browser...");
        break;
      case "undo":
        toast("Undoing last action...");
        break;
      case "redo":
        toast("Redoing action...");
        break;
      case "zoom-in":
        toast("Zooming in...");
        break;
      case "zoom-out":
        toast("Zooming out...");
        break;
      case "reset":
        toast("Resetting view...");
        break;
      default:
        toast(`Action: ${action}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Toolbar */}
      <div className="border-b border-border bg-workspace">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                ProofStudio
              </h1>
              <p className="text-sm text-muted-foreground">
                Professional Promotional Products Proofing
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">Untitled Project</p>
              <p className="text-xs text-muted-foreground">Last saved: Just now</p>
            </div>
          </div>
          
          <Toolbar
            activeTool={activeTool}
            onToolChange={handleToolChange}
            onAction={handleAction}
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex h-[calc(100vh-140px)]">
        {/* Left Sidebar - Layers */}
        <div className="w-80 border-r border-border bg-workspace p-4">
          <LayerPanel
            layers={layers}
            activeLayerId={activeLayerId}
            onLayerSelect={handleLayerSelect}
            onLayerToggleVisibility={handleLayerToggleVisibility}
            onLayerToggleLock={handleLayerToggleLock}
            onLayerDelete={handleLayerDelete}
          />
        </div>

        {/* Center - Canvas */}
        <div className="flex-1 bg-gradient-workspace">
          <Canvas />
        </div>

        {/* Right Sidebar - Properties */}
        <div className="w-80 border-l border-border bg-workspace p-4">
          <PropertyPanel activeLayerType={activeLayer?.type || null} />
        </div>
      </div>
    </div>
  );
};