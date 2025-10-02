export default function Language(props) {
    return (
        <button 
            className="lang-btn rounded me-1 mb-1 fw-bold position-relative"
            style={{ backgroundColor: props.bgColor, color: props.color }}
            disabled
        >
            {props.name}
            {props.isLost && <div className="lost position-absolute top-50 start-50 translate-middle pt-1 rounded">💀</div>}
        </button>
    )
}