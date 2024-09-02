import dynamic from "next/dynamic";

const DynamicHeader = dynamic(() => import("./components/Map"), {
  ssr: false,
});

export default DynamicHeader;
