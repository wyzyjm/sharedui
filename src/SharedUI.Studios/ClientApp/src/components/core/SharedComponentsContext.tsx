import React from "react";

export type SharedComponentsContext = {
  locale: string;
};

export const SharedComponentsContext = React.createContext<SharedComponentsContext>(null as SharedComponentsContext);
