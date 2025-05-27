interface ICustomBtnProps {
  text?: string
  icon?: string
  width: number
  height: number
  disabled?: boolean
  onClick?: () => void
}
const CustomBtn: React.FC<ICustomBtnProps> = (P) => {
  return (
    <button
      disabled={P.disabled}
      onClick={P.onClick}
      className="button"
      style={{ width: P.width, height: P.height }}
    >
      {P.icon && <img src={P.icon} alt="" />}
      {P.text && <span>{P.text}</span>}
    </button>
  )
}

export default CustomBtn