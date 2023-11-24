import React, { useState } from "react";
import { SIDContext } from "./Contexts";

export function SchoolsWithIdsProvider({ children }: any) {
  const [schoolsWithIds, setSchoolsWithIds] = useState([]);

  return (
    <SIDContext.Provider value={[schoolsWithIds, setSchoolsWithIds]}>
      {children}
    </SIDContext.Provider>
  );
}
