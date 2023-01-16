import React, { useMemo } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";

const schema = yup.object().shape({
  person1: yup.string().required("Please select a person"),
  person2: yup.string().required("Please select a person"),
});

function TwoPersonInputForm({
  persons,
  onSubmit,
  submitBtnName,
}: {
  persons: { id: number; name: string }[];

  onSubmit: (values: {
    person1: string;
    person2: string;
  }) => void | Promise<any>;
  submitBtnName: string;
}) {
  const personsOption = useMemo(
    () =>
      persons.map((person) => (
        <option key={person.id} value={person.name}>
          {person.name}
        </option>
      )),
    [persons]
  );

  return (
    <Formik
      validationSchema={schema}
      onSubmit={onSubmit}
      initialValues={{
        person1: "",
        person2: "",
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
        <Form className="mb-3" onSubmit={handleSubmit}>
          <Row>
            <Col sm={9}>
              <Form.Group as={Row} className="mb-3">
                <Col>
                  <Form.Select
                    name="person1"
                    value={values.person1}
                    onChange={handleChange}
                    isInvalid={touched.person1 && !!errors.person1}
                  >
                    <option key="blankChoice" hidden value="">
                      Person1
                    </option>
                    {personsOption}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.person1}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Col>
                  <Form.Select
                    name="person2"
                    value={values.person2}
                    onChange={handleChange}
                    isInvalid={touched.person2 && !!errors.person2}
                  >
                    <option key="blankChoice" hidden value="">
                      Person2
                    </option>
                    {personsOption}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.person2}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
            </Col>
            <Col sm={3}>
              <Button variant="primary" type="submit">
                {submitBtnName}
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
}

export default TwoPersonInputForm;
