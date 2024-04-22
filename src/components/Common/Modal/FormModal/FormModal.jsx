import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";

import PropTypes from "prop-types";

import { CloseIcon } from "@/constants/iconConstants.js";
import { closeModal } from "@/features/ui/ui-slice";
import useScrollLock from "@/hooks/useScrollLock.jsx";

import FormCancelWarningModal from "./FormCancelWarningModal/FormCancelWarningModal";
import { BackdropDiv, IconButton, ModalDiv } from "../BaseModal.styles";

const Backdrop = ({ onClick }) => (
	<BackdropDiv className="backdrop" onClick={onClick} />
);

const Modal = ({ children, onCloseButtonClick, isCloseButtonHidden }) => (
	<ModalDiv>
		{isCloseButtonHidden || (
			<IconButton onClick={onCloseButtonClick} aria-label="close">
				<CloseIcon />
			</IconButton>
		)}
		{children}
	</ModalDiv>
);

const FormModal = ({ children, isEmpty, isCloseButtonHidden = false }) => {
	const [isFormCancelWarningModalOn, setIsFormCancelWarningModalOn] =
		useState(false);
	const dispatch = useDispatch();
	useScrollLock();

	const handleClose = () => {
		// form이 작성되지 않았으면 그냥 모달이 꺼집니다
		if (isEmpty) {
			dispatch(closeModal());
		} else {
			setIsFormCancelWarningModalOn(true);
		}
	};

	return (
		<>
			{ReactDOM.createPortal(
				<Backdrop onClick={handleClose} />,
				document.getElementById("backdrop"),
			)}
			{ReactDOM.createPortal(
				<Modal
					onCloseButtonClick={handleClose}
					isCloseButtonHidden={isCloseButtonHidden}
				>
					{children}
				</Modal>,
				document.getElementById("modal"),
			)}
			{isFormCancelWarningModalOn && (
				<FormCancelWarningModal
					onContinue={() => setIsFormCancelWarningModalOn(false)}
					onCancel={() => dispatch(closeModal())}
				/>
			)}
		</>
	);
};

Backdrop.propTypes = {
	onClick: PropTypes.func.isRequired,
};
Modal.propTypes = {
	children: PropTypes.node.isRequired,
	onCloseButtonClick: PropTypes.func.isRequired,
};
FormModal.propTypes = {
	children: PropTypes.node.isRequired,
	isEmpty: PropTypes.bool.isRequired,
};

export default FormModal;
