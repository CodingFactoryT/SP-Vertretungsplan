import React, { useState } from "react";
import { SIDContext } from "./Contexts";

export function SchoolsWithIdsProvider({ children }) {
  const [schoolsWithIds, setSchoolsWithIds] = useState([]);

  return (
    <SIDContext.Provider value={[schoolsWithIds, setSchoolsWithIds]}>
      {children}
    </SIDContext.Provider>
  );
}
