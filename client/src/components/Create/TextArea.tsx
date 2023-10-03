import React, {useState, useEffect} from "react";
type Props = {
  item: any;
  options: any;
  childIndex: number;
  selectedType: string;
};
const TextArea: React.FC<Props> = ({
  item,
  options,
  childIndex,
  selectedType,
}) => {
  const [placeHolderText, setPlaceHolderText] = useState(
    "Describe what you are working on..."
  );
  console.log(selectedType);
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

        setPlaceHolderText(`Describe your ${itemName} ${selectedType}...`);
      } else {
        setPlaceHolderText(`Describe your ${itemName} ${selectedType}...`);
      }
    }
  }, [item, options, childIndex, selectedType]);

  return (
    <div>
      <label
        htmlFor="comment"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        What are you working on?
      </label>
      <div className="mt-2">
        <textarea
          rows={4}
          name="comment"
          id="comment"
          placeholder={placeHolderText}
          className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          defaultValue={""}
        />
      </div>
    </div>
  );
};
export default TextArea;
