import { closeModal, openModal } from "../../utils/modal";
import goToHomeEvent from "../../utils/goToHomeEvent";

document.querySelector("#saveChangesButton").onclick = goToHomeEvent;

const profileBlockAvatar = document.querySelector(".profile-avatar-block");
const uploadAvatarModal = document.querySelector("#uploadAvatarModal");
const saveAvatarButton = document.querySelector("#saveAvatarButton");

profileBlockAvatar.onclick = () => openModal(uploadAvatarModal);
uploadAvatarModal.onclick = () => closeModal(uploadAvatarModal);
saveAvatarButton.onclick = () => closeModal(uploadAvatarModal);

const changePasswordButton = document.querySelector("#changePasswordButton");
const changePasswordModal = document.querySelector("#changePasswordModal");
const savePasswordButton = document.querySelector("#savePasswordButton");

changePasswordButton.onclick = () => openModal(changePasswordModal);
changePasswordModal.onclick = () => closeModal(changePasswordModal);
savePasswordButton.onclick = () => closeModal(changePasswordModal);
