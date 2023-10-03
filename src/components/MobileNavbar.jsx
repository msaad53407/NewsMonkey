/* eslint-disable react/prop-types */
import { Dialog, Disclosure } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { CountryContext, CategoryContext } from "../context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const MobileNavbar = ({
  classNamesFunction,
  mobileMenuOpen,
  setMobileMenuOpen,
  categoriesDropDown,
  setSearch,
  handleSearchSubmit,
}) => {
  const { country, setCountry } = useContext(CountryContext);
  const { setCategory } = useContext(CategoryContext);
  const searchInputRef = useRef();
  return (
    <Dialog
      as="nav"
      className="lg:hidden"
      open={mobileMenuOpen}
      onClose={setMobileMenuOpen}
    >
      <div className="fixed inset-0 z-10" />
      <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div className="flex items-center justify-between">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">News Monkey</span>
            <img
              className="h-10 w-auto"
              src="/logo.png"
              alt="news monkey logo"
            />
          </Link>
          <button
            type="button"
            className="-m-2.5 rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="sr-only">Close menu</span>
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="space-y-2 py-6">
              <Disclosure as="div" className="-mx-3">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                      Categories
                      <ChevronDownIcon
                        className={classNamesFunction(
                          open ? "rotate-180" : "",
                          "h-5 w-5 flex-none"
                        )}
                        aria-hidden="true"
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="mt-2 space-y-2">
                      {[...categoriesDropDown].map((item) => (
                        <Link
                          key={item.name}
                          as="a"
                          to={`/top-headlines/${item.href}`}
                          className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          onClick={() => {
                            setCategory(item.name.toLowerCase());
                            setMobileMenuOpen((prevVal) =>
                              prevVal ? false : prevVal
                            );
                          }}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
              <Link
                to="/about"
                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                About Us
              </Link>
              <label
                htmlFor="country-select"
                className="flex items-center gap-2 -mx-3 rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
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
                </select>
              </label>
              <form onSubmit={handleSearchSubmit}>
                <label
                  htmlFor="searchField"
                  className="flex justify-center mt-3 gap-2 items-center"
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
                    autoComplete="false"
                    autoCorrect="false"
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
            <button className="py-6">
              <p className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                Change Theme
              </p>
            </button>
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default MobileNavbar;
