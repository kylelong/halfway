import React, {useEffect, useState, useRef} from "react";
import SelectMenu from "./SelectMenu";
import DropDownMenu from "./DropDownMenu";
import TextArea from "./TextArea";
import {TONE, LENGTH, LENGTH_SUB_TEXT} from "../../types/basics";
import Modal from "./Modal";

type Props = {
  item: any;
  childIndex: number;
};

const FilterMenu: React.FC<Props> = ({item, childIndex}) => {
  const [optionsMenu, setOptionsMenu] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const itemNameRef = useRef(item.name);
  const tonesArray = Object.entries(TONE).map(([key, value], index) => {
    return {
      id: index + 1,
      data: value as string,
    };
  });

  const lengthsArray = Object.values(LENGTH);

  useEffect(() => {
    let menu = item.options || [];
    const {children} = item;
    if (children) {
      let {options} = children[childIndex];
      menu = options;
    }
    setOptionsMenu(menu);

    if (
      !selectedType ||
      selectedType === undefined ||
      item.name != itemNameRef.current
    ) {
      setSelectedType(menu[0]);
    }
    itemNameRef.current = item.name;
  }, [item, childIndex, selectedType]);

  return (
    <div>
      <Modal />
      <div>
        {item && (
          <div className="flex flex-row">
            <div>{item.type} </div>
            {item.children && (
              <>
                <span className="ml-1"> - </span>
                <span className="ml-1">{item.children[childIndex].name}</span>
                {item.children[childIndex].coloredIcon && (
                  <img
                    src={item.children[childIndex].coloredIcon}
                    className="w-6 ml-2"
                  />
                )}
              </>
            )}
          </div>
        )}
      </div>
      <div className="mb-4">
        <TextArea
          item={item}
          options={optionsMenu}
          childIndex={childIndex}
          selectedType={selectedType}
        />
      </div>

      {/* dymanic options */}
      <div className="mb-6">
        <DropDownMenu
          options={optionsMenu}
          label={optionsMenu ? optionsMenu[0] : "Content type"}
          description="Type"
          updateSelectedType={setSelectedType}
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
          updateSelectedType={setSelectedType}
          subText={LENGTH_SUB_TEXT}
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
};
export default FilterMenu;
