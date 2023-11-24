import React, { useState } from "react";
import { SIDContext } from "./Contexts";

export function SIDProvider({ children }: any) {
  const [sid, setSid] = useState("");

  return (
    <SIDContext.Provider value={{ sid, setSid }}>
      {children}
    </SIDContext.Provider>
  );
}
