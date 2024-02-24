import { ThemeProvider } from "./src/contexts/ThemeProvider";
import { SIDProvider } from "./src/contexts/SIDProvider";
import Main from "./src/navigation/Main";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SchoolsWithIdsProvider } from "./src/contexts/SchoolsWithIdsProvider";
import * as SecureStore from "expo-secure-store";

export default function App() {
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
