import { useDroppable } from "@dnd-kit/core";
import { Component } from "../interface/Component";
import { useComponentContext } from "../context/componentsContext";

import Button from "../components/Button";
import Input from "../components/Input";
import Typography from "../components/Typography";

interface Props {
  component: Component;
}

const RenderComponent = ({ component }: Props) => {
  console.log(component);
  if (component.type.toLowerCase() === "button") {
    return <Button {...component.properties} />;
  } else if (component.type.toLowerCase() === "input") {
    return <Input {...component.properties} />;
  } else if (component.type.toLowerCase() === "typography") {
    return <Typography {...component.properties} />;
  }
  return <Button title="button" />;
};

const ControlPanel = () => {
  const { components: draggedComponents, setSelectedComponent } =
    useComponentContext();
  const { isOver, setNodeRef } = useDroppable({ id: "drop-container" });
  return (
    <div
      ref={setNodeRef}
      className={
        isOver
          ? "w-6/12 rounded-lg border-2 border-dashed bg-muted/25 border-slate-700"
          : "w-6/12 rounded-lg border-2 border-dashed bg-muted/25 border-slate-300"
      }
    >
      <div className="h-full list flex items-center p-2 space-y-6 flex-col ">
        {draggedComponents &&
          draggedComponents.length > 0 &&
          draggedComponents.map((component, index) => (
            <div
              key={index}
              onClick={() => setSelectedComponent(component)}
              className={
                "relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-full p-3"
              }
            >
              <RenderComponent component={component} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ControlPanel;
