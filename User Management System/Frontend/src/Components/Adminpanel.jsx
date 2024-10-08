import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  PencilSquareIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState, useLayoutEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UserTable from "./UserTable";
import axios from "axios";

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", current: false },
  { name: "User Management", href: "/admin/adminpanel", current: true },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Adminpanel() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState({
    name: "Tom Cook",
    email: "tom@example.com",
    phone: "1234567890",
    imageUrl: "../../user.png",
  });
  const [UsersData, setUserData] = useState([]);
  const [serachData , setSearchData] = useState([])
  const [searchTerm , setSearchTerm] = useState("")
  const Admin = useSelector((state) => state?.admins?.AdminData?.admin);
  const imgPath = Admin.profile;
  const profilePic = imgPath.split("\\").pop();
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  const users = useSelector((state) => state?.users?.userData?.user);
  console.log(users);
  
  useEffect(() => {
    setAdmin({
      name: Admin.name,
      email: Admin.email,
      phone: Admin.phone,
      imageUrl: `http://localhost:8080/${profilePic}`,
    });
    const getUser = async (req, res) => {
      const url = "http://localhost:8080/admin/getuser";
      const response = await axios.get(url,{
        withCredentials:true
      });
      const usersData = response?.data?.users;
      console.log(usersData);
      setUserData(usersData);
      setSearchData(usersData);
    };
    getUser();
  }, []);
  console.table(UsersData);
  
  const handleAdduser = () => {
    navigate("/admin/adminpanel/addUser");
  };
  const handleSearch = (e) =>{
      const term = e.target.value

      setSearchTerm(term)
      const search = UsersData.filter(data=>
            data.name.toLowerCase().includes(term.toLowerCase()) || 
            data.email.toLowerCase().includes(term.toLowerCase())
      )
      setSearchData(search)
  }
  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    alt="Your Company"
                    src={admin.imageUrl}
                    className="h-8 w-8 rounded-full"
                  />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        aria-current={item.current ? "page" : undefined}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          alt=""
                          src={admin.imageUrl}
                          className="h-8 w-8 rounded-full"
                        />
                      </MenuButton>
                    </div>          
                  </Menu>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon
                    aria-hidden="true"
                    className="block h-6 w-6 group-data-[open]:hidden"
                  />
                  <XMarkIcon
                    aria-hidden="true"
                    className="hidden h-6 w-6 group-data-[open]:block"
                  />
                </DisclosureButton>
              </div>
            </div>
          </div>

          <DisclosurePanel className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  as="Link"
                  to={item.href}
                  aria-current={item.current ? "page" : undefined}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="border-t border-gray-700 pb-3 pt-4">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <img
                    alt=""
                    src={admin.imageUrl}
                    className="h-10 w-10 rounded-full"
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium leading-none text-white">
                    {admin.name}
                  </div>
                  <div className="text-sm font-medium leading-none text-gray-400">
                    {admin.email}
                  </div>
                </div>
              </div>
            </div>
          </DisclosurePanel>
        </Disclosure>

        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl sm:flex justify-between px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Dashboard
            </h1>
            <div className="flex gap-2">
              <button
                onClick={handleAdduser}
                className="border py-3 px-4 font-semibold rounded-lg bg-slate-800 text-sky-50"
              >
                Add user
              </button>
              <div className="border-2 align-middle p-2 mt-4 sm:mt-0 border-slate-800 rounded-lg">
                <i className="bx bx-search"></i>
                <input
                  type="search"
                  placeholder="Search"
                  className="px-3 focus:outline-none text-lg"
                  onChange={handleSearch}
                  value={searchTerm}
                />
              </div>
            </div>
          </div>
          <div></div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 md:flex">
            <UserTable usersData={serachData} />
          </div>
        </main>
      </div>
    </>
  );
}

export default Adminpanel;
