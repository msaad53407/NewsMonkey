import { useContext } from "react";
import { CountryContext, CategoryContext } from "../context";
import { Link } from "react-router-dom";

const SecondaryNavbar = () => {
  const { country, setCountry } = useContext(CountryContext);
  const { setCategory } = useContext(CategoryContext);

  return (
    <nav className="w-full h-max relative">
      <h1 className="text-center font-bold text-4xl font-mono pt-4">
        <Link
          to="/"
          onClick={() => setCategory("general")}
          className="text-gray-800"
        >
          News Monkey
        </Link>
      </h1>
      <label
        htmlFor="country-select"
        className="absolute top-5 max-lg:hidden flex items-center gap-2 right-2 z-50"
      >
        <h5 className="text-gray-900">Country:</h5>
        <select
          id="country-select"
          value={country}
          className="border text-gray-900 cursor-pointer"
          onChange={(e) => setCountry(e.target.value)}
        >
          <option value="us">USA</option>
          <option value="in">India</option>
          <option value="de">Germany</option>
          <option value="cn">China</option>
        </select>
      </label>
    </nav>
  );
};

export default SecondaryNavbar;
