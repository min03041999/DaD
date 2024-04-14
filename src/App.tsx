import "./App.css";
import { ReactElement } from "react";
import SidePanel from "./layouts/SidePanel";
import ControlPanel from "./layouts/ControlPanel";
import PropertyPanel from "./layouts/PorpertyPanel";

import { DndContext } from "@dnd-kit/core";
import { useComponentContext } from "./context/componentsContext";

import { BeakerIcon } from "@heroicons/react/24/solid";

const FORM_ELEMENTS: {
  element: string;
  array: { title: string; icon: ReactElement }[];
}[] = [
  {
    element: "Layout Elements",
    array: [
      {
        title: "Typography",
        icon: <BeakerIcon className="h-6 w-6 text-blue-500" />,
      },
    ],
  },
  {
    element: "Form Elements",
    array: [
      {
        title: "Input",
        icon: <BeakerIcon className="h-6 w-6 text-blue-500" />,
      },
      {
        title: "Button",
        icon: <BeakerIcon className="h-6 w-6 text-blue-500" />,
      },
    ],
  },
];

function App() {
  const { onDragEnd } = useComponentContext();
  return (
    <div className="flex h-[100dvh] flex-col bg-slate-50">
      <h1 className="font-mono text-3xl font-bold text-indigo-500 ml-5 mb-3">
        Form Drag And Drop
      </h1>
      <div className="w-screen h-screen flex">
        <DndContext onDragEnd={onDragEnd}>
          <SidePanel components={FORM_ELEMENTS} />
          <ControlPanel />
          <PropertyPanel />
        </DndContext>
      </div>
    </div>
  );
}

export default App;
