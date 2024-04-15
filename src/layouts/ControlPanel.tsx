import { closestCenter, useDroppable } from "@dnd-kit/core";
import { Component } from "../interface/Component";
import { useComponentContext } from "../context/componentsContext";

import { DndContext } from "@dnd-kit/core";
import Button from "../components/Button";
import Input from "../components/Input";
import Typography from "../components/Typography";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  component: Component;
  showProperties: any;
}

const RenderComponent = ({ component, showProperties }: Props) => {
  const { setNodeRef, transform, transition, listeners, attributes } =
    useSortable({
      id: component.id,
    });

  const handleMouseDown = () => {
    showProperties(component);
  };

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const test = component.type.toLowerCase();
  switch (test) {
    case "input":
      return (
        <div
          className="relative text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-full p-3 cursor-all-scroll"
          ref={setNodeRef}
          {...listeners}
          {...attributes}
          style={style}
          onMouseDown={handleMouseDown}
        >
          <Input {...component.properties} />
        </div>
      );
    case "typography":
      return (
        <div
          ref={setNodeRef}
          {...listeners}
          {...attributes}
          style={style}
          className={
            "relative text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-full p-3"
          }
          onMouseDown={handleMouseDown}
        >
          <Typography {...component.properties} />
        </div>
      );
    case "button":
      return (
        <div
          ref={setNodeRef}
          {...listeners}
          {...attributes}
          style={style}
          className={
            "relative text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-full p-3"
          }
          onMouseDown={handleMouseDown}
        >
          <Button {...component.properties} />
        </div>
      );
    default:
      break;
  }
};

const ControlPanel = () => {
  const {
    components: draggedComponents,
    setSelectedComponent,
    onDragEndMove,
  } = useComponentContext();
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
      {/* <div className="h-full list flex items-center p-2 space-y-6 flex-col "> */}

      <div className="">
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={onDragEndMove}
        >
          <SortableContext
            items={draggedComponents}
            strategy={verticalListSortingStrategy}
          >
            {draggedComponents &&
              draggedComponents.length > 0 &&
              draggedComponents.map((component, index) => (
                <div key={index} className="mt-5">
                  <RenderComponent
                    key={component.id}
                    component={component}
                    showProperties={setSelectedComponent}
                  />
                </div>
              ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};

export default ControlPanel;
