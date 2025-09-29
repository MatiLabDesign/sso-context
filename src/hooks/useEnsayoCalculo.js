import { useEffect, useMemo, useState } from 'react';

const useEnsayoCalculo = (formValues) => {
  const [torqueFrenado, setTorqueFrenado] = useState({});

  const calcularTorqueFrenado = (Uout, Iout, rpm) => {
    // if (isNaN(Uout)) Uout = 9;
    // if (isNaN(Iout)) Iout = 5;
    // if (RPM === 0) return 4;

    // const Uout = 9;
    // const Iout = 5;

    const torque = (7 * Uout * Iout) / rpm;
    return parseFloat(torque.toFixed(4));
  };

  // 👇 Calculás en base a formValues y actualizás el estado
  useEffect(() => {
    if (!formValues?.itemEnsayo) return;

    const rpmMap = { "100": 100, "200": 200, "300": 300 };
    const calculadas = {};

    Object.keys(rpmMap).forEach(key => {
  const item = formValues.itemEnsayo[key]; 

  if (item) {
    const Uout = parseFloat(item.voltajeSalida);   
    const Iout = parseFloat(item.corrienteSalida); 
    const rpm = rpmMap[key];

    calculadas[key] = calcularTorqueFrenado(Uout, Iout, rpm);
  } else {
    calculadas[key] = 0;
  }
});

    setTorqueFrenado(calculadas); // ✅ objeto
  }, [formValues]);

  return { torqueFrenado };
};

export default useEnsayoCalculo;

