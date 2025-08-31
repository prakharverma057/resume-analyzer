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
          base: "w-full bg-white shadow-none dark:bg-gray-800 md:flex md:items-center md:justify-between",
          container: "w-full p-6",
        },
      }}
    >
      <div className="w-full">
        <div className="w-full h-14 sm:flex sm:items-center sm:justify-between">
          <FooterCopyright href="#" by="Pathora™" year={2025} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
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
