interface ICustomInputProps {
    type: string
    holder: string
    register?: any
    errors?: any
    accept?: string
    label?: string
}
const CustomInput:React.FC<ICustomInputProps> = ({type, holder, register, errors, accept}) => {
    return (
        <div className={`inputs__form-item`}>
            <label>
                <span>{holder}</span>
                <input 
                    accept={accept}
                    type={type}
                    placeholder={holder}
                    required
                    {...register}
                />
            </label>
            <div className="inputs__form-error">
                {errors && (<h3>{errors.message}</h3>)}
            </div>
        </div>
    )
}

export default CustomInput