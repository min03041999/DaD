import { Component } from "../interface/Component";

export function renderProptiyFields(component: Component) {
  if (!!component) {
    if (component.type === "Input") {
      return ["label", "type"];
    } else if (component.type === "Button") {
      return ["title", "style"];
    } else if (component.type === "Typography") {
      return ["name"];
    }
  }
  return [];
}
