import React from "react";
import { Formik, Form, Field } from "formik";
import { Box, Button, TextField, Typography } from '@mui/material';

interface LongAnswerQuestionProps {
  question: string;
  onAnswer: (answer: string) => void;
}

const LongAnswerQuestion: React.FC<LongAnswerQuestionProps> = ({ question, onAnswer }) => {
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
          <Field as={TextField} name="answer" variant="outlined" fullWidth multiline rows={4} />
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

export default LongAnswerQuestion;