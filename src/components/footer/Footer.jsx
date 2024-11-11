import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  return (
    <section className="relative overflow-hidden py-10 shadow-xl bg-orange-200 m-2 rounded-xl border border-t-2 border-t-orange-500">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="-m-6 flex flex-wrap">
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-4 inline-flex  text-7xl rounded-xl  justify-center w-auto items-center">
                <Logo width="400px" />
              </div>
              <div>
                <p className="text-xl text-orange-700">
                  &copy; Copyright 2023. All Rights Reserved by csVisual.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full flex flex-col text-start bg-orange-100 p-2 shadow-2xl rounded-xl">
              <h3 className="tracking-px mb-9 text-xs  bg-orange-200 p-2 w-fit shadow-xl  rounded-xl font-semibold uppercase text-orange-600">
                Company
              </h3>
              <ul className="flex flex-col text-start">
                <li className="mb-4">
                  <Link
                    className="text-base font-medium text-orange-800 hover:text-orange-600"
                    to="/"
                  >
                    Features
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className="text-base font-medium text-orange-800 hover:text-orange-600"
                    to="/"
                  >
                    Pricing
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className="text-base font-medium text-orange-800 hover:text-orange-600"
                    to="/"
                  >
                    Affiliate Program
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-base font-medium text-orange-800 hover:text-orange-600"
                    to="/"
                  >
                    Press Kit
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full flex flex-col text-start bg-orange-100 rounded-xl p-2">
              <h3 className="tracking-px mb-9 text-xs font-semibold bg-orange-200 p-2 w-fit shadow-xl  rounded-xl  uppercase text-orange-600">
                Support
              </h3>
              <ul className="flex flex-col text-start">
                <li className="mb-4">
                  <Link
                    className="text-base font-medium text-orange-800 hover:text-orange-600"
                    to="/"
                  >
                    Account
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className="text-base font-medium text-orange-800 hover:text-orange-600"
                    to="/"
                  >
                    Help
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className="text-base font-medium text-orange-800 hover:text-orange-600"
                    to="/"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-base font-medium text-orange-800 hover:text-orange-600"
                    to="/"
                  >
                    Customer Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <div className="h-full flex flex-col text-start bg-orange-100 rounded-xl p-2">
              <h3 className="tracking-px mb-9 text-xs font-semibold bg-orange-200 p-2 w-fit shadow-xl  rounded-xl uppercase text-orange-600">
                Legals
              </h3>
              <ul className="flex flex-col text-start">
                <li className="mb-4">
                  <Link
                    className="text-base font-medium text-orange-800 hover:text-orange-600"
                    to="/"
                  >
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className="text-base font-medium text-orange-800 hover:text-orange-600"
                    to="/"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-base font-medium text-orange-800 hover:text-orange-600"
                    to="/"
                  >
                    Licensing
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
