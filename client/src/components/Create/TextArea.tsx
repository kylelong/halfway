import React, {useState, useEffect, useRef} from "react";
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
  const defaultTextRef = useRef("");

  useEffect(() => {
    if (item && item.name && options) {
      let itemName = item.name;

      if (item.children && childIndex >= 0) {
        itemName = item.children[childIndex].name;
        const plural =
          item.type === "Writing" ||
          item.type === "Blog" ||
          item.type === "Newsletter";
        itemName = plural ? itemName + "'s" : itemName;

        setPlaceHolderText(`${itemName} ${selectedType}`);
      } else {
        setPlaceHolderText(`${itemName} ${selectedType}`);
      }
      selectedType.endsWith("s") ? setVerb("are") : setVerb("is");
    }
    if (defaultText !== defaultTextRef.current) {
      defaultTextRef.current = defaultText;
      setText(defaultText);
    }
  }, [item, options, childIndex, selectedType, text, defaultText, verb]);

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
    </div>
  );
};
export default TextArea;
