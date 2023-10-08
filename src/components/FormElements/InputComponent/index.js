export default function InputComponent({
  label,
  placeholder,
  onChange,
  value,
  type,
}) {
  return (
    <div className="">
      <p className=" pt-0 pr-2 pb-0 pl-2  absolute z-0 -mt-3 mr-0 mb-0 ml-2  text-gray-100 bg-gray-800">
        {label}
      </p>
      <input
        placeholder={placeholder}
        type={type || "text"}
        value={value}
        onChange={onChange}
        className="border placeholder-gray-500 focus:outline-none focus:border-white w-full pt-4 pr-4 pb-4 pl-4 mr-0 mt-0 ml-0 text-base block bg-gray-800 border-gray-300 rounded-md"
      />
    </div>
  );
}
