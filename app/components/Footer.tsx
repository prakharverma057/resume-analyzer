"use client";

import {
  Footer,
  FooterBrand,
  FooterCopyright,
  FooterDivider,
  FooterIcon,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
} from "flowbite-react";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsLinkedin,
  BsTwitter,
} from "react-icons/bs";

function FooterComponent() {
  return (
    <Footer
      container
      theme={{
        root: {
          base: "w-full bg-white shadow-none dark:bg-gray-800 md:flex md:items-center md:justify-between rounded-none",
          container: "w-full p-6 rounded-none",
        },
        brand: {
          base: "rounded-none",
        },
        groupLink: {
          base: "rounded-none",
        },
        icon: {
          base: "rounded-none text-gray-500 hover:text-gray-900 dark:hover:text-white",
        },
      }}
    >
      <div className="w-full rounded-none">
        <div className="w-full h-14 sm:flex sm:items-center sm:justify-between rounded-none">
          <FooterCopyright href="#" by="Pathora™" year={2025} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center rounded-none">
            <FooterIcon
              href="https://prakhar-verma.netlify.app"
              icon={BsDribbble}
            />
            <FooterIcon
              href="https://github.com/prakharverma057"
              icon={BsGithub}
            />
            <FooterIcon
              href="https://linkedin.com/in/prakharverma057"
              icon={BsLinkedin}
            />
          </div>
        </div>
      </div>
    </Footer>
  );
}

export default FooterComponent;
