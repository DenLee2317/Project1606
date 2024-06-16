import React from "react";
import { Formik, Form, Field } from "formik";
import { Box, Button, TextField, Typography } from '@mui/material';

interface ShortAnswerQuestionProps {
  question: string;
  onAnswer: (answer: string) => void;
}

const ShortAnswerQuestion: React.FC<ShortAnswerQuestionProps> = ({ question, onAnswer }) => {
  return (
    <Formik
      initialValues={{ answer: '' }}
      onSubmit={values => {
        onAnswer(values.answer);
      }}
    >
      {() => (
        <Form>
          <Box mb={2}>
            <Typography variant="h6">{question}</Typography>
          </Box>
          <Field as={TextField} name="answer" variant="outlined" fullWidth />
          <Box mt={2}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: 'red',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'darkred',
                },
              }}
            >
              Ответить
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default ShortAnswerQuestion;