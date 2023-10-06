import {useRef, useState, useEffect} from "react";
import {Editor} from "@tinymce/tinymce-react";

const TinyEditor = ({content}) => {
  const editorRef = useRef(null);
  const contentRef = useRef("");
  const [text, setText] = useState("");
  const [length, setLength] = useState(0);
  const [speed, setSpeed] = useState(35);

  const handleChange = (content, editor) => {
    if (editorRef.current) {
      setText(editorRef.current.getContent({format: "text"}));
    }
  };

  useEffect(() => {
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

    const timer =
      length < content.length &&
      setInterval(() => {
        if (editorRef.current) {
          const currentContent = editorRef.current.getContent({format: "text"});
          let nextChar = content[length];

          if (nextChar === "\n") {
            if (content[length + 1] === "\n") {
              nextChar = "<br><br>";
              setLength(length + 1); // Skip the next character since we've already processed it
            } else {
              nextChar = "<br>";
            }
          } else if (nextChar === " ") {
            nextChar = "&nbsp;";
          }

          if (nextChar === ".") {
            setSpeed(350);
          } else {
            setSpeed(20);
          }
          editorRef.current.setContent(currentContent + nextChar, {
            format: "raw",
          });
          setLength(length + 1);
          editorRef.current.focus();
          editorRef.current.selection.select(editorRef.current.getBody(), true); // End of content
          editorRef.current.selection.collapse(false); // Collapse selection to end
        }
      }, speed);
    return () => clearInterval(timer);
  }, [length, text, speed, content]);

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
    </>
  );
};
export default TinyEditor;
