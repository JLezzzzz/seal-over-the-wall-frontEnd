
const SizeSelector = ({ size, className, onClick }) => {
  return (
    <div
      className={`w-12 h-10 rounded-md flex items-center justify-center border-2 text-xl font-semibold cursor-pointer ${className}`}
      onClick={onClick}
    >
      {size.toUpperCase()}
    </div>
  )
}

export default SizeSelector