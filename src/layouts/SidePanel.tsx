import { ReactElement } from "react";

import { useDraggable } from "@dnd-kit/core";
import cuid from "cuid";
import { useComponentContext } from "../context/componentsContext";
import { COMPONENT } from "../type";

interface SidePanelProps {
  components: {
    element: string;
    array: {
      title: string;
      icon: ReactElement;
    }[];
  }[];
}

interface ComponentProps {
  component: {
    title: string;
    icon: ReactElement;
  };
}

const Component = (props: ComponentProps) => {
  const { component } = props;
  const { title, icon }: { title: string; icon: ReactElement } = component;
  console.log(component);
  const { setNodeRef, transform, listeners, attributes } = useDraggable({
    id: `${COMPONENT}-${title}`, // COMPONENT-Button for button
    data: { type: title, id: cuid(), properties: {} },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;
  return (
    <div
      ref={setNodeRef}
      {...listeners} //{"onClick": () => void, onDrag: (e) => void}
      {...attributes}
      style={style}
      className="relative flex flex-row justify-start items-center gap-3 mb-1 p-3 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-full"
    >
      {icon} {title}
    </div>
  );
};

const SidePanel = ({ components }: SidePanelProps) => {
  const { components: draggedItems } = useComponentContext();

  return (
    <div className="w-3/12 bg-white box-border">
      <div className="mx-5">
        <p className="text-xl font-bold mb-1">Form Elements</p>
        <p className="text-sm text-slate-400 mb-1">
          Drag elements to the right
        </p>
      </div>
      <div className="" id="components">
        {components.map((item: any) => (
          <div
            className="text-sm mt-5 mx-5 font-medium text-slate-400"
            key={item.element}
          >
            {item.element}
            <div className="mt-1 grid grid-cols-2 gap-4">
              {item?.array.map((item: any) => (
                <Component key={item.title} component={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* <div className="mt-5 text-center">
        <a
          className="text-blue-500 underline text-lg"
          style={{ margin: 10 }}
          href={`data:text/json;charset=utf-8,${encodeURIComponent(
            JSON.stringify(draggedItems)
          )}`}
          download="data.json"
        >
          Download JSON
        </a>
      </div> */}
    </div>
  );
};
export default SidePanel;
