
import "css/global/global.scss"

export const ConfirmationPopup = ({ onCancel, onConfirm, item }) => {

  return (
    <div className="modal">
      <div className="modal-content">
        <p>Are you sure you want to delete this {item}?</p>
        <div className="buttons">
          <button className="clasic-button" onClick={onConfirm}>Accept</button>
          <button className="clasic-button" onClick={onCancel}>Cancel</button>
        </div>

      </div>
    </div>
  );
};
