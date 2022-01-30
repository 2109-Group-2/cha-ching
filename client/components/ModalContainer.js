import React, { Component } from "react";
import Modal from './AddBudget';

const Trigger = ({ triggerText, buttonRef, showModal }) => {
  return (
    <button
      className="btn-lg btn-danger modal-button "
      // className="btn btn-lg btn-danger"
      // className="btn-lg btn-danger modal-button trigger"


      ref={buttonRef}
      onClick={showModal}
    >
      {triggerText}
    </button>
  );
};

class ModalContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShown: false
    }
  }

  showModal = () => {
    this.setState({ isShown: true }, () => {
      this.closeButton.focus();
    });
    this.toggleScrollLock();
  };
  closeModal = () => {
    this.setState({ isShown: false }, () => {
      this.Trigger.focus();
    })

    this.toggleScrollLock();
  };
  onKeyDown = (event) => {
    if (event.keyCode === 27) {
      this.closeModal();
    }
  };
  onClickOutside = (event) => {
    if (this.modal && this.modal.contains(event.target)) return;
    this.closeModal();
  };

  toggleScrollLock = () => {
    document.querySelector('html').classList.toggle('scroll-lock');
  };

  render() {
    const { budgets, transactions, user } = this.props
    return (
      <React.Fragment>
        <div className="modal-container">
          <Trigger
            showModal={this.showModal}
            buttonRef={(n) => (this.Trigger = n)}
            triggerText='Track New Budget'
            // className="trigger"
            className="trigger"
          />
        </div>

        {this.state.isShown ? (
          <Modal
            budgets={budgets}
            user={user}
            transactions={transactions}
            modalRef={(n) => (this.modal = n)}
            buttonRef={(n) => (this.closeButton = n)}
            closeModal={this.closeModal}
            onKeyDown={this.onKeyDown}
            onClickOutside={this.onClickOutside}
          />
        ) : null}
      </React.Fragment>
    )
  }
}

export default ModalContainer;
