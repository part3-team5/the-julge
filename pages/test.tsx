import Dropdown from "@/components/Dropdown";

export default function test() {
  const options = [
    "한식",
    "중식",
    "일식",
    "양식",
    "분식",
    "카페",
    "PC방",
    "기타1",
    "기타2",
  ];

  return <Dropdown options={options} />;
}
