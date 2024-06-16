import React, { useState, useEffect } from 'react';
import { Stepper, Step, StepLabel, Button, Box, Typography } from '@mui/material';
import SingleChoiceQuestion from '../components/SingleChoiceQuestion';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import ShortAnswerQuestion from './ShortAnswerQuestion';
import LongAnswerQuestion from './LongAnswerQuestion';

import { number } from 'yup';
import { parse } from 'path';

const questions = [
{ 
    type: 'single',
    question: 'Что должен знать Frontend разработчик? Назовите три ключевых технологии', 
    options: [
    'HTML,CSS и JavaScript ',
    'Kotlin,PHP и JavaScript', 
     'PHP,HTML и CSS'
    ] 
},

  { 
    type: 'single',
    question: 'Основные отличия между CSS Grid и Flexbox?', 
    options: [
        'Гибкость', 
        'Мощность', 
        'Размещение элементов', 
        'Простота'
    ] 
},

  { 
    type: 'single',
    question: 'Какой основной принцип работы функции в JavaScript?', 
    options: [
        'Функция возвращает всегда одно и то же значение', 
        'Функция - это объект, который может быть вызван', 
        'Функция работает только с глобальными переменными'
    ] 
},

  { 
    type: 'multiple',
    question: 'Какой из перечисленных методов используется для преобразования строки в целое число в Phyton? (выберите все подходящие варианты)', 
    options: [
        'init()', 
        'str()', 
        'float()',
        'Ничего из выше перечисленного'
    ] 
},

  { 
    type: 'short',
    question: 'Опишите, что такое замыкание (closure) в программировании на языке Python?', 
    options: [] 
},

  { 
    type: 'long',
    question: ' Какой оператор используется для проверки равенства как значения, так и типа в JavaScript and why?', 
    options: []
 },

  { 
    type: 'single',
    question: 'Что такое Git и зачем он используется?',
    options: [
        'Текстовый редактор для написания кода', 
        'Система управления версиями для отслеживания изменений в коде', 
        'Среда выполнения для JavaScript'
    ] 
},

  { 
    type: 'single',
    question: ' Какой из следующих селекторов используется для выбора элемента с определенным идентификатором в CSS?', 
    options: [
        '.class', 
        '#id', 
        '*element',
    ] 
},

  { 
    type: 'single',
    question: ' Что такое JSON?', 
    options: [
        'Формат для хранения и передачи данных, основанный на языке JavaScript', 
        'Язык программирования', 
        'Протокол для передачи файлов',
    ] 
},

  { 
    type: 'single',
    question: 'Какой метод используется для преобразования строки в целое число в JavaScrip?', 
    options: [
        'toString()', 
         'parseInt()', 
         'slice()',
        ]
     },

  // Дополнительные вопросы
];

const QuizStepper: React.FC = () => {
    const [activeStep, setActiveStep] = useState<number>(() => {
      const savedStep = localStorage.getItem('activeStep');
      return savedStep ? parseInt(savedStep, 10) : 0;
    });
  
    const [answers, setAnswers] = useState<(string | string[])[]>(() => {
      const savedAnswers = localStorage.getItem('answers');
      return savedAnswers ? JSON.parse(savedAnswers) : Array(questions.length).fill([]);
    });
  
    const [timeLeft, setTimeLeft] = useState<number>(() => {
      const savedTimeLeft = localStorage.getItem('timeLeft');
      return savedTimeLeft ? parseInt(savedTimeLeft, 10) : 17 * 60;
    });
  
    useEffect(() => {
      localStorage.setItem('activeStep', activeStep.toString());
      localStorage.setItem('answers', JSON.stringify(answers));
      localStorage.setItem('timeLeft', timeLeft.toString());
    }, [activeStep, answers, timeLeft]);
  
    useEffect(() => {
      if (timeLeft > 0) {
        const timerId = setInterval(() => setTimeLeft(prevTime => prevTime - 1), 1000);
        return () => clearInterval(timerId);
      }
    }, [timeLeft]);
  
    const handleAnswer = (answer: string | string[]) => {
      const newAnswers = [...answers];
      newAnswers[activeStep] = answer;
      setAnswers(newAnswers);
      if (activeStep < questions.length - 1) {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
      } else {
        // Все вопросы завершены
      }
    };
  
    const getStepColor = (index: number) => {
      if (index < activeStep) return 'black';
      if (index === activeStep) return 'red';
      return 'grey';
    };
  
    return (
      <Box sx={{ padding: '30px', textAlign: 'left' }}>
        {timeLeft === 0 ? (
          <Box sx={{ display:'flex', justifyContent:'center', alignItems:'center', height:'100vh'}}>
            <Typography variant="h5">Время вышло!</Typography>
          </Box>
        ) : (
          <Box>
            {/* Текст "Тестирование" и таймер в рамке */}
            <Box display="flex" alignItems="center" mb={2}>
              <Typography variant="h6" mr={2}>Тестирование</Typography>
              <Box sx={{ border: '1px solid black', padding: '5px', display: 'inline-block', marginLeft: '10px', borderRadius: '5px' }}>
                <Typography variant="h6">{Math.floor(timeLeft / 60)}:{timeLeft % 60}</Typography>
              </Box>
            </Box>
  
            {/* Прямоугольники на одной линии с текстом */}
            <Box display="flex" alignItems="center" mb={2}>
              {questions.map((_, index) => (
                <Box
                  key={index}
                  width={60}
                  height={10}
                  bgcolor={getStepColor(index)}
                  m={0.5}
                />
              ))}
            </Box>
            <Stepper activeStep={activeStep} sx={{ justifyContent: 'flex-start' }}>
              {questions.map((_, index) => (
                <Step key={index}>
                  <StepLabel>{/* убрали отображение текста "Question" */}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <Box>
            {activeStep === questions.length ? (
              <Box textAlign="center">
                <Typography variant="h6">All steps completed</Typography>
                <Button onClick={() => setActiveStep(0)}>Reset</Button>
              </Box>
            ) : (
              <Box>
                {questions[activeStep].type === 'single' ? (
                  <SingleChoiceQuestion 
                    question={questions[activeStep].question}
                    options={questions[activeStep].options}
                    onAnswer={handleAnswer}
                  />
                ) : questions[activeStep].type === 'multiple' ? (
                  <MultipleChoiceQuestion 
                    question={questions[activeStep].question}
                    options={questions[activeStep].options}
                    onAnswer={handleAnswer}
                  />
                ) : questions[activeStep].type === 'short' ? (
                  <ShortAnswerQuestion 
                    question={questions[activeStep].question}
                    onAnswer={handleAnswer}
                  />
                ) : (
                  <LongAnswerQuestion 
                    question={questions[activeStep].question}
                    onAnswer={handleAnswer}
                  />
                )}
              </Box>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default QuizStepper;