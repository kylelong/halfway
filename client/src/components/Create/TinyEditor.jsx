import {useRef, useState, useEffect} from "react";
import {Editor} from "@tinymce/tinymce-react";
import {CopyToClipboard} from "react-copy-to-clipboard";
import checkBadge from "../../assets/checkBadge.svg";
const TinyEditor = ({content}) => {
  const editorRef = useRef(null);
  const contentRef = useRef("");
  const [text, setText] = useState("");
  const [length, setLength] = useState(0);
  const [speed, setSpeed] = useState(35);
  const [copied, setCopied] = useState(false);

  const handleChange = (content, editor) => {
    if (editorRef.current) {
      setText(editorRef.current.getContent({format: "text"}));
    }
  };
  useEffect(() => {
    const shouldUseNbsp = (index) => {
      // If it's the start of the string or follows a newline, use &nbsp;
      if (index === 0 || content[index - 1] === "\n") return true;
      // If the previous character is a space, use &nbsp;
      if (content[index - 1] === " ") return true;
      return false;
    };

    // clear text editor when new content is sent in
    if (contentRef.current !== content) {
      contentRef.current = content;
      setLength(0);
      if (editorRef.current) {
        editorRef.current.setContent("", {
          format: "raw",
        });
      }
    }

    let nextContent = editorRef.current?.getContent({format: "raw"}) || "";

    // Helper function to determine if a space should be a non-breaking space

    // Clear the interval right away to prevent overlapping intervals
    let timer = null;

    if (length < content.length) {
      timer = setInterval(() => {
        if (editorRef.current) {
          let nextChar = content[length];

          // Handle special characters
          switch (nextChar) {
            case "\n":
              nextContent += content[length + 1] === "\n" ? "<br><br>" : "<br>";
              break;
            case " ":
              nextContent += "&nbsp;";
              break;
            case ".":
              setSpeed(350);
              nextContent += nextChar;
              break;
            default:
              setSpeed(20);
              nextContent += nextChar;
          }

          // Update the editor's content and selection
          editorRef.current.setContent(nextContent, {
            format: "raw",
          });
          setLength(length + 1);
          editorRef.current.focus();
          editorRef.current.selection.select(editorRef.current.getBody(), true);
          editorRef.current.selection.collapse(false);
        }
      }, speed);
    }

    return () => {
      clearInterval(timer); // Clear interval when the component unmounts or dependencies change
    };
  }, [length, text, speed, content, copied]);

  return (
    <>
      <Editor
        apiKey={process.env.REACT_APP_TINY_API_KEY}
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue=""
        init={{
          height: 500,
          placeholder: "Edit your content here...",
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; cursor:text }, body::after { content: '|', display: inline-block, margin-left: -1px, width:3px, animation: blink 1s infinite, color: #4F46E5}, @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; }}",
        }}
        onEditorChange={handleChange}
      />
      <div>
        {length !== content.length && (
          <div>
            <button
              style={{fontFamily: "Gaegu"}}
              type="button"
              className="inline-flex items-center px-4 py-2 mt-4 font-semibold leading-6 text-lg shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150 cursor-not-allowed"
              disabled
            >
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Assitant typing...
            </button>
          </div>
        )}
      </div>
      <div>
        {length > 0 && content.length === length && (
          <>
            <CopyToClipboard text={content}>
              <button
                onClick={() => {
                  setCopied(true);
                  setTimeout(() => {
                    setCopied(false);
                  }, 2500);
                }}
                className="rounded-md bg-indigo-600 px-5 py-2 mt-2 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                copy
              </button>
            </CopyToClipboard>
            {copied && (
              <div className="flex flex-row mt-2">
                <img
                  alt="checkBadge"
                  src={checkBadge}
                  className="h-6 w-5 flex-none"
                />
                <span className="ml-0.5">copied to clipboard</span>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};
export default TinyEditor;
