import { ThemeProvider } from "./src/contexts/ThemeProvider";
import { SIDProvider } from "./src/contexts/SIDProvider";
import Main from "./src/navigation/Main";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SchoolsWithIdsProvider } from "./src/contexts/SchoolsWithIdsProvider";

export default function App() {
  //AsyncStorage.clear();
  return (
    <ThemeProvider>
      <SchoolsWithIdsProvider>
        <SIDProvider>
          <Main />
        </SIDProvider>
      </SchoolsWithIdsProvider>
    </ThemeProvider>
  );
}
