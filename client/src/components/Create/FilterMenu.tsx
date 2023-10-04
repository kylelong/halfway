import OpenAI from "openai";
import React, {useEffect, useState, useRef} from "react";
import SelectMenu from "./SelectMenu";
import DropDownMenu from "./DropDownMenu";
import TextArea from "./TextArea";

import {
  TONE,
  LENGTH,
  LENGTH_SUB_TEXT,
  BRIEF_RANGE,
  SHORT_RANGE,
  MEDIUM_RANGE,
  LONG_RANGE,
} from "../../types/basics";
import Modal from "./Modal";
import ChatGPTSVG from "../../assets/chatgpt.svg";
import OpenAIModal from "./OpenAIModal";

type Props = {
  item: any;
  childIndex: number;
  updateContent: React.Dispatch<React.SetStateAction<string>>;
};

const FilterMenu: React.FC<Props> = ({item, childIndex, updateContent}) => {
  const tonesArray = Object.entries(TONE).map(([key, value], index) => {
    return {
      id: index + 1,
      data: value as string,
    };
  });

  const lengthsArray = Object.values(LENGTH);

  const [optionsMenu, setOptionsMenu] = useState([]);
  const [selectedType, setSelectedType] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selectedLength, setSelectedLength] = useState<string>(lengthsArray[0]);
  const [tone, setTone] = useState(tonesArray[0].data);
  const [showOpenAIModal, setShowOpenAIModal] = useState<boolean>(false);
  const [data, setData] = useState({
    description: "",
    childIndex: 0,
    item: item,
    selectedType: "", // sub type
    tone: tonesArray[0].data,
    textLength: selectedLength, // how long content will be [short, medium, long]
  });

  const itemNameRef = useRef(item.name);
  const childIndexRef = useRef(childIndex);
  const selectedTypeRef = useRef("");
  const selectedLengthRef = useRef(selectedLength);
  const toneRef = useRef(tone);
  const descriptionRef = useRef("");
  const toggleModal = () => {
    setShowOpenAIModal((prevOpen) => !prevOpen);
  };
  const openai = new OpenAI({
    apiKey: localStorage.getItem("hw_openai_apikey") || "", // It's better to use this from a backend server
    dangerouslyAllowBrowser: true, // Use with caution
  });

  const generate = async (query: string) => {
    try {
      const completion = await openai.completions.create({
        model: "gpt-3.5-turbo-instruct",
        prompt: query,
        max_tokens: 248,
        temperature: 0,
      });

      if (completion) {
        updateContent(completion.choices[0].text);
      }
    } catch (err) {
      const error: any = JSON.parse(JSON.stringify(err));
      console.log(error);
    }
  };

  const generateQuery = () => {
    if (!localStorage.getItem("hw_openai_apikey")) {
      setShowOpenAIModal(true);
      return;
    }
    const {description, childIndex, item, selectedType, tone, textLength} =
      data;
    // TODO: Error checking
    /**
     *  description is empty
     *  textLength is not short, medium, long (hackers)
     *  child or selectedType is not valid
     */
    // selectedType is the specific of the medium email : message, subject
    const type = item.children ? item.children[childIndex].name : item.type;
    // console.log(data); // TODO: use for template
    let wordRange: any = [];
    if (textLength === "Brief") {
      wordRange = BRIEF_RANGE;
    } else if (textLength === "Short") {
      wordRange = SHORT_RANGE;
    } else if (textLength === "Medium") {
      wordRange = MEDIUM_RANGE;
    } else if (textLength === "Long") {
      wordRange = LONG_RANGE;
    }
    // CALL OPEN AI
    let message = `generate a ${type} ${selectedType} in a ${tone} tone that is between ${wordRange[0]} and ${wordRange[1]} words described as ${description}`;
    generate(message);
  };

  useEffect(() => {
    // sub type can come from parent or the child
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
      item.name !== itemNameRef.current ||
      childIndex !== childIndexRef.current
    ) {
      setSelectedType(menu[0]);
    }
    if (item.name !== itemNameRef.current) {
      setData({...data, item: item});
      setDescription("");
    }
    if (selectedType !== selectedTypeRef.current) {
      setData({...data, selectedType: selectedType});
    }
    if (selectedLength !== selectedLengthRef.current) {
      setData({...data, textLength: selectedLength});
    }
    if (tone !== toneRef.current) {
      setData({...data, tone: tone});
    }
    if (description !== descriptionRef.current) {
      setData({...data, description: description});
    }
    if (childIndex !== childIndexRef.current) {
      setData({...data, childIndex: childIndex});
      setSelectedType(menu[0]);
      setDescription("");
    }

    itemNameRef.current = item.name;
    childIndexRef.current = childIndex;
    selectedTypeRef.current = selectedType;
    selectedLengthRef.current = selectedLength;
    toneRef.current = tone;
    descriptionRef.current = description;
  }, [
    item,
    childIndex,
    selectedType,
    data,
    selectedLength,
    tone,
    description,
    showOpenAIModal,
  ]);

  return (
    <div>
      {!localStorage.getItem("hw_openai_apikey") && (
        <>
          {" "}
          <button
            style={{backgroundColor: "#00A67E"}}
            type="button"
            onClick={toggleModal}
            className="flex flex-row mb-2 rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            <img alt="chatgpt" src={ChatGPTSVG} className="w-5 h-5 mr-1.5" />
            Add OpenAI API Key
          </button>
          <OpenAIModal
            showModal={showOpenAIModal}
            onClose={() => setShowOpenAIModal(false)}
          />{" "}
        </>
      )}

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
                    alt="icon"
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
          updateText={setDescription}
          defaultText={description}
        />
      </div>

      {/* dymanic options */}
      <div className="mb-6">
        <DropDownMenu
          options={optionsMenu}
          label={optionsMenu ? optionsMenu[0] : "Content type"}
          description="Type"
          updateSelection={setSelectedType}
        />
      </div>

      <div className="mb-4">
        <SelectMenu
          options={tonesArray}
          updateSelection={setTone}
          label="Tone"
        />
      </div>

      <div className="mb-6">
        <DropDownMenu
          options={lengthsArray}
          label={lengthsArray[0]}
          description="Content Length"
          updateSelection={setSelectedLength}
          subText={LENGTH_SUB_TEXT}
        />
      </div>
      <button
        type="button"
        onClick={generateQuery}
        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Generate
      </button>
    </div>
  );
};
export default FilterMenu;
