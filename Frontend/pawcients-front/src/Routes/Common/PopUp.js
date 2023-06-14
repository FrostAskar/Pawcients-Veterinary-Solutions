
import "css/global/popup.scss"
import "css/global/global.scss"

export const ConfirmationPopup = ({ onCancel, onConfirm }) => {

  return (
    <div className="modal">
      <div className="modal-content">
        <p>Are you sure you want to delete this user?</p>
        <button className="small-button" onClick={onConfirm}>Accept</button>
        <button className="small-button" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};
