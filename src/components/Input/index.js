import s from './style.module.css'

const Input = ({ value, label, type = 'text', name, onChange, required }) => {
	return (
		<div className={s.root}>
			<input type={type} value={value} className={s.input} required={required} name={name} onChange={onChange} />
			<span className={s.highlight}></span>
			<span className={s.bar}></span>
			<label className={s.label}>{label}</label>
		</div>
	)
}

export default Input
