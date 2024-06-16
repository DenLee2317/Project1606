import React, { useState, useEffect } from 'react';
import { Stepper, Step, StepLabel, Button, Box, Typography } from '@mui/material';
import SingleChoiceQuestion from '../components/SingleChoiceQuestion';

const questions = [
  { question: 'Что должен знать Frontend разработчик? Назовите три ключевых технологии', 
  options: ['HTML,CSS и JavaScript ', 'Kotlin,PHP и JavaScript', 'PHP,HTML и CSS'] },

  { question: 'Основные отличия между CSS Grid и Flexbox?', 
  options: ['Гибкость', 'Мощность', 'Размещение элементов', 'Простота'] },

  { question: 'Какой основной принцип работы функции в JavaScript?', 
  options: ['Функция возвращает всегда одно и то же значение', 'Функция - это объект, который может быть вызван', 'Функция работает только с глобальными переменными'] },

  { question: 'Какой из перечисленных методов добавляет новый элемент в конец массива в JavaScript?', 
  options: ['push()', 'pop()', 'shift()',] },

  { question: 'Что такое DOM в контексте веб-разработки?', 
  options: ['Набор CSS-стилей', 'Объектная модель документа, представляющая структуру HTML документа', 'Библиотека JavaScript для работы с API', ] },

  { question: ' Какой оператор используется для проверки равенства как значения, так и типа в JavaScript?', 
  options: ['=', '==', '===',] },

  { question: 'Что такое Git и зачем он используется?',
   options: ['Текстовый редактор для написания кода', 'Система управления версиями для отслеживания изменений в коде', 'Среда выполнения для JavaScript'] },

  { question: ' Какой из следующих селекторов используется для выбора элемента с определенным идентификатором в CSS?', 
  options: ['.class', '#id', '*element',] },

  { question: ' Что такое JSON?', 
  options: ['Формат для хранения и передачи данных, основанный на языке JavaScript', 'Язык программирования', 'Протокол для передачи файлов',] },

  { question: 'Какой метод используется для преобразования строки в целое число в JavaScrip?', 
  options: ['toString()', 'parseInt()', 'slice()',] },

  // Дополнительные вопросы
];

const QuizStepper: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(17 * 60);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => setTimeLeft(prevTime => prevTime - 1), 1000);
      return () => clearInterval(timerId);
    }
  }, [timeLeft]);

  const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[activeStep] = answer;
    setAnswers(newAnswers);
  };

  const getStepColor = (index: number) => {
    if (index < activeStep) return 'black';
    if (index === activeStep) return 'red'
    return 'grey';
  };

  return (
    <Box sx={{ padding:'30px', textAlign: 'left' }}>
      {timeLeft === 0 ? (
        <Box textAlign="center">
          <Typography variant="h5">Time's up!</Typography>
        </Box>
      ) : (
        <Box>
            <Box display="flex" alignItems="center" mb={2}>
             <Typography variant="h6">Тестироварние </Typography>
             <Box sx={{ border:'1px solid black', padding:'5px', marginLeft:'10px', display: 'inline-block',borderRadius:'5px' }}>
          <Typography variant="h6">{Math.floor(timeLeft / 60)}:{timeLeft % 60}</Typography>
                </Box>
          </Box>

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
          <Stepper activeStep={activeStep} sx={{ justifyContent: 'flex-start'}}>
            {questions.map((_, index) => (
              <Step key={index}></Step>
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
                <SingleChoiceQuestion 
                  question={questions[activeStep].question}
                  options={questions[activeStep].options}
                  onAnswer={handleAnswer}
                />
                <Box mt={2} display="flex" justifyContent="space-between">
                  <Button disabled={activeStep === 0} onClick={handleBack}>Back</Button>
                  <Button onClick={handleNext}>
                    {activeStep === questions.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default QuizStepper;