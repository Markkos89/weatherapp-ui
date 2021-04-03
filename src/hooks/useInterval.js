import { useEffect, useRef } from "react";

const useInterval = (callback, delay, isActive = true) => {
  //Creo una referencia donde voy a almacenar el fetch
  const savedCallback = useRef();
  useEffect(() => {
    //Al cargar esta funcion cargo en el current el callback (en este caso es el fetch)
    savedCallback.current = callback;
  }, [callback]);
  useEffect(() => {
    // Creo una funcion que sea quien ejecute el curreny (que tenia el callback, que es el fetch)
    const tick = () => savedCallback.current();
    //Seteo el interval en null para no tener problems al querer frenarlo
    let interval = null;
    //Si por parametros nos dicen que esta activo.
    //Creo el interval que va a ejecutar la funcion antes creada, que ejecuta el fetch, y le paso con que delay se hara
    if (isActive) interval = setInterval(tick, delay);
    //Si nos pasan por parametros que el interval ya no esta activo, elimino el interval actual
    else if (!isActive) clearInterval(interval);
    return () => clearInterval(interval);
  }, [isActive, delay]);
};

export default useInterval;
