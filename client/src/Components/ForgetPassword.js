import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { Button, Form, Input, InputGroup, InputGroupAddon } from "reactstrap";

const ResetPassword = () => {
  const [email, setEmail] = useState("");

  const history = useHistory();

  const validateForm = () => {
    return email.length > 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (

    <Form >
    
  </Form>
  );
};

export default ResetPassword;
