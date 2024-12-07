import React from 'react';

function ConfirmationModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        {/* <h2 style={styles.modalTitle}>⚠️ Warning ⚠️</h2> */}
        <p style={styles.modalMessage}>
          Are you sure you want to call this driver?
          {/* Points will be deducted from their balance for each call! */}
        </p>
        <div style={styles.modalActions}>
          <button style={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button style={styles.confirmButton} onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#FFFFFF',
    padding: '20px',
    borderRadius: '10px',
    width: '90%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  modalTitle: {
    fontSize: '1.5rem',
    marginBottom: '10px',
  },
  modalMessage: {
    fontSize: '1rem',
    marginBottom: '20px',
    color:"black"
  },
  modalActions: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  cancelButton: {
    backgroundColor: '#CCCCCC',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  confirmButton: {
    backgroundColor: '#4F63AC',
    color: '#FFFFFF',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default ConfirmationModal;
