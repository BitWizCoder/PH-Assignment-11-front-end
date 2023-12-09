import { Footer } from "flowbite-react";

const MainFooter = () => {
  return (
    <div>
      <Footer container>
        <div className="w-full text-center">
          <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
            <h1 className="font-bold text-2xl text-gray-800 dark:text-white">
              AssinmentLab
            </h1>
            <Footer.LinkGroup>
              <Footer.Link href="#">About</Footer.Link>
              <Footer.Link href="#">Privacy Policy</Footer.Link>
              <Footer.Link href="#">Licensing</Footer.Link>
              <Footer.Link href="#">Contact</Footer.Link>
            </Footer.LinkGroup>
          </div>
          <Footer.Divider />
          <Footer.Copyright href="#" by="AssignmentLab™" year={2024} />
        </div>
      </Footer>
    </div>
  );
};

export default MainFooter;
