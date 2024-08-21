import Recipes from "./recipes/page";
import SearchBar from "./components/server/SearchBar";
import RootLayout from "./layout";

export default function Home() {
  return (
    <>
          <main>
            <SearchBar />
            <Recipes />
          </main>
    </>
  );
}
