import React, {Component} from "react";
import { Form, FormGroup, FormControl, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { useContext, useState } from "react";

class EditGoal extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      image: "",
      category: "",
      goalTarget: "",
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, redirect to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onInputChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      title: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };
    console.log(newUser);
    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    return (
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <FormControl
            type="text"
            placeholder="Name *"
            name="name"
            value={name}
            onChange={(e) => onInputChange(e)}
            required
          />
        </FormGroup>
        <FormGroup>
          <FormControl
            type="email"
            placeholder="Email *"
            name="email"
            value={email}
            onChange={(e) => onInputChange(e)}
            required
          />
        </FormGroup>
        <FormGroup>
          <FormControl
            as="textarea"
            placeholder="Address"
            rows={3}
            name="address"
            value={address}
            onChange={(e) => onInputChange(e)}
          />
        </FormGroup>
        <FormGroup>
          <Form.Control
            type="text"
            placeholder="Phone"
            name="phone"
            value={phone}
            onChange={(e) => onInputChange(e)}
          />
        </FormGroup>
        <Button variant="success" type="submit" block>
          dfghjjhtrewswderftgyhtgfd
        </Button>
      </Form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => ({
  // addGoal: (goal) => dispatch(addGoal(goal)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditGoal);






// import React, { Component, useState } from "react";
// import { Modal, Button } from "react-responsive-modal";


// function Example() {
//   const [show, setShow] = useState(false);

//   return (
//     <>
//       <Button variant="primary" onClick={() => setShow(true)}>
//         Custom Width Modal
//       </Button>

//       <Modal
//         show={show}
//         onHide={() => setShow(false)}
//         dialogClassName="modal-90w"
//         aria-labelledby="example-custom-modal-styling-title"
//       >
//         <Modal.Header closeButton>
//           <Modal.Title id="example-custom-modal-styling-title">
//             Custom Modal Styling
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>
//             Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae unde
//             commodi aspernatur enim, consectetur. Cumque deleniti temporibus
//             ipsam atque a dolores quisquam quisquam adipisci possimus
//             laboriosam. Quibusdam facilis doloribus debitis! Sit quasi quod
//             accusamus eos quod. Ab quos consequuntur eaque quo rem! Mollitia
//             reiciendis porro quo magni incidunt dolore amet atque facilis ipsum
//             deleniti rem!
//           </p>
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// }

// export default Example;