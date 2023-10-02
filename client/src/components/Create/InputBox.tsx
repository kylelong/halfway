export default function InputBox() {
  return (
    <div>
      <label
        htmlFor="describe"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        What are you working on?
      </label>
      <div className="mt-2">
        <input
          type="text"
          name="describe"
          id="describe"
          className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Desribe what you are working on..."
        />
      </div>
    </div>
  );
}
