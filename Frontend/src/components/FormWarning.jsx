
const FormWarning = ({ warning }) => {
	return (
		<div
			className={`${warning.error ? "from-red-400 to-red-600" : "from-indigo-400 to-indigo-600"} bg-gradient-to-br
					text-center p-3 mb-5 rounded-md uppercase text-white font-bold text-sm`}
		>
			{warning.message}
		</div>
	)
}

export default FormWarning