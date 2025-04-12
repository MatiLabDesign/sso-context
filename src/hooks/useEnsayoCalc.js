import { useEffect, useMemo, useState } from 'react';

const useEnsayoCalc = (formValues) => {
  const [fuerzas, setFuerzas] = useState({});

  const calcularFuerza = (voltaje, corriente, RPM) => {
    if (isNaN(voltaje)) voltaje = 0;
    if (isNaN(corriente)) corriente = 0;
    if (RPM === 0) return 0;

    const fuerza = (7 * voltaje * corriente) / RPM;
    return parseFloat(fuerza.toFixed(4));
  };

  // 💡 Memorizar las fuerzas calculadas a partir de formValues
  const nuevasFuerzas = useMemo(() => {
    if (!formValues?.itemEnsayo) return {};

    const rpmMap = { rpm200: 200, rpm300: 300, rpm400: 400, rpm500: 500 };
    const calculadas = {};

    Object.keys(rpmMap).forEach(key => {
      const item = formValues.itemEnsayo[key];
      if (item) {
        const voltaje = parseFloat(item.voltajeSalida);
        const corriente = parseFloat(item.corrienteSalida);
        const rpm = rpmMap[key];
        calculadas[key] = calcularFuerza(voltaje, corriente, rpm);
      } else {
        calculadas[key] = 0;
      }
    });

    return calculadas;
  }, [formValues]);

  // 🔁 Solo actualizamos el estado si cambian las fuerzas realmente
  useEffect(() => {
    if (JSON.stringify(nuevasFuerzas) !== JSON.stringify(fuerzas)) {
      setFuerzas(nuevasFuerzas);
    }
  }, [nuevasFuerzas, fuerzas]);

  return { fuerzas };
};

export default useEnsayoCalc;
