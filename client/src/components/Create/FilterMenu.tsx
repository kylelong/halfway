import OpenAI from "openai";
import React, {useEffect, useState, useRef} from "react";
import SelectMenu from "./SelectMenu";
import DropDownMenu from "./DropDownMenu";
import TextArea from "./TextArea";
import {
  LOCAL_STORAGE_LICENSE_KEY,
  LOCAL_STORAGE_USAGE_KEY,
  LOCAL_STORAGE_API_KEY,
  LOCAL_STORAGE_QUERIES_KEY,
} from "../../types/constants";
import {TONE, LENGTH} from "../../types/basics";
import Modal from "./Modal";
import ChatGPTSVG from "../../assets/chatgpt.svg";
import OpenAIModal from "./OpenAIModal";
import SubscribeModal from "./SubscribeModal";

type Props = {
  item: any;
  childIndex: number;
  updateCompletion: React.Dispatch<React.SetStateAction<any>>;
};

const FilterMenu: React.FC<Props> = ({item, childIndex, updateCompletion}) => {
  const tonesArray = Object.entries(TONE).map(([key, value], index) => {
    return {
      id: index + 1,
      data: value as string,
    };
  });

  const lengthsArray = Object.values(LENGTH);
  let count = parseInt(localStorage.getItem(LOCAL_STORAGE_QUERIES_KEY) || "0");
  const [optionsMenu, setOptionsMenu] = useState([]);
  const [selectedType, setSelectedType] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selectedLength, setSelectedLength] = useState<string>(lengthsArray[0]);
  const [tone, setTone] = useState(tonesArray[0].data);
  const [showOpenAIModal, setShowOpenAIModal] = useState<boolean>(false);
  const [showSubscribeModal, setShowSubscribeModal] = useState<boolean>(
    count > 0 &&
      !localStorage.getItem(LOCAL_STORAGE_LICENSE_KEY) &&
      count % 2 === 0
  );
  // !localStorage.getItem(LOCAL_STORAGE_LICENSE_KEY) && count % 2 === 0
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
    apiKey: localStorage.getItem(LOCAL_STORAGE_API_KEY) || "", // It's better to use this from a backend server
    dangerouslyAllowBrowser: true, // Use with caution
  });
  const clearContent = async () => {
    await updateCompletion(null);
  };

  const generate = async (query: string, type: string) => {
    // type is the subtype like sentence, outline, idea
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        stream: true,
        messages: [
          {role: "system", content: "You are a helpful writing assistant."},
          {role: "user", content: query},
        ],
        top_p: 1,
      });

      if (completion) {
        updateCompletion(completion);
        const completionFull = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            {role: "system", content: "You are a helpful writing assistant."},
            {role: "user", content: query},
          ],
          top_p: 1,
        });
        if (completionFull) {
          const {completion_tokens, prompt_tokens, total_tokens} =
            completionFull.usage || {};
          // update usage
          if (localStorage.getItem(LOCAL_STORAGE_USAGE_KEY)) {
            let usage = JSON.parse(
              localStorage.getItem(LOCAL_STORAGE_USAGE_KEY) || "{}"
            );
            usage.completion_tokens =
              usage.completion_tokens + completion_tokens;
            usage.prompt_tokens = usage.prompt_tokens + prompt_tokens;
            usage.total_tokens = usage.total_tokens + total_tokens;

            // update it to new values
            localStorage.setItem(
              LOCAL_STORAGE_USAGE_KEY,
              JSON.stringify(usage)
            );
          } else {
            // create storage
            const usage = {
              prompt_tokens: prompt_tokens,
              completion_tokens: completion_tokens,
              total_tokens: total_tokens,
            };
            localStorage.setItem(
              LOCAL_STORAGE_USAGE_KEY,
              JSON.stringify(usage)
            );
          }
        }

        // handle showing subscribe modal
        let count = parseInt(
          localStorage.getItem(LOCAL_STORAGE_QUERIES_KEY) || "0"
        );
        count = count + 1;
        if (!localStorage.getItem(LOCAL_STORAGE_QUERIES_KEY)) {
          localStorage.setItem(LOCAL_STORAGE_QUERIES_KEY, "1");
        } else {
          localStorage.setItem(LOCAL_STORAGE_QUERIES_KEY, count.toString());
        }
        setShowSubscribeModal(
          !localStorage.getItem(LOCAL_STORAGE_LICENSE_KEY) && count % 2 === 0
        );
      }
    } catch (err) {
      const error: any = JSON.parse(JSON.stringify(err));
      console.log(error);
    }
  };
  const handleModalClose = () => {
    // console.log("called handleModalClose");
    setShowSubscribeModal(false);
  };

  const generateQuery = async () => {
    if (!localStorage.getItem(LOCAL_STORAGE_API_KEY)) {
      setShowOpenAIModal(true);
      return;
    }
    clearContent();
    let {description, childIndex, item, selectedType, tone} = data;

    const type = item.children ? item.children[childIndex].name : item.type;
    let message = "";
    // CALL OPEN AI

    message = `write a ${selectedType} in a ${tone.toLocaleLowerCase()} tone for a ${type} described as ${description}`;
    setDescription("");
    generate(message, selectedType);
  };
  // useEffect(() => {
  //   console.log(
  //     `showSubscribeModal: ${showSubscribeModal} localStorge && count:`,
  //     !localStorage.getItem(LOCAL_STORAGE_LICENSE_KEY) && count % 2 === 0
  //   );
  // }, [showSubscribeModal, count]);

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
      setData({
        ...data,
        item: item,
        tone: tonesArray[0].data,
        textLength: lengthsArray[0],
        selectedType: menu[0],
      });
      // reset description, length, tone, type
      setSelectedType(menu[0]);
      setDescription("");
      setTone(tonesArray[0].data);
      setSelectedLength(lengthsArray[0]);
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
      setData({
        ...data,
        childIndex: childIndex,
        tone: tonesArray[0].data,
        textLength: lengthsArray[0],
        selectedType: menu[0],
      });
      // reset description, length, tone, type
      setSelectedType(menu[0]);
      setDescription("");
      setTone(tonesArray[0].data);
      setSelectedLength(lengthsArray[0]);
    }

    itemNameRef.current = item.name;
    childIndexRef.current = childIndex;
    selectedTypeRef.current = selectedType;
    selectedLengthRef.current = selectedLength;
    toneRef.current = tone;
    descriptionRef.current = description;
    // console.log(`showSubscribeModal: ${showSubscribeModal}`);
  }, [
    item,
    childIndex,
    selectedType,
    data,
    selectedLength,
    tone,
    description,
    showOpenAIModal,
    showSubscribeModal,
    lengthsArray,
    tonesArray,
  ]);

  return (
    <div>
      {!localStorage.getItem(LOCAL_STORAGE_API_KEY) && (
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
      <SubscribeModal
        showModal={showSubscribeModal}
        onCloseModal={handleModalClose}
      />

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

      {/* {item.showLength && (
        <div className="mb-6">
          <DropDownMenu
            options={lengthsArray}
            label={lengthsArray[0]}
            description="Content Length"
            updateSelection={setSelectedLength}
            subText={LENGTH_SUB_TEXT}
          />
        </div>
      )} */}
      <button
        type="button"
        onClick={generateQuery}
        style={{fontFamily: "Gaegu"}}
        className="rounded-md bg-indigo-600 px-3 py-2 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Generate
      </button>
    </div>
  );
};
export default FilterMenu;
