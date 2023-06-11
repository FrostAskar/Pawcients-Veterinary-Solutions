
import "css/global/popup.scss"
import "css/global/global.scss"

export const ConfirmationPopup = ({ onCancel, onConfirm }) => {

  return (
    <div className="popup">
      <div className="popup-content">
        <p>Are you sure you want to delete this user?</p>
        <button className="small-button" onClick={onConfirm}>Accept</button>
        <button className="small-button" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};
