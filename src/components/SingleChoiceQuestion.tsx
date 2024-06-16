import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Box, Button, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';

interface SingleChoiceQuestionProps {
  question: string;
  options: string[];
  onAnswer: (answer: string) => void;
}

const SingleChoiceQuestion: React.FC<SingleChoiceQuestionProps> = ({ question, options, onAnswer }) => {
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
          <RadioGroup>
            {options.map((option, index) => (
              <FormControlLabel key={index} value={option} control={<Field as={Radio} name="answer" />} label={option} />
            ))}
          </RadioGroup>
          <Box mt={2}>
            <Button 
            type="submit" 
            variant="contained" 
            sx={{
                background: 'red',
                color: 'white'
            }}
            >Ответить</Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default SingleChoiceQuestion;