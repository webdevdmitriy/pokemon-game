import cn from 'classnames'
import { useRef, useEffect } from 'react/cjs/react.development'

import s from './style.module.css'

const Modal = ({ isOpen, title, children, onCloseModal }) => {
	const modalEl = useRef()

	useEffect(() => {
		document.querySelector('body').style.overflow = isOpen ? 'hidden' : null
	}, [isOpen])

	const handleCloseModal = () => {
		onCloseModal && onCloseModal(false)
	}

	const handleClickRoot = e => {
		if (!modalEl.current.contains(e.target)) {
			handleCloseModal()
		}
	}

	return (
		<div className={cn(s.root, { [s.open]: isOpen })} onClick={handleClickRoot}>
			<div ref={modalEl} className={s.modal}>
				<div className={s.head}>
					{title}
					<span className={s.btnClose} onClick={handleCloseModal}></span>
				</div>
				<div className={s.content}>{children}</div>
			</div>
		</div>
	)
}

export default Modal
