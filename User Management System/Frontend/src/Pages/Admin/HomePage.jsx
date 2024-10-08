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
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../Store/Slices/AdminSlice";
import axios from "axios";
import { handleSuccess } from "../../Utils/tostify";


const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function HomePage() {
  const [admin, setAdmin] = useState({
    name: "Tom Cook",
    email: "tom@example.com",
    phone: "1234567890",
    imageUrl: "../../user.png",
  });
  const navigation = [
    { name: "Dashboard", href: "/admin/dashboard", current: true , data:admin },
    { name: "User Management", href: "/admin/adminpanel", current: false },
  ];
  const Admin = useSelector((state) => state?.admins?.AdminData?.admin);
  const imgPath = Admin.profile;
  const profilePic = imgPath.split("\\").pop();
  console.log(profilePic);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(Admin);
  useEffect(() => {
    setAdmin({
      name: Admin.name,
      email: Admin.email,
      phone: Admin.phone,
      imageUrl: `http://localhost:8080/${profilePic}`,
    });
  }, []);
  const handleLogout = () => {
    try {
      const url = "http://localhost:8080/admin/logout";
      const response = axios.post(url,{},{
        withCredentials:true
      });
      if (response) {
        dispatch(logout());
        navigate("/admin/login");
        handleSuccess("Logout successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    alt="Your Company"
                    src={admin.imageUrl}
                    className="h-8 w-8"
                  />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        props={item.data}
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
            {/* <div className=" align-middle p-2 mt-4 sm:mt-0">
              <button className="px-3 py-2 rounded-lg border-2">Edit</button>
            </div> */}
          </div>
          <div></div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 md:flex">
            <div className="md:w-3/4 md:m-0 m-3 p-3">
              <h4 className="text-3xl font-semibold leading-10 mb-2">
                System Admin Guide
              </h4>
              <p className="text-xl mb-2 text-black font-normal">
                Learn how to use the Admin Panel to manage people, groups,
                content and the security of your Workplace.
              </p>

              <p className="text-neutral-800">
                As a new system admin, you have access to some of the most
                important functionality on Workplace in the Admin Panel, and you
                might be wondering where to begin. This guide will walk you
                through how to use the Admin Panel to manage people, groups,
                content and the security of your Workplace. Please note, this
                guide is specific to system administrators. Other admin types
                have limited features and functionality. Visit the Technical
                Resources for more information on the different admin roles. You
                can to share with other admins in your community. And be sure to
                check out the User Guide for everything you need to start
                collaborating and communicating on Workplace as a user.
              </p>
            </div>
            <div className="border-2 md:w-1/4 flex flex-col p-2 py-5 ">
              <img
                src={admin.imageUrl}
                alt="Profile pic"
                className="rounded-lg w-32 m-auto"
              />
              <div className="m-2">
                <p className="text-lg font-medium">Name : {admin.name}</p>
                <p className="text-lg font-medium">Email : {admin.email}</p>
                <p className="text-lg font-medium">Phone : {admin.phone}</p>
                <p className="text-lg font-medium">Designation : Admin</p>
              </div>
              <button
                onClick={handleLogout}
                className="rounded-r-lg rounded-l-lg bg-rose-600 py-2 px-3 text-white"
              >
                Logout
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default HomePage;
