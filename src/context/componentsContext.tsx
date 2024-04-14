import React, { createContext, useContext, useState } from "react";
import { DragEndEvent } from "@dnd-kit/core";
import { Component } from "../interface/Component";

interface ContextProps {
  components: Component[];
  onDragEnd: (event: DragEndEvent) => void;
  selectedComponent?: Component;
  setSelectedComponent: (selected: Component | undefined) => void;
  deleteComponent: () => void;
  updateProperties: (id: string, field: string, value: string) => void;
}

const Context = createContext<ContextProps | null>(null);

interface ProviderProps {
  children: React.ReactNode;
}

export const ComponentProvider = ({ children }: ProviderProps) => {
  const [components, setComponents] = useState<Component[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<
    Component | undefined
  >(undefined);

  const onDragEnd = (event: DragEndEvent) => {
    const checkType = event.active.data.current;

    let foundButton = false;

    components.filter((component) => {
      if (component.type === "Button") {
        foundButton = true;
        return false;
      }
      return true;
    });

    if (checkType && !foundButton) {
      components.length === 0 && checkType.type.toLowerCase() === "button"
        ? ""
        : setComponents((prev: any) => [...prev, event.active.data.current]);
    }
  };

  const deleteComponent = () => {
    const filterComponents = components.filter(
      (component) => component.id !== selectedComponent?.id
    );
    setComponents(filterComponents);
    setSelectedComponent(undefined);
  };

  const updateProperties = (id: string, field: string, value: string) => {
    const updatedComponents = components.map((component) => {
      if (component.id === id) {
        return {
          ...component,
          properties: {
            ...component.properties,
            [field]: value,
          },
        };
      }
      return component;
    });
    setComponents(updatedComponents);
  };

  const value: ContextProps = {
    components,
    selectedComponent,
    onDragEnd,
    setSelectedComponent,
    deleteComponent,
    updateProperties,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useComponentContext = (): ContextProps => {
  const context = useContext(Context);
  if (context === null) {
    throw new Error("ComponentProvider not found");
  }
  return context;
};
