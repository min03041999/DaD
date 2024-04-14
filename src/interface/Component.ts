export declare interface Properties {
  title?: string;
  style?: string;
  placeholder?: string;
  label?: string;
  name?: string;
}

export interface Component {
  type: string;
  id: string;
  properties: Properties;
}
