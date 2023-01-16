import React from "react";
import { Col, Row, Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Please enter name"),
});

function AddPersonForm({
  onSubmit,
}: {
  onSubmit: (values: { name: string }) => void | Promise<any>;
}) {
  return (
    <Formik
      validationSchema={schema}
      onSubmit={onSubmit}
      initialValues={{
        name: "",
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
      }) => (
        <Form className="mb-3" noValidate onSubmit={handleSubmit}>
          <Row>
            <Col sm={9}>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="validationFormik01"
              >
                <Col>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter Name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    isInvalid={touched.name && !!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
            </Col>
            <Col sm={3}>
              <Button variant="primary" type="submit">
                Add
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
}

export default AddPersonForm;
