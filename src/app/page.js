import Nav from "./components/Nav";
import Recipes from "./recipes/Recipes";
import SearchBar from "./components/SearchBar";


export default function Home() {
  return (
    <>
    <nav>
   <Nav/>
   </nav>
   <SearchBar />
    <Recipes/>
  
    </>
  );
}
