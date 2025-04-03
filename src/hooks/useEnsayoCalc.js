import { useEffect, useState } from 'react';

const useEnsayoCalc = (formValues) => {
  const [fuerzas, setFuerzas] = useState({});

  const calcularFuerza = (voltaje, corriente, RPM) => {
    if (isNaN(voltaje)) voltaje = 0;
    if (isNaN(corriente)) corriente = 0;
    if (RPM === 0) return 0;
    
    const fuerza = (7 * voltaje * corriente) / RPM;
    return parseFloat(fuerza.toFixed(4)); // Redondeo a 4 decimales
  };

  useEffect(() => {
    if (!formValues?.itemEnsayo) {
      setFuerzas({}); // Limpiar fuerzas si no hay datos
      return;
    }
    
    console.log('Valores recibidos para cálculo:', formValues.itemEnsayo);
    
    const rpmMap = { rpm200: 200, rpm300: 300, rpm400: 400, rpm500: 500 };
    const nuevasFuerzas = {};
    
    Object.keys(rpmMap).forEach(key => {
      const item = formValues.itemEnsayo[key];
      if (item) {
        const voltaje = parseFloat(item.voltajeSalida);
        const corriente = parseFloat(item.corrienteSalida);
        const rpm = rpmMap[key];
        
        nuevasFuerzas[key] = calcularFuerza(voltaje, corriente, rpm);
        console.log(`Cálculo para ${key}:`, {
          voltaje,
          corriente, 
          rpm,
          fuerza: nuevasFuerzas[key]
        });
      } else {
        nuevasFuerzas[key] = 0; // Valor por defecto si no existe el item
      }
    });
    
    console.log('Fuerzas calculadas:', nuevasFuerzas);
    setFuerzas(nuevasFuerzas);
  }, [formValues?.itemEnsayo]); // Solo recalcula cuando cambian estos valores

  return { fuerzas };
};

export default useEnsayoCalc;