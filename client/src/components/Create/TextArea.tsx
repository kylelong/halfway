import React, {useState, useEffect, useRef} from "react";
import {LOCAL_STORAGE_API_KEY} from "../../types/constants";
type Props = {
  item: any;
  options: any;
  childIndex: number;
  selectedType: string;
  updateText: React.Dispatch<React.SetStateAction<string>>;
  defaultText: string;
};
const TextArea: React.FC<Props> = ({
  item,
  options,
  childIndex,
  selectedType,
  updateText,
  defaultText,
}) => {
  const [placeHolderText, setPlaceHolderText] = useState(
    "Describe what you are working on..."
  );
  const [verb, setVerb] = useState("is");
  const [text, setText] = useState<string>(defaultText);
  const [examples, setExamples] = useState([]);
  const defaultTextRef = useRef("");
  const hasApiKey = localStorage.getItem(LOCAL_STORAGE_API_KEY);
  useEffect(() => {
    if (defaultText !== text || defaultTextRef.current !== text) {
      defaultTextRef.current = defaultText;
      setText(defaultText);
      console.log(`updating text: `, defaultText);
    }
  }, [defaultText, text]);

  useEffect(() => {
    if (item && item.name && options) {
      let itemName = item.name;

      if (item.children && childIndex >= 0) {
        // TODO: set examples here
        if (selectedType) {
          setExamples(item.children[childIndex].examples[selectedType]);
        }
        itemName = item.children[childIndex].name;
        const plural =
          item.type === "Writing" ||
          item.type === "Blog" ||
          item.type === "Newsletter";
        itemName = plural ? itemName + "'s" : itemName;

        setPlaceHolderText(`${itemName} ${selectedType}`);
      } else {
        setPlaceHolderText(`${itemName} ${selectedType}`);
        if (selectedType) {
          const words = selectedType.split(" ");
          const type =
            words.length > 1 ? words[words.length - 1] : selectedType;
          setExamples(item.examples[type]);
        }
      }
      selectedType.endsWith("s") ? setVerb("are") : setVerb("is");
    }
  }, [item, options, childIndex, selectedType, text, verb]);

  return (
    <div>
      <label
        htmlFor="comment"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        What {verb} your {placeHolderText} about?
      </label>
      <div className="mt-2">
        <textarea
          rows={4}
          name="comment"
          id="comment"
          placeholder={`Describe your ${placeHolderText}...`}
          onChange={(e) => {
            let input = e.target.value;
            setText(input);
            updateText(input);
          }}
          value={text}
          className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
      {hasApiKey && selectedType && examples !== undefined && (
        <ul className="mt-2">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Examples
          </h3>
          {examples.map((example: string, index: number) => {
            return (
              <li
                className="list-disc text-sm text-gray-700 text-semibold ml-4"
                key={index}
              >
                {example}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
export default TextArea;
