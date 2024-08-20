import Recipes from "./recipes/page";
import SearchBar from "./components/SearchBar";
import RootLayout from "./layout";

export default function Home() {
  return (
    <>
      <div>
        <RootLayout/>
        </div>
          <main>
            <SearchBar />
            <Recipes />
          </main>
    </>
  );
}
