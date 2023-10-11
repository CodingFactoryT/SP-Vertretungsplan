import { ThemeProvider } from "./src/contexts/ThemeProvider";
import { SIDProvider } from "./src/contexts/SIDProvider";
import Main from "./src/navigation/Main";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  return (
    <ThemeProvider>
      <SIDProvider>
        <Main />
      </SIDProvider>
    </ThemeProvider>
  );
}
