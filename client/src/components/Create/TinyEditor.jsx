import {useRef, useState, useEffect} from "react";
import {Editor} from "@tinymce/tinymce-react";
import {CopyToClipboard} from "react-copy-to-clipboard";
import checkBadge from "../../assets/checkBadge.svg";

const TinyEditor = ({content, completion}) => {
  const editorRef = useRef(null);
  const [text, setText] = useState("");
  const [length, setLength] = useState(0);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleChange = (content, editor) => {
    if (editorRef.current) {
      setText(editorRef.current.getContent({format: "text"}));
    }
  };

  const processCompletion = async () => {
    try {
      if (completion) {
        setLoading(true);
        let combinedContent = ""; // Initialize combined content
        for await (const chunk of completion) {
          setLength(0);
          const data = chunk.choices[0].delta.content;

          // Format and append new chunk to combined content
          if (data) {
            combinedContent += formatContent(data);
          }
          const finished = chunk.choices[0].finish_reason;
          if (finished || !data) {
            setLoading(false);
          }
          // Update the editor content with the combined content
          if (editorRef.current) {
            editorRef.current.setContent(combinedContent, {
              format: "text",
            });
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formatContent = (content) => {
    // Replace spaces with non-breaking spaces for indentation
    content = content.replace(/ /g, "&nbsp;");

    // Replace line breaks with <br> tags
    content = content.replace(/\n/g, "<br>");

    // Prevent hyphenated chunks from being separated
    content = content.replace(/(\S+)-(\S+)/g, "$1&hyphen;$2");

    return content;
  };

  useEffect(() => {
    processCompletion();
  }, [completion]);

  return (
    <>
      <div dangerouslySetInnerHTML={{__html: formatContent(content)}}></div>

      <Editor
        apiKey={process.env.REACT_APP_TINY_API_KEY}
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue=""
        init={{
          height: 750,
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
        {loading && (
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
              Assistant typing...
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
