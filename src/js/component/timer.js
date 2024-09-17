import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons'; 
const Timer = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false); // Estado para manejar si está corriendo o en pausa

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else if (!isRunning && seconds !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, seconds]);

  if (seconds === 60) {
    setSeconds(0);
    setMinutes((prev) => prev + 1);
  }

  if (minutes === 60) {
    setMinutes(0);
    setHours((prev) => prev + 1);
  }

  if (hours === 24) {
    setHours(0);
  }

  const formatDigits = (time) => {
    return time
      .toString()
      .padStart(2, '0') 
      .split('')
      .map((digit, index) => (
        <span key={index} className="mx-1">{digit}</span>
      )); 
  };

  const handleStartPause = () => {
    setIsRunning(!isRunning); 
  };

  const handleReset = () => {
    setIsRunning(false);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center p-3 bg-dark rounded">
      <div className="d-flex align-items-center justify-content-center mb-3">
        <FontAwesomeIcon icon={faClock} size="2x" className="text-light mr-3" />
        <span className="h3 mb-0 text-light d-flex">
          <span className='mx-2'>{formatDigits(hours)}</span>:
          <span className='mx-2'>{formatDigits(minutes)}</span>:
          <span className='mx-2'>{formatDigits(seconds)}</span>
        </span>
      </div>
      <div>
      <button 
        className={`btn ${isRunning ? 'btn-warning' : 'btn-success'} mx-4 mr-2`}
        onClick={handleStartPause}
      >
        {isRunning ? 'Pausar' : 'Iniciar'}
      </button>
      <button className="btn btn-danger" onClick={handleReset}>
        Reset
      </button>
      </div>
    </div>

  );
};

export default Timer;



/*
- useState: Usé tres estados separados para horas, minutos y segundos.
- useEffect: Configuré un intervalo que incrementa los segundos cada segundo.
- Lógica para minutos y horas: Si los segundos llegan a 60, se resetean y aumentan los minutos. Lo mismo para los minutos cuando llegan a 60, reseteo minutos y sumo una hora. En el caso de las horas, cuando llega a 24 se resetea el timer.
Formateo de tiempo: Para que siempre aparezca con dos dígitos (por ejemplo, 01 en lugar de 1), usé la función formatTime.

*/