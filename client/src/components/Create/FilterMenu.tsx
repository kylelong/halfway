import InputBox from "./InputBox";
import SelectMenu from "./SelectMenu";
import DropDownMenu from "./DropDownMenu";
import {TONE, LENGTH} from "../../types/basics";

export default function FilterMenu() {
  const tonesArray = Object.entries(TONE).map(([key, value], index) => {
    return {
      id: index + 1,
      data: value as string,
    };
  });

  const lengthsArray = Object.values(LENGTH);
  const options = [
    "complete paper",
    "outline",
    "ideas",
    "sentence",
    "paragraph",
  ];
  return (
    <div>
      <div className="mb-4">
        <InputBox />
      </div>

      <div className="mb-6">
        <DropDownMenu
          options={options}
          label="Content type"
          description="Type"
        />
      </div>

      <div className="mb-4">
        <SelectMenu options={tonesArray} label="Tone" />
      </div>

      <div className="mb-6">
        <DropDownMenu
          options={lengthsArray}
          label="Length"
          description="Content Length"
        />
      </div>
      <button
        type="button"
        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Generate
      </button>
    </div>
  );
}
