import { Fragment, useState, useContext, useRef } from "react";
import { Popover, Transition } from "@headlessui/react";
import {
  faBars,
  faBaseballBatBall,
  faBullhorn,
  faClapperboard,
  faShirt,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { categories } from "../utils/constants";
import { MobileNavbar } from "./";
import { CategoryContext, SearchContext } from "../context";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const { setCategory } = useContext(CategoryContext);
  const { setSearchTerm } = useContext(SearchContext);
  const searchInputRef = useRef();
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const navigate = useNavigate();
  const categoriesDropDown = categories(
    faBaseballBatBall,
    faBullhorn,
    faShirt,
    faMusic,
    faClapperboard
  );

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(search);
    searchInputRef.current.value = "";
    setMobileMenuOpen((prevVal) => (prevVal ? false : prevVal));
    navigate(`/search/${search}`);
  };

  return (
    <nav className="bg-white mainNavbar">
      <div
        className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link
            to="/"
            onClick={() => setCategory("general")}
            className="-m-1.5 p-1.5"
          >
            <span className="sr-only">News Monkey</span>
            <img className="h-10 w-auto" src="/logo.png" alt="company-logo" />
          </Link>
        </div>
        <div className="flex lg:hidden flex-1 justify-end">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
              Categories
              <ChevronDownIcon
                className="h-5 w-5 flex-none text-gray-400"
                aria-hidden="true"
              />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute -left-8 top-full z-10 mt-2 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {categoriesDropDown.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                    >
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <FontAwesomeIcon
                          icon={item.icon}
                          className="h-4 w-4 text-gray-600 group-hover:text-orange-600"
                        />
                      </div>
                      <div className="flex-auto">
                        <Link
                          to={`/top-headlines/${item.href}`}
                          className="block font-semibold text-gray-900"
                          onClick={() => {
                            setCategory(item.name.toLowerCase());
                          }}
                        >
                          {item.name}
                          <span className="absolute inset-0" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
          <Link
            to="/about"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            About Us
          </Link>
        </Popover.Group>
        <form className="lg:flex-1" onSubmit={handleSearchSubmit}>
          <label
            htmlFor="searchField"
            className="hidden lg:flex lg:justify-end gap-2 items-center"
          >
            <p>Search:</p>
            <input
              type="search"
              placeholder="Enter your query here..."
              className="rounded-lg p-3 py-2 border-2"
              onChange={(e) => setSearch(e.target.value)}
              id="searchField"
              ref={searchInputRef}
              required
            />
            <button type="submit">
              <FontAwesomeIcon
                icon={faSearch}
                className="cursor-pointer"
                type="submit"
              />
            </button>
          </label>
        </form>
      </div>
      <MobileNavbar
        classNamesFunction={classNames}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        categoriesDropDown={categoriesDropDown}
        setSearch={setSearch}
        handleSearchSubmit={handleSearchSubmit}
      />
    </nav>
  );
};

export default Navbar;
