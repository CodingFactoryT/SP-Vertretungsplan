import React, { useState } from "react";
import { SIDContext } from "./Contexts";

export function SIDProvider({ children }) {
  const [sid, setSid] = useState<string>("");

  return (
    <SIDContext.Provider value={[sid, setSid]}>{children}</SIDContext.Provider>
  );
}
