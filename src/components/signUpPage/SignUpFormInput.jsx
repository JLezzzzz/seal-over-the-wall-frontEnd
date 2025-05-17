
const SignUpFormInput = ({ name, label, type = "text", required, onChange, ...rest }) => {
  return (
    <>
      <label htmlFor={name} className="block text-xl font-semibold text-gray-700">
        {label}{required && (<span className="text-red-500">*</span>)}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={label}
        className="w-full p-2 placeholder-gray-300 border border-gray-300"
        onChange={onChange}
        {...rest}
      />
    </>
  )
}

export default SignUpFormInput