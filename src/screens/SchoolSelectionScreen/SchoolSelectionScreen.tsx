import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { useSchoolsWithIds } from "../../hooks/api/useSchoolsWithIds";
import LoadingComponent from "../../components/LoadingComponent";
import SchoolEntry from "./components/SchoolEntry";

export default function SchoolSelectionScreen({ navigation }) {
  const { schoolsWithIds, isLoading } = useSchoolsWithIds();

  return (
    <View style={{ flex: 1 }}>
      {schoolsWithIds.length === 0 ? (
        <LoadingComponent />
      ) : (
        <ScrollView>
          {schoolsWithIds.map((item) => (
            <SchoolEntry
              schoolName={item.schoolName}
              schoolID={item.schoolID}
              key={item.schoolName + item.schoolID}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
}
