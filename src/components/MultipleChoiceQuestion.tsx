import React from "react";
import { Formik, Form, Field } from "formik";
import { Box, Button, FormControlLabel, Checkbox, Typography } from '@mui/material';

interface MultipleChoiceQuestionProps {
  question: string;
  options: string[];
  onAnswer: (answers: string[]) => void;
}

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({ question, options, onAnswer }) => {
  return (
    <Formik
      initialValues={{ answers: [] as string[] }}
      onSubmit={values => {
        onAnswer(values.answers);
      }}
    >
      {({ values }) => (
        <Form>
          <Box mb={2}>
            <Typography variant="h6">{question}</Typography>
          </Box>
          <Box>
            {options.map((option, index) => (
              <FormControlLabel
                key={index}
                control={<Field as={Checkbox} name="answers" type="checkbox" value={option} />}
                label={option}
              />
            ))}
          </Box>
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

export default MultipleChoiceQuestion;